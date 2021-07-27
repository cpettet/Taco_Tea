"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Recipes",
      [
        {
          name: "Tacos to Try",
          post_id: 2,
          body: "First, grab a taco. Next, enjoy your taco.",
          is_vegetarian: false,
          is_vegan: false,
          is_gluten_free: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkDelete("Recipes", null, {});
  },
};
