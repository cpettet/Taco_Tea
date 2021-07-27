"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      */
    return queryInterface.bulkInsert(
      "Posts",
      [
        {
          author_id: 1,
          post_type: "post",
          title: "Went on a mission to the SF Mission",
          body: "Stepped over the leagues of homeless and managed to find myself face-to-face with one of the yummiest tacos in the Bay Area, nay, the world. Could I just say, mission accomplished?",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 2,
          post_type: "recipe",
          title: "Set out to create my own tacos",
          body: "and I ended up just grabbing some tacos from the local Taco Horn",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 2,
          post_type: "post",
          title: "Putting out an APB for my missing taco",
          body: "So there I was, sitting in the park, when I heard an ice cream truck come rolling by. So caught up in the moment, I set my taco down and grabbed a frozen taco. Upon returning, I found my taco missing! Please, someone, please!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 3,
          post_type: "post",
          title: "Testing my account",
          body: "Looks like I still have an account. I'm hoping to go on more food adventures soon. See you all out there.",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 3,
          post_type: "post",
          title: "Checking out the park",
          body: "Bringing the ice cream truck, which specializes in ice cream tacos, to the local park. Hope to see all of my fellow frozen taco lovers there!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          author_id: 4,
          post_type: "post",
          title: "Found a taco in the park",
          body: "Was strolling through the park and I saw this unattended taco! Who could leave a taco unchaperoned in the park? I gave this lonely taco a new home, don't worry. ;)",
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
    return queryInterface.bulkDelete("Posts", null, {});
  },
};
