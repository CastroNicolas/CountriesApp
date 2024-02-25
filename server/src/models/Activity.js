const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('Activity', {
      id:{
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      name:{
         type: DataTypes.STRING,
         allowNull: false,
      },
      difficulty: {
         type: DataTypes.ENUM('1', '2', '3','4','5'),
         allowNull: false,
      },
      duration: {
         type: DataTypes.INTEGER,
         allowNull: false,
         validate: {
           min: 0, // duration cannot be negative
         },
       },
     season: {
        type: DataTypes.ENUM('Summer', 'Autumn', 'Winter', 'Spring'),
        allowNull: false,
     },
      
   }, { timestamps: false });
};
