"use strict";
module.exports = (sequelize, DataTypes) => {
  const Ingredient = sequelize.define(
    "Ingredient",
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      recipe_id: DataTypes.INTEGER,
    },
    {}
  );
  Ingredient.associate = function (models) {
    // associations can be defined here
    Ingredient.belongsTo(models.Recipe, { foreignKey: "recipe_id" });
  };
  return Ingredient;
};
