var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  // Load index page
  app.get("/", async (req, res) => {
    try {
      const dbParks = await db.Park.findAll({});
      res.render("index", {
        msg: "Welcome!",
        parks: dbParks
      });
    } catch (error) {
      res
        .status(400)
        .render("400", { error: { name: error.name, msg: error.message } });
    }
  });
  // Load About Us page
  app.get("/aboutUs", async (req, res) => {
    try {
      res.render("aboutUs");
      if (error) {
        console.log(`Error: ${error.error}  Message: ${error.message}`);
      } else {
        res.render(data);
      }
    } catch (error) {
      res.render({ error: { name: error.name, msg: error.message } });
    }
  });

  // Load park page and pass in an park by id
  app.get("/park/:id", async (req, res) => {
    try {
      const dbPark = await db.Park.findOne({
        where: { id: req.params.id }
      });
      console.log(dbPark.dataValues.description);

      const groundzName = dbPark.dataValues.description;
      const groundzData = await axios.get(
        "https://developer.nps.gov/api/v1/parks?stateCode=" +
          groundzName +
          "&api_key=eYWf8cdqhJTjLKiKn6EpzpRvttfMm8ARxeyJFk6Z"
      );

      const park = groundzData.data.data.map(it => ({
        User: dbPark.dataValues.text,
        Name: it.fullName,
        Weather: it.weatherInfo,
        Description: it.description
      }));

      res.render("park", {
        park: park
      });
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
