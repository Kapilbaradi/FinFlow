import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const { HOST, USER, PASS } = process.env;

const mailSender = async (email, title, body) => {
  try {
    //Create a Transpoter to send emails
    let transporter = nodemailer.createTransport({
      host: HOST,
      auth: {
        user: USER,
        pass: PASS,
      },
    });

    //Send email to users
    let info = await transporter.sendMail({
      from: "baradikapil00@gail.com",
      to: email,
      subject: title,
      html: body,
    });

    return info;
  } catch (error) {
    console.log(error);
  }
};

export default mailSender;
