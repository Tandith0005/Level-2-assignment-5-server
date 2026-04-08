import OpenAI from "openai";
import { envVars } from "../../../config/envVars.js";

const openai = new OpenAI({
  apiKey: envVars.OPENAI_API_KEY,
});

export const askAI = async (message: string): Promise<string> => {
  console.log("API KEY:", envVars.OPENAI_API_KEY ? "EXISTS" : "MISSING");
  if (!envVars.OPENAI_API_KEY) {
    throw new Error("OpenAI API key is not configured");
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are Planora assistant, a helpful AI for an event platform.
Help users with joining events, creating events, payments, registration, navigation, and general FAQs.
Platform features:
- Users can create events
- Users can join events
- Payments via Stripe
- Dashboard for managing events
- Navigation for events and other features
Be friendly, concise, and professional. Use bullet points when helpful.
        `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    // return (
    //   response.choices[0]?.message?.content ||
    //   "Sorry, I couldn't generate a response. Please try again."
    // );
    return "This is a demo AI response. Real AI requires API billing.";
  } catch (e) {
    // return "Sorry, I couldn't generate a response. Please try again.";
    return "This is a demo AI response. Real AI requires API billing.";
  }
};
