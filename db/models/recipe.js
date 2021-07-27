"use strict";
module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define(
    "Recipe",
    {
      name: DataTypes.STRING,
      post_id: DataTypes.INTEGER,
      body: DataTypes.STRING,
      ingredients_id: DataTypes.INTEGER,
      is_vegetarian: DataTypes.BOOLEAN,
      is_vegan: DataTypes.BOOLEAN,
      is_gluten_free: DataTypes.BOOLEAN,
    },
    {}
  );
  Recipe.associate = function (models) {
    // associations can be defined here
    Recipe.hasMany(models.Ingredient, { foreignKey: "recipe_id" });
    Recipe.belongsTo(models.Post, { foreignKey: "post_id" });
  };
  return Recipe;
};
