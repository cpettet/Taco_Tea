"use strict";
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
      emoji: DataTypes.TEXT,
    },
    {}
  );
  Like.associate = function (models) {
    // associations can be defined here
    Like.belongsTo(models.User, { foreignKey: "user_id" });
    Like.belongsTo(models.Post, { foreignKey: "post_id" });
  };
  return Like;
};
