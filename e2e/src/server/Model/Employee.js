module.exports = (sequelize, Sequelize) => {
const Employee = sequelize.define("employee", {
name: {
type:Sequelize.STRING
      },
mail: {
type:Sequelize.STRING
      },
password: {
type:Sequelize.STRING
      },
meetingId: {
type:Sequelize.STRING
      }

    });

return Employee;
  };


