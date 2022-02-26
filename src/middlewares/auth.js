const  jwt = require("jsonwebtoken");

exports.verifyToken(req, res, next=>{
  if (req.headers.authorization) {

      jwt.verify(req.headers.authorization,(err, token)=> {
          if(token===undefined){
              res.status(401).json({
                  message: "Token invalid"
              })
          }else{
              next();
          }
        });
  } else {
      res.status(401).json({
          message: "please athentication"
      })
  }
})

