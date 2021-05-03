'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    follower_id: DataTypes.INTEGER,
    following_id: DataTypes.INTEGER
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
  };
  return Follow;
};