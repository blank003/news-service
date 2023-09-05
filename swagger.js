const swaggerJSDoc = require('swagger-jsdoc');

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0', // Specify the OpenAPI version
  info: {
    title: 'News API', // Title of the API
    version: '1.0.0', // Version of the API
    description: 'Documentation for the News API', // Description of the API
  },
  components: {
    securitySchemes: {
      apiKey: {
        type: 'apiKey',
        name: 'X-API-Key', // Header name where the API key will be passed
        in: 'header', // Use 'header' to pass the API key as a header
      },
    },
  },
  basePath: '/', // The base path of the API
  paths: {
    // Define your dynamic routes and their documentation here
    '/news/{endpointName}': {
      get: {
        summary: 'Get data from a specific endpoint',
        security: [
            {
              apiKey: [], // Reference the security scheme you defined earlier
            },
        ],
        parameters: [
            {
                name: 'endpointName',
                in: 'path',
                description: 'The name of the dynamic endpoint',
                required: true,
                schema: {
                type: 'string',
                },
            },
            {
                name: 'q',
                in: 'query',
                description: 'The keyword that you want to search(Min length 3)',
                required: true,
                schema: {
                type: 'string',
                minLength: 3, 
                },
            },
            {
                name: 'lang',
                in: 'query',
                description: 'Launguage for the article (default en)',
                required: false,
                schema: {
                type: 'string',
                enum: ['ar', 'zh','nl','en','fr','de','el','he','hi','it','ja','ml','mr','no','pt','ro','ru','es','sv','ta','te','uk'],
                },
            },
            {
                name: 'country',
                in: 'query',
                description: 'Country default(us)',
                required: false,
                schema: {
                    type: 'string',
                    enum: ['au','br','ca','cn','eg','fr','de','gr','hk','in','ie','il','it','jp','nl','no','pk','pe','ph','pt','ro','ru','sg','es','se','ch','tw','ua','gb','us'],
                },
            },
            {
                name: 'max',
                in: 'query',
                description: 'Maximum number of artiicles you want to fetch',
                required: false,
                schema: {
                    type: 'integer',
                    minimum: 1,
                    maximum: 100,
                },
            },
            {
                name: 'in',
                in: 'query',
                description: 'The "in" parameter (one or more from allowed values)',
                required: false,
                schema: {
                  type: 'array',
                  items: {
                    type: 'string',
                    enum: ['title', 'description', 'content'], // Allowed values for "in"
                  },
                },
                style: 'form', // Specifies that the values should be serialized as comma-separated (e.g., title,description)
                explode: true, // Specifies that the array should be exploded into separate query parameters
              },
              {
                name: 'from',
                in: 'query',
                description: 'Start date (format: YYYY-MM-DDThh:mm:ssZ)',
                required: false,
                schema: {
                  type: 'string',
                  format: 'date-time', // Indicates the expected date-time format
                },
              },
              {
                name: 'to',
                in: 'query',
                description: 'End date (format: YYYY-MM-DDThh:mm:ssZ)',
                required: false,
                schema: {
                  type: 'string',
                  format: 'date-time', // Indicates the expected date-time format
                },
              },

            {
                name: 'publishedAt',
                in: 'query',
                description: 'Published at',
                required: false,
                schema: {
                type: 'string',
                enum: ['publishedAt', 'relevance'], 
                },
            },
          // Add any other parameters if needed
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                example: { message: 'Data from the endpoint' },
              },
            },
          },
          // Add other response codes and examples
        },
      },
    },
  },
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: [],
});

module.exports = swaggerSpec;
