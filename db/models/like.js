'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    emoji: DataTypes.TEXT
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
  };
  return Like;
};