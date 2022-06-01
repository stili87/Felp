'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.User, {foreignKey: 'userId'})
    Like.belongsTo(models.Business, {foreignKey: 'businessId'})
  };
  return Like;
};
