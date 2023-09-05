const express = require('express');
const swaggerUi = require('swagger-ui-express'); // Import swagger-ui-express
const { apiProxyMiddleware } = require('./middleware/proxyMiddleware');
const { validateParametersMiddleware } = require('./middleware/validateParams');
const swaggerSpec = require('./swagger'); // Import your Swagger specification

const app = express();
const port = 3000;

app.use(express.json()); // Enable JSON request body parsing

// Serve Swagger UI at a specific route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Define a dynamic route for handling different endpoints
app.get('/news/:endpointName', validateParametersMiddleware, apiProxyMiddleware, async (req, res) => {
  // Extract and validate query parameters from the request
  console.log(req, res);
  const params = req.query;

  // Handle the response from the apiProxyMiddleware
  const cachedResponse = res.locals.cachedResponse;

  if (cachedResponse) {
    // If cached response is available, send it
    return res.json(JSON.parse(cachedResponse));
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
module.exports = app;
