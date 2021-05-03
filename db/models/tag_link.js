'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag_Link = sequelize.define('Tag_Link', {
    post_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {});
  Tag_Link.associate = function(models) {
    // associations can be defined here
  };
  return Tag_Link;
};