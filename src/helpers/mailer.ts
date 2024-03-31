import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export const sendMail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = uuidv4();

    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 360000,
      });
    }

    const transport = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '7449b9fb33791b',
        pass: '1b340cc744ddb3',
      },
    });

    const emailMessage = (emailType: string) => {
      return `<p>Click <a href=${
        process.env.DOMAIN
      }/${emailType.toLowerCase()}Email?token=${hashedToken}>here</a> to ${
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password'
      } or copy paste the link below in your browser.
      <br> ${
        process.env.DOMAIN
      }/${emailType.toLowerCase()}Email?token=${hashedToken}
      </p>`;
    };

    const mailOptions = {
      from: 'sahil@sahil.ai',
      to: email,
      subject:
        emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: emailMessage(emailType),
    };

    const mailResponse = await transport.sendMail(mailOptions);

    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
