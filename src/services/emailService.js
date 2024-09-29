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
    from: '"Bình 👻" <lbnh131@.gmail.com>', // sender address
    to: dataSend.reciverEmail, // list of receivers
    subject: "Thông tin đặt lịch khám bệnh", // Subject line
    html: `
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
    <p>Xin chân thành cảm ơn bạn đã sử dụng dịch vụ của chúng tôi</p>

    `, // html body
  });
};

module.exports = {
  sendSimpleEmail: sendSimpleEmail,
};
