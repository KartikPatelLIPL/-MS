const { query } = require("express");
const {
  getFlights,
  getHotels,
  getSites,
  getFlightByOriginandDestination,
} = require("../controllers/itineraryController");

const  axiosInstance  = require("../lib/axios.lib.js");

jest.mock('../lib/axios.lib.js',()=>({
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
});
