"use server";

import { resend } from "@/src/lib/resend";
import {  ContactFormValues, ContactSchema } from "@/src/schemas/contact";
import ContactNotification from "@/src/features/contact/contact-notification";


export async function sendContactEmail(props: ContactFormValues) {
    
      const parsed = ContactSchema.safeParse(props);

      if (!parsed.success) {
        return {
          success: false,
          message: "Invalid form data",
        };
      }

      const data = parsed.data;

      const { error } = await resend.emails.send({
        from: "Portfolio <onboarding@resend.dev>",
        to: "mauricetoneyjr@gmail.com",
        subject: "New Contact",
        react: <ContactNotification {...data} />,
      });
      
      if (error) {
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


