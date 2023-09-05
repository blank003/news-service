//Function to validate and parse keyword(q)
function validateQParameter(q) {
    // URL-decode the 'q' parameter to check if it's properly encoded
    const decodedQ = decodeURIComponent(q);
  
    // Check if the decoded query contains special characters without quotes
    if (/[\&\|\!]/.test(decodedQ) && !/".*"/.test(decodedQ)) {
      return false; // Invalid query
    }
  
    return true; // Valid query
  }
  
  
// Function to validate query parameters based on constraints
function validateParameters(params, constraints) {
    const errors = [];
  
    for (const paramName in constraints) {
      if (constraints.hasOwnProperty(paramName)) {
        const paramConstraints = constraints[paramName];
        const paramValue = params[paramName];
  
        // Check if the parameter is required but missing
        if (paramConstraints.required && !paramValue) {
          errors.push(`Missing required parameter: ${paramName}`);
        } else if (paramValue) {
          // Check other constraints based on the parameter name
          switch (paramName) {
            case 'q':
                if (!validateQParameter(paramValue)) {
                    errors.push(`Invalid ${paramName} parameter: ${paramValue}`);
                }
                break;
            case 'from':
            case 'to':
                if (!isValidDateTime(paramValue)) {
                    errors.push(`Invalid ${paramName} parameter: ${paramValue}`);
                }
                break;
            case 'nullable':
                // Validate each value within the comma-separated list
                const nullableValues = paramValue.split(',');
                for (const value of nullableValues) {
                    if (!paramConstraints.allowedValues.includes(value.trim())) {
                    errors.push(`Invalid nullable parameter value: ${value}`);
                    }
                }
                break;
            case 'in':
            // Validate each value within the comma-separated list
            const inValues = paramValue.split(',');
            for (const value of inValues) {
                if (!paramConstraints.allowedValues.includes(value.trim())) {
                errors.push(`Invalid nullable parameter value: ${value}`);
                }
            }
            default:
              // Add logic to check other constraints for specific parameters
              break;
          }
        }
      }
    }
    // Check if 'from' is greater than 'to' when both are provided
    if (params.from && params.to && params.from > params.to) {
        errors.push(`'from' cannot be greater than 'to'`);
    }
    return errors;
  }
  
  
  // Function to validate date and time values in the format YYYY-MM-DDThh:mm:ssZ
  function isValidDateTime(dateTime) {
    const dateTimeRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;
    return dateTimeRegex.test(dateTime);
  }
  
module.exports = { validateParameters };