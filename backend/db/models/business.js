'use strict';
module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    userId: DataTypes.INTEGER,
    websiteUrl: DataTypes.TEXT,
    photoUrl: DataTypes.TEXT,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    phone: DataTypes.STRING,
    tagId: DataTypes.INTEGER
  }, {});
  Business.associate = function(models) {
    Business.belongsTo(models.Tag, {foreignKey: 'tagId'})
    Business.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Business;
};
