const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //? 1. Check for the token being sent, in a header or as a query parameter
  // if there is an 'Authorization' in the request (within header), thats where line 9 ends.
  // 'req.get' not to be confused with 'app.get', that defines routes. This is just referencing within Object.
  // if it doesnt return something, 'req.query.token' is passed in, as a query parameter.
  let token = req.get("Authorization") || req.query.token;
  //? 2. No token was sent, default to null. Therefore, code after L12 relates to stuff WITH A TOKEN.
  req.user = null;
  if (!token) return next();

  //? 3. Remove the 'Bearer ' if it was included in the token header
  // replace creates a new string
  token = token.replace("Bearer ", "");

  //? 4. Check if token is valid and not expired
  // uses callback approach. this is a node.  (??)
  // process.env.SECRET is the secret key, first used to sign the token

  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    // If invalid token (tampered or expired), err will be set
    if (err) return next();
    // If valid token, decoded will be the token's entire payload
    req.user = decoded.user; 

    //? 0. If interested in expiration, lolz
    // add an 'exp' property that you can add in the Request / a controller function, and
    // exp multiplied by 1000, because exp is in milliseconds, and we make it compatible with js Date
    // create a new Date Object from this!
    req.exp = new Date(decoded.exp * 1000); 
    
    return next();
  });
};
