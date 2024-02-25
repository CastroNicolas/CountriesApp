const { Activity, Country } = require("../db");

module.exports.postActivities = async (req, res) => {
  try {
    const { name, difficulty, duration, season, countriesId } = req.body;
    console.log({ countriesId });
    const newActivity = await Activity.create({
      name,
      difficulty,
      duration,
      season,
    });

    let countriesFound = [];

    for (CountryName of countriesId) {
      const countryFound = await Country.findOne({
        where: { id: CountryName },
        raw: true
      });
      if (countryFound) {
        countriesFound.push(countryFound.id);
      }
    }
    console.log({countriesFound})
    await newActivity.addCountry(countriesFound);
    const activityBD = await Activity.findAll({
      where: {
        name: newActivity.name,
      },
      include: [
        {
          model: Country,
          as: "countries",
          attributes: ["name"],
          through: {
            attributes: [],
          },
          order: [["ASC"]],
        },
      ],
    });
    res.status(201).json(activityBD);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: error.message || "Error creating the tourist activity" });
  }
};

module.exports.getActivities = async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: Country,
          as: "countries",
          attributes: ["id", "name"],
          through: {
            attributes: [],
          },
          order: [["ASC"]],
        },
      ],
    });
    res.status(200).json(activities);
  } catch {
    res.status(500).json({ error: "Error getting country" });
  }
};
