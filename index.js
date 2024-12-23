const cors = require("cors");
const express = require("express");
require("dotenv").config();
const {
  createItinerary,
  getItinerary,
} = require("./controllers/dataController");
const {
  getFlights,
  getHotels,
  getSites,
  getFlightByOriginandDestination,
  getHotelsByLocation,
  getSitesByLocation
} = require("./controllers/itineraryController");
const { sequelize } = require("./models");


const app = express();

app.use(express.json());
app.use(cors());


app.post("/itinerary", createItinerary);
app.get("/itinerary/:id", getItinerary);

app.get("/data/flights", getFlights)
app.get("/data/hotels", getHotels)
app.get("/data/sites", getSites)
app.get("/data/getFlightsByOriginAndDestination",getFlightByOriginandDestination)
app.get("/hotes/location",getHotelsByLocation)
app.get("/sites/location", getSitesByLocation)

sequelize.authenticate().then(() => {
    console.log("Database Connected")
}).catch(error => {
    console.error("Unable to connect to database",error)
})
app.listen(3000, () => {
    console.log("Server is Running on port 3000")
})

module.exports = app