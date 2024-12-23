const { query } = require("express");
const {
  getFlights,
  getHotels,
  getSites,
  getFlightByOriginandDestination,
  getHotelsByLocation,
  getSitesByLocation,
} = require("../controllers/itineraryController");

const app = require("../index.js")
const  axiosInstance  = require("../lib/axios.lib.js");

jest.mock('../lib/axios.lib.js',()=>({
  get: jest.fn(),

}));

jest.mock('../index.js',()=>({
  get: jest.fn(),

}));

describe("Itenerary Controller Tests", () => {
  test("should fetch flights by origin and destination", async () => {
    const mockResponse = {
      flights: [
        {
          id: 3,
          origin: "mopa",
          destination: "jammu",
          flight_number: "952",
          departure_time: "10/7/2024, 5:37:56 PM",
          arrival_time: "10/7/2024, 10:37:56 PM",
          price: 244.44,
        },
      ],
    };
    axiosInstance.get.mockResolvedValue(mockResponse);

    const req = { query: { origin: "mopa", destination: "jammu" } };
    const res = { json: jest.fn(), status: jest.fn(() => res)};

    await getFlightByOriginandDestination(req, res);

    expect(axiosInstance.get).toHaveBeenCalledWith(`/flights/search?origin=mopa&destination=jammu`);
    expect(res.json).toHaveBeenCalledWith(mockResponse.data)
  });



  test("should fetch Hotels by Location", async () => {
    const mockResponse = {
      hotels: [
        {
          id: 207,
          name: 'Radisson Hotel Agra',
          location: 'Agra',
          price_per_night: 5716.00,
          available_rooms: 5,
        },
      ],
    };
  
    // Mocking app.get to return mockResponse
    app.get.mockResolvedValue(mockResponse);
  
    const req = { query: { location: "Agra" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };
  
    // Call getHotelsByLocation and check if app.get is called
    await getHotelsByLocation(req, res);
  
    // Ensure app.get is called with the expected URL
    jest.spyOn(app, 'get').mockResolvedValue(mockResponse);
    // Ensure res.json is called with the hotels from mockResponse
    // expect(res.json).toHaveBeenCalledWith(mockResponse.hotels);
  });

  test("should fetch Site by Location", async () => {
    const mockResponse = {
      hotels: [
        {
          id: 207,
          name: 'Radisson Hotel Agra',
          location: 'Agra',
          price_per_night: 5716.00,
          available_rooms: 5,
        },
      ],
    };
  
    // Mocking app.get to return mockResponse
    app.get.mockResolvedValue(mockResponse);
  
    const req = { query: { location: "Agra" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };
  
    // Call getHotelsByLocation and check if app.get is called
    await getSitesByLocation(req, res);
  
    // Ensure app.get is called with the expected URL
    jest.spyOn(app, 'get').mockResolvedValue(mockResponse);
    // Ensure res.json is called with the hotels from mockResponse
    // expect(res.json).toHaveBeenCalledWith(mockResponse.hotels);
  });



  

});
