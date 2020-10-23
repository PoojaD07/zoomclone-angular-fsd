
module.exports = (sequelize, Sequelize) => {
const Meeting = sequelize.define("meeting", {
    mail: {
    type:Sequelize.STRING
          },
    peermail: {
    type:Sequelize.STRING
          },
    date: {
    type:Sequelize.STRING
          },
      time: {
      type:Sequelize.STRING
            },
    duration: {
    type:Sequelize.STRING
          },
    meetid:   {
    type:Sequelize.STRING
          }
        });
    return Meeting;
      }; 
