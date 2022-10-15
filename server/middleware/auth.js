const  jwt = require("jsonwebtoken")

exports.auth = (req, res, next)=>{
  try {
      const token = req.headers["authtoken"]
      if (!token){
        return res.status(401).send("No token, authorization deniend !!")
      }

     const decoded = jwt.verify(token, "jwtSecret")

     console.log("Middleware : ", decoded)

     req.user = decoded.user
 
    next()

  } catch (error) {
    console.log(error);
    res.status(401).send("Token is invalid !!")
  }
}

// make extent from route folder in api file
// Let make controller
exports.adminCheck = async(req, res, next)=>{
  try {
      
    const {username} = req.user
    const adminUser = await MyUser.findOne({username}).exec()
    /// if you are admin make next controller
   if(adminUser.role !== 'admin'){
      res.status(403).send(err, 'Sorry, Admin access denied !!')
   }else{
    next();
   }
 
  } catch (error) {
    console.log(error);
    res.status(401).send("Token is invalid !!")
  }
}

