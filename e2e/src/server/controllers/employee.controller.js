const db = require("../Model");
const Employee = db.employees;
const Op = db.Sequelize.Op;
const jwt = require('jsonwebtoken')
const config = require("../config/auth.config");
const Meeting = db.meetings;


var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'deshpandepm07@gmail.com',
    pass: 'Asdf@1234#'
  }
});
let OTP = '';
let num = '1234567890';
let sentOTP = '';
//////signup///////////////////////////////
exports.sendotp = (req, res) => {
  const mail = req.body.mail;
  console.log(req.body.mail)
  Employee.findOne({ where: { mail: req.body.mail } })
    .then(data => {

      if (null != data) {
        console.log(data)
        OTP = ''
        res.status(200).send({
          otp: OTP
        });
      }
      else {
        console.log("else")
        for (let i = 0; i < 4; i++) {
          sentOTP += num[Math.floor(Math.random() * 10)];
        }
        console.log(this.sendOTP)


        var mailOptions = {
          from: 'deshpandepm07@gmail.com',

          to: mail,
          subject: 'OTP to create your Password',
          text: "Hello User, Your OTP to create new Password is :" + sentOTP,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        OTP = sentOTP;
        sentOTP = "";
        res.status(200).send({
          otp: OTP
        });

      }

    })

    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with mail id="
      });
    });

}


//     for(let i=0; i<4;i++)
//     {
//       sentOTP +=num[Math.floor(Math.random()*10)];
//     }
//    console.log(this.sendOTP)
//            

//     var mailOptions = {
//       from: 'deshpandepm07@gmail.com',

// to:mail,
// subject:'OTP to create your Password',
// text:"Hello User, Your OTP to create new Password is :" +sentOTP,
// };
// transporter.sendMail(mailOptions, function(error, info){  
//      if (error) {   
//      console.log(error); 
//        } else {   
//       console.log('Email sent: ' + info.response);  
//         }  
//         });

//         OTP=sentOTP;
//         sentOTP="";
//         res.status(200).send({
//                         otp:OTP
//                       });  



