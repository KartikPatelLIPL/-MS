function validateFlightQueryParams(query) {
    const errors = []
  
    if(!query.origin){
      errors.push('Origin is required.');
    }
  
    if(!query.destination) {
      errors.push("Destination is required.")
    }
  
    return errors
  }

  module.exports = { validateFlightQueryParams }