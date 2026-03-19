import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

// src/utils/sendEmail.ts
export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  data: any
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const templatePath = path.join(
      process.cwd(),
      "src/app/templates", // Double check this path exists in the build!
      `${templateName}.ejs`
    );

    console.log("Attempting to render template at:", templatePath); // Debug log
    
    const html = (await ejs.renderFile(templatePath, data)) as string;

    console.log("Attempting to send email to:", to); // Debug log

    const info = await transporter.sendMail({
      from: `"Planora" <${process.env.EMAIL_USER}>`, // Add a name
      to,
      subject,
      html,
    });

    console.log("Email sent successfully:", info.messageId);
    return info;
    
  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error); // This will show up in Render logs
    throw error; // Re-throw so the API returns an error to the frontend
  }
};