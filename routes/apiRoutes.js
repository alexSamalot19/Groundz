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

  // Delete an example by id
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

  // Get the Park Name from the home page an example by id
  app.get("/api/parks/:parkName", async (req, res) => {
    try {
      const { parkName } = req.params;
      console.log("afgadfgdfhsdfhsdhsdhs");
      const { data } = await axios.get(
        "https://developer.nps.gov/api/v1/parks?parkCode=&api_key=eYWf8cdqhJTjLKiKn6EpzpRvttfMm8ARxeyJFk6Z"
      );
      console.log(data);
      res.json(data);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
    //   .then(function(response) {
    //   console.log(response.data.data[0].states);
    //   console.log(parkName);
    // })
    //   .catch(function(error) {
    //     if (error.response) {
    //       // The request was made and the server responded with a status code
    //       // that falls out of the range of 2xx
    //       console.log("---------------Data---------------");
    //       console.log(error.response.data);
    //       console.log("---------------Status---------------");
    //       console.log(error.response.status);
    //       console.log("---------------Status---------------");
    //       console.log(error.response.headers);
    //     } else if (error.request) {
    //       // The request was made but no response was received
    //       // `error.request` is an object that comes back with details pertaining to the error that occurred.
    //       console.log(error.request);
    //     } else {
    //       // Something happened in setting up the request that triggered an Error
    //       console.log("Error", error.message);
    //     }
    //     console.log(error.config);
    //   });

    // try {
    //   console.log("it's good");
    // } catch (error) {
    //   res.status(400).json({ error: { name: error.name, msg: error.message } });
    // }
  });
};
