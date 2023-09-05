// newsApi.js
const axios = require('axios');
// const config = require('./config'); uncomment the code to pass api key using config.js
// const API_KEY = config.apiKey; uncomment the code to pass api key using config.js
const THIRD_PARTY_API_BASE_URL = 'https://gnews.io/api/v4';

// Define functions for each endpoint
const endpoints = {
  search: '/search',
  // Add more endpoints here as needed
};

// Define an object to map endpoint names to their corresponding functions
const   endpointFunctions = {
  search: (params) => makeApiRequest(endpoints.search, params),
  // Add more endpoint functions here as needed
};

// Function to make the actual API request
const makeApiRequest = async (endpoint, params = {}) => {
  try {
    // params.apikey = API_KEY;         uncomment the code to pass api key using config.js
    const response = await axios.get(`${THIRD_PARTY_API_BASE_URL}${endpoint}`, {
      params,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching data from the third-party API:', error);
    throw error;
  }
};

module.exports = {
  endpointFunctions,
};
