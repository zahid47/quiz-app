import nodemailer from "nodemailer";
import log from "../utils/logger";
import { signToken } from "../utils/jwt";
import config from "../utils/config";

const constructMsg = (
  type: "VERIFY" | "RESET",
  recipientEmail: string,
  token: string
) => {
  switch (type) {
    case "VERIFY":
      const verifyUrl = `${config.HOST}:${config.PORT}/user/verify/${token}`;
      return {
        from: `Dynamic Quiz <${process.env.ETHEREAL_EMAIL}>`,
        to: `Recipient <${recipientEmail}>`,
        subject: `Verify your Dynamic Quiz email`,
        text: `Please verify your account using this link: ${verifyUrl}. It will expire in 1 day.`,
        html: `<p><a href=${verifyUrl}>Click here</a> to verify your account. The link will expire in 1 day.</p>`,
      };
    case "RESET":
      const resetUrl = `${config.CLIENT_URL}/reset-pass/${token}`;
      return {
        from: `Dynamic Quiz <${process.env.ETHEREAL_EMAIL}>`,
        to: `Recipient <${recipientEmail}>`,
        subject: `Reset your Dynamic Quiz password`,
        text: `Please reset your password using this link: ${resetUrl}. It will expire in 1 day.`,
        html: `<p><a href=${resetUrl}>Click here</a> to reset your password. The link will expire in 1 day.</p>`,
      };
  }
};

export const sendEmail = (
  recipientId: string,
  recipientEmail: string,
  type: "VERIFY" | "RESET"
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: config.ETHEREAL_EMAIL,
      pass: config.ETHEREAL_PASSWORD,
    },
  });

  const token = signToken(recipientId, config.EMAIL_SECRET, config.EMAIL_TTL, {
    for: "verify-email",
  });
  const message = constructMsg(type, recipientEmail, token);

  transporter.sendMail(message, (err, info) => {
    if (err) throw err;

    if (process.env.NODE_ENV !== "production") {
      log.info("Message sent: %s", info.messageId);
      // Preview only available when sending through an Ethereal account
      log.info("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }
  });
};
