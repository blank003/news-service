
// Custom middleware for parameter validation
const { validateParameters } = require('../validation/searchApiValidation');
const { searchConstraints } = require('../constraints/searchConstraints');

const validateParametersMiddleware = (req, res, next) => {
    const params = req.query;
    const validationErrors = validateParameters(params, searchConstraints);
  
    if (validationErrors.length > 0) {
      return res.status(400).json({ errors: validationErrors });
    }
  
    // If validation passes, proceed to the next middleware (apiProxyMiddleware)
    next();
  };

module.exports = {validateParametersMiddleware};