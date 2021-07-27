"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      author_id: DataTypes.INTEGER,
      post_type: DataTypes.STRING,
      title: DataTypes.STRING,
      body: DataTypes.TEXT,
      likes: DataTypes.BOOLEAN,
      comments: DataTypes.BOOLEAN,
      tag_links_id: DataTypes.INTEGER,
    },
    {}
  );
  Post.associate = function (models) {
    // associations can be defined here
    Post.hasMany(models.Comment, { foreignKey: "post_id" });
    Post.belongsTo(models.User, { foreignKey: "author_id" });
    Post.hasMany(models.Like, { foreignKey: "post_id" });
    Post.hasOne(models.Recipe, { foreignKey: "post_id" });
  };
  return Post;
};
