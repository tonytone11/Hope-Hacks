const axios = require("axios");
const path = require('path');
// const dotenv = require("dotenv");
require("dotenv").config({ path: path.resolve(__dirname, "../../../../.env") });
// dotenv.config({ path: '../../../.env' });

// Define a function to fetch data
async function fetchData(city, state) {
  const options = {
    method: "GET",
    url: "https://homeless-shelters-and-foodbanks-api.p.rapidapi.com/resources",
    params: {
      city: city,
      state: state,
    },
    headers: {
      "x-rapidapi-key": process.env.RAPIDAPI_KEY, // Use environment variable for security
      "x-rapidapi-host": "homeless-shelters-and-foodbanks-api.p.rapidapi.com",
    },
  };

  try {
    const response = await axios.request(options);

    // Check if response.data is an array
    if (Array.isArray(response.data) && response.data.length > 0) {
      // Map through the data and return the necessary fields for each item
      return response.data.map((item) => ({
        name: item?.name || "No name available",
        city: item?.city || "No city available",
        state: item?.state || "No state available",
        description: item?.description || "No description available",
        type: item?.type || "No type available",
        full_address: item?.full_address || "No address available",
        phone_number: item?.phone_number || "No phone number available",
        business_hours: item?.business_hours || "No business hours available",
      }));
    } else {
      console.error("Invalid data format or empty array", response.data);
      return []; // Return an empty array if no valid data
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    if (error.response) {
      console.error("Status Code:", error.response.status);
      console.error("Response Data:", error.response.data);
    }
    return []; // Return an empty array in case of error
  }
}

// Call the function
// fetchData(`charlotte`, `nc`).then((data) => console.log(data));

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   data = body
// });

//     return data;
// }

module.exports = fetchData;
