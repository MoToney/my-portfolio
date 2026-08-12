"use server";

import { after } from "next/server";
import { headers } from "next/headers";
import { resend } from "@/src/lib/resend";
import { ratelimit } from "@/src/lib/rate-limit"
import { ContactFormValues , ContactFormSchema } from "@/src/schemas/contact";
import ContactEmail from "@/src/features/contact/contact-email";


export async function sendContactEmail(props: ContactFormValues) {

  const result = ContactFormSchema.safeParse(props);
  if (!result.success) {
    return {
      success: false,
      message: "Invalid form data",
    };
  }

  const headersList = await headers();
  const forwardedFor = headersList.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0].trim() ?? (process.env.NODE_ENV === "development" ? "127.0.0.1" : undefined);
  if (!ip) {
    return {
      success: false,
      message: "Unable to identify visitor",
    };
  }

  const { captchaToken, ...data } = result.data;

  let turnstileResult;
  try {
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.TURNSTILE_SECRET_KEY,
          response: captchaToken,
          remoteip: ip,
        }),
      }
    );
    turnstileResult = await turnstileResponse.json();
  } catch (err) {
    console.error("Turnstile verification request failed:", err);
    return {
      success: false,
      message: "Unable to verify CAPTCHA. Please try again.",
    };
  }

  if (!turnstileResult.success) {
    return {
      success: false,
      message: "CAPTCHA verification failed",
    };
  }

  try {
    const { success, pending } = await ratelimit.limit(ip);
    after(() => pending);
    if (!success) {
      return {
        success: false,
        message: "Unable to process at this time",
      };
    }
  } catch (err) {
    console.error("Rate limit check failed:", err);
    return {
      success: false,
      message: "Unable to process at this time. Please try again.",
    };
  }

  const { error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: "mauricetoneyjr@gmail.com",
    subject: "New Contact",
    react: <ContactEmail {...data} />,
  });

  if (error) {
    console.error("Resend failed to send contact email:", error);
    return {
      success: false,
      message: "Failed to send email",
    };
  }

  return {
    success: true,
    message: "Email sent successfully",
  };
}


