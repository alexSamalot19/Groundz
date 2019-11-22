module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.STRING,
    numPark: DataTypes.INTEGER
  });
  return Example;
};
