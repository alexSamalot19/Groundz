module.exports = function(sequelize, DataTypes) {
  var Park = sequelize.define("Park", {
    text: DataTypes.STRING,
    description: DataTypes.STRING,
    numPark: DataTypes.INTEGER
  });
  return Park;
};
