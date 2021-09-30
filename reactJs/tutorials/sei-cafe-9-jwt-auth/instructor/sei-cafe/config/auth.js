const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;

module.exports = function (req, res, next) {
  //find token from either the header, the query params or the posted body
  let token = req.get("Authorization") || req.query.token || req.body.token;
  if (token) {
    //remove the bearer from the string for easier verification
    token = token.replace("Bearer ", "");
    //verify the token and run the callback once its done.
    //The call back will hold the error if there is one and it will hold the decoded user if the token is valid
    jwt.verify(token, SECRET, function (err, decoded) {
      //if there is an error we call next and pass the error to it.
      //next triggers out next middleware in order to our last middleware which is usually our controller middleware function
      /*IMPORTANT: If an argument is passed to the next function it is understood to be an error and triggers the error function automatically. 
      This will bypass all other middlewares*/
      if (err) {
        //the error function middleware can be found in the server file.
        next(err);
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    next();
  }
};
