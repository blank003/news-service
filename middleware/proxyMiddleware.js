const NodeCache = require('node-cache');
const cache = new NodeCache({ stdTTL: 60 }); // Set an expiration time of 60 seconds (adjust as needed)
const { endpointFunctions } = require('../newsApi');

// Function to generate a unique request hash
function getRequestHash(req) {
  const { method, url, query } = req;
  return `${method}:${url}:${JSON.stringify(query)}`;
}

const apiProxyMiddleware = async (req, res, next) => {
  const requestHash = getRequestHash(req);

  try {
    // Check the cache first
    const cachedResponse = cache.get(requestHash);
    if (cachedResponse) {
      console.log('Cache hit');
      return res.end(cachedResponse);
    }

    const { endpointName } = req.params; // Get the endpoint name from the query

    if (!endpointFunctions[endpointName]) {
      throw new Error('Invalid endpoint name');
    }

    // If nothing is found in the cache, make a request to the third-party API
    const params = req.query; // Use the request's query parameters

     // Read the API key from the header
     const apiKey = req.headers['x-api-key'];

     // Use the user-provided API key
     params.apikey = apiKey;

    // Use the appropriate endpoint-specific function
    const data = await endpointFunctions[endpointName](params);

    // Store the response in the cache with the request hash as the key
    const cacheSuccess = cache.set(requestHash, JSON.stringify(data));
    if (!cacheSuccess) {
      console.error('Failed to cache response');
    }

    // Send the response to the client
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
  } catch (error) {
    // Handle errors from the third-party API or other issues
    console.error('Error fetching data from the third-party API:', error);
    res.status(500).json(error);
  }
};

module.exports = { apiProxyMiddleware };
