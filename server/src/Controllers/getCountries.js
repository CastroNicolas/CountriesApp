const { Country, Activity } = require("../db");
const { Op } = require("sequelize");

module.exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.findAll({
      include: Activity,
    });
    res.status(200).json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error getting countries" });
  }
};

module.exports.getCountriesById = async (req, res) => {
  try {
    const { idPais } = req.params;
    const country = await Country.findOne({
      where: { id: idPais },
      include: Activity,
    });

    if (!country) {
      return res.status(404).json({ message: "Country not found" });
    }

    res.status(200).json(country);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting country" });
  }
};
module.exports.getCountriesByName = async (req, res) => {
  const { name } = req.params;
  try {
    const countries = await Country.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: Activity,
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

