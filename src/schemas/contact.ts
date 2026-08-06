import { z } from "zod";

export const ContactSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(1, "Message is required").max(500, "Message must be less than 500 characters"),
    phone_number: z.string().max(20, "Phone number must be less than 20 characters").optional(),
    company: z.string().max(100, "Company must be less than 100 characters").optional(),
});

export type ContactFormValues = z.infer<typeof ContactSchema>;