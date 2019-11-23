var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  // Load index page
  app.get("/", async (req, res) => {
    try {
      const dbExamples = await db.Example.findAll({});
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });

  // Load example page and pass in an example by id
  app.get("/example/:id", async (req, res) => {
    try {
      const dbExample = await db.Example.findOne({
        where: { id: req.params.id }
      });
      console.log(dbExample.dataValues.description);

      const groundzName = dbExample.dataValues.description;
      console.log("\n >===oooo======< \n " + groundzName);
      // const { data } =
      const groundzData = await axios.get(
        "https://developer.nps.gov/api/v1/parks?stateCode=" +
          groundzName +
          "&api_key=eYWf8cdqhJTjLKiKn6EpzpRvttfMm8ARxeyJFk6Z"
      );

      const example = groundzData.data.data.map(it => ({
        User: dbExample.dataValues.text,
        Name: it.fullName,
        Weather: it.weatherInfo,
        Description: it.description
      }));

      try {
        console.log("\n >=================< \n " + example[0].Name);
        // console.log(groundzData);
      } catch (error) {
        res
          .status(400)
          .json({ error: { name: error.name, msg: error.message } });
      }
      // for (i = 0; i < example.length; i++) {
      res.render("example", {
        example: example
      });
      // }
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });

  // Render 404 page for any unmatched routes
  app.get("*", async (req, res) => {
    res.render("404");
  });
};
