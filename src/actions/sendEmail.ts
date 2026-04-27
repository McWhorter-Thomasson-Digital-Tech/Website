"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const STATIC_DESTINATION = "contact@mtdigitaltech.com"; 
const ALLOWED_DOMAIN = "@mtdigitaltech.com";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  dynamicTo?: string; 
}

function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export async function sendContactFormEmail(data: ContactFormData) {
  const { name, email, message, dynamicTo } = data;

  // 1. Basic Validation
  if (!name || name.trim().length < 2) {
    return { success: false, error: "Please enter your full name." };
  }

  if (!email || !isValidEmail(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (!message || message.trim().length < 10) {
    return { success: false, error: "Please enter a message at least 10 characters long." };
  }

  try {
    // 2. Determine the destination address based on the security logic
    let destinationEmail = STATIC_DESTINATION;
    
    if (dynamicTo && dynamicTo.endsWith(ALLOWED_DOMAIN)) {
      destinationEmail = dynamicTo;
    }

    // 3. Send the email using Resend
    const result = await resend.emails.send({
      from: "MT Digital Tech Contact <contact@send.mtdigitaltech.com>",
      to: [destinationEmail],
      replyTo: email,
      subject: `New Lead from ${name}`,
      text: `You received a new message from ${name} (${email}):\n\n${message}`,
    });

    if (result.error) {
      console.error("Resend Error:", result.error);
      
      // Map common technical errors to user friendly ones
      const errorMsg = result.error.message.toLowerCase();
      if (errorMsg.includes("reply_to")) {
        return { success: false, error: "The email address provided is invalid. Please check and try again." };
      }
      if (errorMsg.includes("rate limit") || errorMsg.includes("limit reached")) {
        return { success: false, error: "We're receiving a lot of messages right now. Please try again in a few minutes." };
      }
      
      return { success: false, error: "We couldn't send your message right now. Please try again later." };
    }

    return { success: true, data: result.data };
  } catch (error) {
    console.error("Internal Error sending email:", error);
    return { success: false, error: "An unexpected server error occurred. Please try again later." };
  }
}

