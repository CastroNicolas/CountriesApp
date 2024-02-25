const getApiController = require("../Controllers/getApi");
const { Country } = require("../db");

const getApiHandler = async () => {
  try {
    const countries = await getApiController();

    for (const country of countries) {
        await Country.create({
            id: country.cca3,
            name: country.name.common,
            imageFlag: country.flags.png,
            continent: country.region,
            capital: country.capital?.[0] ?? "Unknown Capital",
            subregion:country.subregion,
            area:country.area,
            population:country.population
        })
    }
 
    console.log("Countries inserted successfully");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = getApiHandler;
