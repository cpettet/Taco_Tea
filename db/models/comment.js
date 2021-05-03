"use strict";
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      author_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
      content: DataTypes.TEXT,
    },
    {}
  );
  Comment.associate = function (models) {
    // associations can be defined here
    Comment.belongsTo(models.Post, { foreignKey: "post_id" });
    Comment.belongsTo(models.User, { foreignKey: "author_id" });
  };
  return Comment;
};
