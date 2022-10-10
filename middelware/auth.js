const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
    // console.log("Yha aaya");
    // console.log("****************************************",req.header("Authorization").replace("Bearer ", ""));
    // console.log("Yaha Aya");
  const token =
     req.header("Authorization").replace("Bearer ", "");
   
  if (!token) {
    return res.status(403).send("token is missing");
  }

  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decode);
  } catch (error) {
    return res.status(401).send("Invalid TOKEN");
  }
  next();
};

module.exports = auth;
