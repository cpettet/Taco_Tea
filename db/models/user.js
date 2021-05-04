"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_name: DataTypes.STRING,
      email: DataTypes.STRING,
      hashed_password: DataTypes.STRING,
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Comment, { foreignKey: "author_id" });
    User.hasMany(models.Post, { foreignKey: "author_id" });
    // column mapping
    const columnMapping = {
      through: "Follow",
      otherKey: "following_id",
      foreignKey: "follower_id",
      as: "Follows",
    };

    User.belongsToMany(models.User, columnMapping);
    User.hasMany(models.Like, { foreignKey: "user_id" });
  };
  return User;
};
