const axios = require("axios");
const { validateFlightQueryParams } = require("../validations/index.js");
require("dotenv").config();
const  axiosInstance  = require("../lib/axios.lib.js")


const getFlightByOriginandDestination = async (req, res) => {
  const errors = validateFlightQueryParams(req.query);
  if (errors.length > 0) return res.status(400).json({ errors });

  try {
    const { origin, destination } = req.query;
    console.log(origin, destination);
    const response = await axiosInstance.get(
      `/flights/search?origin=${origin}&destination=${destination}`
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch flight detailes" });
  }
};

const getFlights = async (req, res) => {
  try {
    const test_error = req.query.test_error;
    const rate_limit = req.query.rate_limit;
    const response = await axiosInstance.get(
      `/flights?test_error=${test_error}&rate_limit=${rate_limit}`,
      {
        headers: {
          CLIENT_KEY: process.env.CLIENT_KEY,
          CLIENT_SECRET: process.env.CLIENT_SECRET,
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error);
    if (error.message.status === 429) {
      return res
        .status(429)
        .json({ error: "Rate limit exceeded. please try again" });
    } else if (
      error.message.status === 500 &&
      error.response.data.error === "Simulated error testing purposes"
    ) {
      return res
        .status(500)
        .json({ error: "Simulated error for testing purposes" });
    }
    res.status(500).json({ error: "Failed to fetch flights." });
  }
};

const getHotels = async (req, res) => {
  try {
    const response = await axiosInstance.get("/hotels");

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch hotels." });
  }
};

const getSites = async (req, res) => {
  try {
    const response = await axiosInstance.get("/sites");

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch sites." });
  }
};



const getHotelsByLocation = async (req, res) => {

  try {
    const { location } = req.query;
    console.log(location);
    const response = await axiosInstance.get(
      `/hotels/search?location=${location}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Hotels By Locations" });
  }
}

const getSitesByLocation = async (req, res) => {
  try{
    const { location } = req.query;
    console.log(location);
    const response = await axiosInstance.get(
      `/hotels/search?location=${location}`
    );
    res.json(response.data);

  }catch (error) {
    res.status(500).json({ error: "Failed to fetch sites By Locations" });
  }
};

module.exports = {
  getFlights,
  getHotels,
  getSites,
  getFlightByOriginandDestination,
  getHotelsByLocation,
  getSitesByLocation,
};
