var db = require("../models");
var axios = require("axios");

module.exports = function(app) {
  // Get all examples
  app.get("/api/examples", async (req, res) => {
    try {
      const data = await db.Example.findAll({});
      res.json(data);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Create a new example
  app.post("/api/examples", async (req, res) => {
    try {
      const result = await db.Example.create(req.body);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Delete a park by id
  app.delete("/api/examples/:id", async (req, res) => {
    try {
      const result = await db.Example.destroy({ where: { id: req.params.id } });
      const deletedRowCount = result;
      const status = deletedRowCount > 0 ? 200 : 404;
      res.status(status).json({ deletedRowCount });
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });

  // Get the Park Name from the home page a park by id
  app.get("/api/parks/:allName", async (req, res) => {
    const { allName } = req.params;
    const stateName = allName.slice(-2);
    const userName = allName.slice(0, -2);
    const parkData = await axios.get(
      "https://developer.nps.gov/api/v1/parks?stateCode=" +
        stateName +
        "&api_key=eYWf8cdqhJTjLKiKn6EpzpRvttfMm8ARxeyJFk6Z"
    );

    const numParks = parkData.data.data.length;
    const parkNames = {
      text: userName,
      description: stateName,
      numPark: numParks
    };

    try {
      await db.Example.create(parkNames);
      res.json(parkNames);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
  });
};
