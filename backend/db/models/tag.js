'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    type: DataTypes.STRING
  }, {});
  Tag.associate = function(models) {
    Tag.hasMany(models.Business, {foreignKey: 'tagId'})
  };
  return Tag;
};
