// src/utils/sendEmail.ts
import { Resend } from "resend";
import ejs from "ejs";
import path from "path";
import { envVars } from "../../config/envVars.js";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (
  to: string,
  subject: string,
  templateName: string,
  data: any
) => {
  try {
    // Render EJS template
    const templatePath = path.join(
      process.cwd(),
      "src/app/templates",
      `${templateName}.ejs`
    );

    const html = (await ejs.renderFile(templatePath, data)) as string;

    // Send email via Resend
    const response = await resend.emails.send({
      from: "Planora <onboarding@resend.dev>",
      to : envVars.EMAIL_USER,
      subject,
      html,
    });

    console.log("✅ Email sent via Resend:", response);
    return response;
  } catch (error) {
    console.error("❌ EMAIL SEND ERROR:", error);
    throw error;
  }
};