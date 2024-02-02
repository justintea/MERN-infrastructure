//* this is an overall protection code to check for Authorization
//* you can put this anywhere in your other code
// eg. routes 

module.exports = function (req, res, next) {
  
  //? Unauthorized. Hit a route that requires Auth, and user isnt.
  // To respond with a status code 
  // for the extra message, +.json('text here');
  // otherwise, next 
  if (!req.user) return res.status(401).json('Unauthorized');
  next();

};