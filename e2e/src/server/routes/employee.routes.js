const authConfig = require("../config/auth.config.js");

module.exports = app => {
    const employees = require("../controllers/employee.controller.js");
    const authJWT = require("../middleware/auth.jwt")
    var router = require("express").Router();
    router.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

  // Create a new user
  router.post("/sendotp", employees.sendotp);
   
 // router.get("/:userId/:mail", employees.checkUser); 

 router.post("/createuser", employees.createuser);
 
 router.post("/signin", employees.findAll);

 //  router.put("/:mail/:otp",employees.update); 
 
 router.post("/forgotpw", employees.findUser); 
      
 router.post("/schedulemeeting", employees.scheduleMeeting); 

 router.get("/:mail", employees.fetchData); 

 router.post("/room", employees.fetchName);

 router.post("/meetinghistory", employees.fetchHistory);
 
 app.use('/api/employees', router);
    
  };