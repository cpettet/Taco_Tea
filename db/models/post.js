'use strict';
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', {
    author_id: DataTypes.INTEGER,
    post_type: DataTypes.STRING,
    title: DataTypes.STRING,
    body: DataTypes.TEXT,
    likes: DataTypes.BOOLEAN,
    comments: DataTypes.BOOLEAN,
    recipe_id: DataTypes.INTEGER,
    tag_links_id: DataTypes.INTEGER
  }, {});
  Post.associate = function(models) {
    // associations can be defined here
  };
  return Post;
};