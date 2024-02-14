const { Activity, Country } = require('../db');

module.exports.postActivities = async(req, res) => {
  
  try {
      const { name, difficulty, hours, season, countries } = req.body;
      const newActivity = await Activity.create({
        name,
        difficulty,
        hours,
        season,
      });
  
      if (countries && countries.length > 0) {
        const associatedCountries = await Country.findAll({
          where: {
            id: countries,
          },
        });
  
        await newActivity.setCountries(associatedCountries);
      }
  
      res.status(201).json(newActivity);
    } catch (error) {
      res.status(500).json({ error: 'Error creating the tourist activity' });
    }
}

module.exports.getActivities = async(req, res) => {
    try {
        const activities = await Activity.findAll();
        res.status(200).json(activities);
    }catch{
        res.status(500).json({ error: 'Error getting country' });
        
    }
}