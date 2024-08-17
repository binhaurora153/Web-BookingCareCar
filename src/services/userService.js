import db from "../models/index";
import bcrypt from "bcryptjs";

const { emit } = require("nodemon");

let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExist = await checkUserEmail(email);
      if (isExist) {
        //user already exist

        let user = await db.User.findOne({
          attributes: ["email", "roleId", "password"],
          where: { email: email },
          raw: true,
        });
        if (user) {
          // so sánh pass
          let check = await bcrypt.compareSync(password, user.password); // false
          if (check) {
            userData.errCode = 0;
            userData.errMessage = `Oke`;

            delete user.password;
            userData.user = user;
          } else {
            userData.errCode = 3;
            userData.errMessage = `Wrong pass`;
          }
        } else {
          userData.errCode = 2;
          userData.errMessage = `User not found `;
        }
      } else {
        //lỗi
        userData.errCode = 1;
        userData.errMessage = `Your's Email is not exist in your system `;
      }
      resolve(userData);
    } catch (e) {
      reject(e);
    }
  });
};

let checkUserEmail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

// let getAllUsers = (userId) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       let users = "";
//       if (userId === "ALL") {
//         users = await db.User.findAll({});
//       }

//       if (userId && userId !== "ALL") {
//         users = await db.User.findOne({
//           where: { id: userId },
//         });
//       }

//       resolve(users);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

let getAllUsers = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let users;
      if (userId === "ALL") {
        users = await db.User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
      } else if (userId) {
        users = await db.User.findOne({
          where: { id: userId },
          attributes: {
            exclude: ["password"],
          },
        });
      }
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  handleUserLogin: handleUserLogin,
  getAllUsers: getAllUsers,
};