/////sign in///////////////////////////////////////
exports.findAll = (req, res) => {
  Employee.findOne({
    where: {
      mail: req.body.mail,
      password: req.body.password,
    }
  })
    .then(data => {
      if (!data) {
        return res.status(404).send({ message: "User Not found." });
      }
      //19/10
      var token = jwt.sign({ id: data.id }, config.secret, {
        expiresIn: 10 // 24 hours
      });
      // res.status(200).send(data);
     console.log("token in sign in is - "+token)
      //19/10
      res.status(200).send({
        id: data.id,
        name: data.name,
        mail: data.mail,
        meetingId: data.meetingId,
        accessToken: token
      });
     
    })
    .catch(err => {
      res.status(500).send({
        message: err.message
      });
    });

}
/////setpw//////////////////////////////
exports.createuser = (req, res) => {
  meetingID = '';
  console.log("in create user")
  Employee.findOne({
    where: {
      mail: req.body.mail,
    }
  })
    .then(data => {
      if (!data) {
        for (let i = 0; i < 10; i++) {
          meetingID += num[Math.floor(Math.random() * 10)];
        }
        const user = {
          name: req.body.fname + " " + req.body.lname,
          mail: req.body.mail,
          password: req.body.password,
          meetingId: meetingID
        };
        Employee.create(user)
        res.status(200).send({ id: meetingID })
      }
      else {
        Employee.update({ password: req.body.password }, {
          where: { mail: req.body.mail }
        }
        )
        res.status(200).send({ id: '' })
      }
    }).catch(err => {
      res.status(500).send({
        message: "Error retrieving User with mail id="
      });
    });
}
/////////////////////////////////////forgot//////////////////////////
exports.findUser = (req, res) => {
  mail = req.body.mail
  Employee.findOne({ where: { mail: req.body.mail } })
    .then(data => {

      if (null == data) {
        res.status(200).send(data);
      }
      else {
        console.log("in else")
        for (let i = 0; i < 4; i++) {
          console.log(i)
          sentOTP += num[Math.floor(Math.random() * 10)];
        }
        var mailOptions = {
          from: 'deshpandepm07@gmail.com',

          to: mail,
          subject: 'OTP to create your Password',
          text: "Hello User, Your OTP to create new Password is :" + sentOTP,
        };
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });

        OTP = sentOTP;
        sentOTP = "";
        user = { data: data, otp: OTP }

        res.status(200).send(user);
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with mail id="
      });
    });
};
////////////////////////////////////////scheduleMeeting///////////////////////////
exports.scheduleMeeting = (req, res) => {
  var mID = ""
  //var mmID=""
  var meetingID = ""
  var peermail = ""
  var time = ""
  var url = "http://localhost/4200/join/"
  var date = ""
  var mail = ""
  var name = ""

  mail = req.body.mail
  peermail = req.body.emp.peermail
  date = req.body.emp.model.year + "/" + req.body.emp.model.month + "/" + req.body.emp.model.day,
    time = req.body.emp.time.hour + ":" + req.body.emp.time.minute,
    topic = req.body.emp.topic

  Employee.findOne({ where: { mail: req.body.mail } })
    .then(data => {
      name = data.name;

      if (req.body.emp.meeting == '1') {

        for (let i = 0; i < 5; i++) {
          meetingID += num[Math.floor(Math.random() * 10)];
        }
        mID = "ZOOM_" + meetingID
        url = url + mID
      }

      else {
        mID = data.meetingId;
      }

      const user = {
        mail: mail,
        peermail: peermail,
        date: date,
        time: time,
        topic: topic,
        meetid: mID
      };
      Meeting.create(user)
      var mailOptions = {
        from: 'deshpandepm07@gmail.com',

        to: peermail,
        subject: 'Meeting Scheduled for ' + topic,

        //               html : "Hello " +peermail+", "+name+ " has scheduled your meeting at "+time+ " on "+date+". Your meeting ID is: " +mID+"Join a meeting : "+'<a href =${url}>'+link+"</a>"

        html: ' <p> Hello ' + peermail + ', ' + name + ' has scheduled your meeting at ' + time + ' on ' + date + '.</p> Your meeting ID is: ' + mID + '<p>Click <a href="http://localhost:4200/join/' + mID + '">here</a> to join meeting</p>'
      };



      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
      res.status(200).send({ id: mID })
    })

}



exports.fetchData = (req, res) => {

  const mail = req.params.mail;
  console.log(mail)

  Employee.findAll({ where: { mail: mail } })
    .then(data => {

      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving User with mail id=" + mail
      });
    });

}


// exports.fetchName= (req, res) => {​​ 
//   Meeting.findOne({​​ where:{​​meetid: req.params.room}​​ }​​).then(data=> {​​

//     if(data==null){​​
//       res.status(200).send(data);
//     }​​else
//     {​​
//      hostmail=data.mail;
//      Employee.findOne({​​ where:{​​mail: hostmail}​​ }​​).then(data=> {​​
//      res.status(200).send(data);
//       }​​);
//     }​​
//   }​​);

//   }​​
exports.fetchName = (req, res) => {
  Meeting.findOne({ where: { meetid: req.body.room } }).then(
    data => {
      console.log(data + "in fetch name");
      if (data == null) {
        Employee.findOne({ where: { meetingId: req.body.room } })
          .then(data => {
            console.log(data + 'fetch name: if')
            res.send(data);
          })
        //  res.status(200).send(data)
      }

      else {
        hostmail = data.mail;
        Employee.findOne({ where: { mail: hostmail } }).then(
          data => {
            res.status(200).send(data);
          }
        )
      }
    }
  )
}

exports.fetchHistory = (req, res) => {
  console.log(req.body.hostmail + "in fetch history");
  Meeting.findAll({ where: { mail: req.body.hostmail } }).then(
    data => {
      res.status(200).send(data);
    }
  )
}


