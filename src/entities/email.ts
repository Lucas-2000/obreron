import nodemailer from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  text: string;
}

export class Email {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_FROM,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  private async sendEmail(options: EmailOptions): Promise<void> {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_FROM,
      to: options.to,
      subject: options.subject,
      text: options.text,
    };

    return this.transporter.sendMail(mailOptions);
  }

  async sendPasswordResetEmail(
    userEmail: string,
    token: string
  ): Promise<void> {
    const emailOptions = {
      to: userEmail,
      subject: "Redefinição de Senha",
      text: `Você solicitou a redefinição de senha. Clique no link a seguir para redefinir sua senha: http://localhost:3000/${token}`,
    };

    return await this.sendEmail(emailOptions);
  }
}
