var db = require("../models");
var axios = require("axios");

module.exports = function (app) {
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
  app.get("/api/parks/:allName", async (req, res) => {
    const { allName } = req.params;
    const stateName = allName.slice(-2);
    const userName = allName.slice(0, -2);
    // const { data } =
    const parkData = await axios.get(
      "https://developer.nps.gov/api/v1/parks?stateCode=" +
      stateName +
      "&api_key=eYWf8cdqhJTjLKiKn6EpzpRvttfMm8ARxeyJFk6Z"
    );
    const latLong = parkData.data.data[0].latLong.split(',');
    const lat = parseFloat(latLong[0].slice(4));
    const lon = parseFloat(latLong[1].slice(6));
    const numParks = parkData.data.data.length;
    console.log("\n >>>>><<<<< \n " + numParks);
    const parkNames = {
      text: userName,
      description: stateName,
      numPark: numParks,
      location: [lat, lon]
    };
    console.log(parkNames);
    // ===================================================
    const parkWeather = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=b426febecc2d6e6409afe07084149a30`
    );
    const weather = parkWeather.data;
    console.log(weather);
    // ==================================================
    try {
      await db.Example.create(parkNames);
      res.json(weather);
    } catch (error) {
      res.status(400).json({ error: { name: error.name, msg: error.message } });
    }
    // const weather = await axios.get(
    //   "api.openweathermap.org/data/2.5/weather?lat=90&lon=-50&APPID=b426febecc2d6e6409afe07084149a30"
    // );
    // console.log(weather);
  });
};
  // app.get("/api/parks/weather", async (req, res) => {
  //   const { stateName } = req.params;
  //   // const { data } =
  //   const parkData = await axios.get(
  //     "api.openweathermap.org/data/2.5/weather?lat=40&lon=50&APPID=b426febecc2d6e6409afe07084149a30"
  //   );
  //   //console.log(parkData);
//   //   const parkNames = parkData.data.data.map(it => ({
//       text: "A",
//       description: stateName,
//       park: it.name
//     }));

//     //console.log(parkNames);

//     try {
//       await db.Example.bulkCreate(parkNames);
//       res.json(parkNames);
//     } catch (error) {
//       res.status(400).json({ error: { name: error.name, msg: error.message } });
//     }

//   });
// };