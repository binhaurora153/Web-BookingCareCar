require("dotenv").config();
import nodemailer from "nodemailer";
// const nodemailer = require("nodemailer");

let sendSimpleEmail = async (dataSend) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for port 465, false for other ports
    auth: {
      user: process.env.EMAIL_APP,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });
  const info = await transporter.sendMail({
    from: '"Master, Doctor Thiện Bình" <lbnh131@.gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: getBodyHTML(dataSend),
  });
};

let getBodyHTML = (dataSend) => {
  let result = "";
  if (dataSend.language === "vi") {
    result = `
    <h3>Xin chào ${dataSend.patientName}!</h3>
    <p>Bạn đã đặt lịch khám thành công tại trang Bookingcare của chúng tôi.</p>
    <p><strong>Thông tin chi tiết:</strong></p>
    <ul>
    <li><strong>Thời gian:</strong> ${dataSend.time}</li>
    <li><strong>Bác sĩ:</strong> ${dataSend.doctorName}</li>
    </ul>
    <p><strong>Nếu thông tin trên là đúng sự thật, vui lòng nhấn vào đường link bên dưới để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.</strong></p>
    <div>
    <a href=${dataSend.redirectLink}>Xác nhận</a>
    </div>
    <p>Chúng tôi rất mong được phục vụ bạn!</p>
    <p>Xin chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng tôi.</p>
    `;
  }

  if (dataSend.language === "en") {
    result = `
    <h3>Hello ${dataSend.patientName}!</h3>
    <p>You have successfully booked an appointment at our Bookingcare site.</p>
    <p><strong>Detailed information:</strong></p>
    <ul>
    <li><strong>Time:</strong> ${dataSend.time}</li>
    <li><strong>Doctor:</strong> ${dataSend.doctorName}</li>
    </ul>
    <p><strong>If the above information is true, please click on the link below to confirm and complete the medical appointment procedure.</strong></p>
    <div>
    <a href=${dataSend.redirectLink}>Confirm</a>
    </div>
    <p>We look forward to serving you!</p>
    <p>Thank you very much for using our service.</p>
    `;
  }
  return result;
};
module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
