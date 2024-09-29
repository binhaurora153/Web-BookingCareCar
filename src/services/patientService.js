import { times } from "lodash";
import db from "../models/index";
import emailService from "./emailService";
let postBookAppoinment = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!data.email || !data.doctorId || !data.timeType || !data.date) {
        resolve({
          errCode: 1,
          errMessage: "Missing ",
        });
      } else {
        await emailService.sendSimpleEmail({
          reciverEmail: data.email,
          patientName: "Phước Quang",
          time: "8.00 - 9.00 - Chủ nhật",
          doctorName: "Thiện Bình",
          redirectLink: "https://www.facebook.com/",
        });
        let user = await db.User.findOrCreate({
          where: { email: data.email },
          defaults: {
            email: data.email,
            roleId: "R3",
          },
        });

        if (user && user[0]) {
          await db.Booking.findOrCreate({
            where: { patientId: user[0].id },
            defaults: {
              statusId: "S1",
              doctorId: data.doctorId,
              patientId: user[0].id,
              date: data.date,
              timeType: data.timeType,
            },
          });
        }
        resolve({
          errCode: 0,
          errMessage: "Succeed",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  postBookAppoinment: postBookAppoinment,
};
