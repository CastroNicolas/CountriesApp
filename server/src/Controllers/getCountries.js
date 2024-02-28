const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

module.exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll({
      include: [{
        model: Activity, // Specify the associated model
        as: "activities", // Use the alias specified in the association
      }],
    });
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: "Error getting countries" });
  }
};

module.exports.getCountriesById = async (req, res) => {
  try {
    const { idCountry } = req.params;
    const country = await Country.findOne({
      where: { id: idCountry },
      include: [{model: Activity, as: "activities"}],
      
    });

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.status(200).json(country);
  } catch (error) {
    res.status(500).json({ message: "Error getting country" });
  }
};
module.exports.getCountriesByName = async (req, res) => {
  const {query} = req.query;
  try {
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `${query}%`,
        },
      },
      include: [{model: Activity, as: "activities"}],
    });
    
    if (!countries) {
      return res
      .status(404)
      .json({ message: "No countries with that name were found" });
    }
    res.status(200).json(countries);
  } catch (error) {
    res.status(500).json({ error: "Error getting countries by name" });
  }
};

