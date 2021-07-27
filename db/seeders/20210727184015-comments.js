"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Comments",
      [
        {
          author_id: 4,
          post_id: 1,
          content: "Been there, done that. Good luck on your way home!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 3,
          post_id: 1,
          content: "Forget about traveling there! I own a truck now, we come to you!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 5,
          post_id: 1,
          content: "Shop local! Shop Taco Horn! We have thousands of locations worldwide!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 5,
          post_id: 2,
          content: "Glad you stopped by your Taco Horn! Grab tacos by the horns!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 4,
          post_id: 3,
          content: "Whoa! That's messed up. I'd be so sad if I lost my taco.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 3,
          post_id: 4,
          content: "Testing if my commenting has been restored. Turns out you can't say anything bad about Taco Horn on this site....",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 5,
          post_id: 4,
          content: "You mess with the taco, you get the horns! Taco Tea is sponsored by Taco Horn so you better watch out!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 3,
          post_id: 5,
          content: "Great time seeing the outdoors from my truck. Might try this again sometime!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 2,
          post_id: 6,
          content: "Officers, this is him. Right here.",
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
    return queryInterface.bulkDelete("Comments", null, {});
  },
};
