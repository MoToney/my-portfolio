"use client"

import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { sendContactEmail } from "@/src/features/contact/actions/send-contact-email";
import { ContactEmailValues, ContactEmailSchema } from "@/src/schemas/contact";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/src/components/ui/field";
import { Textarea } from "@/src/components/ui/textarea";
import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

export default function ContactForm() {
    const turnstileRef = useRef<TurnstileInstance>(null);
    const [captchaToken, setCaptchaToken] = useState("");

    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ContactEmailValues>({
        resolver: zodResolver(ContactEmailSchema),
    });

    const onSubmit = async (data: ContactEmailValues) => {
        if (!captchaToken) {
            setError("root", {
                type: "captcha",
                message: "Please complete the CAPTCHA.",
            });
            toast.error("Please complete the CAPTCHA.");
            return;
        }

        const toastId = toast.loading("Sending your message...");

        try {
            const result = await sendContactEmail({
                ...data,
                captchaToken,
            });

            turnstileRef.current?.reset();
            setCaptchaToken("");

            if (!result.success) {
                setError("root", { type: "server", message: result.message });
                toast.error(result.message || "Failed to send message.", { id: toastId });
                return;
            }

            toast.success("Message sent! I'll get back to you soon.", { id: toastId });
            reset();
        } catch {
            turnstileRef.current?.reset();
            setCaptchaToken("");
            const message = "Something went wrong. Please try again.";
            setError("root", { type: "server", message });
            toast.error(message, { id: toastId });
        }
    };

    return (
        <section id="contact">
            <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
            <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex gap-6">
                    <FieldGroup className="flex-1 space-y-4">
                        <Field>
                            <FieldLabel htmlFor="name">Name *</FieldLabel>
                            <Input className="border-gray-300" id="name" type="text" placeholder="Your Name" {...register("name")} />
                            <FieldError errors={[errors.name]} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email *</FieldLabel>
                            <Input className="border-gray-300" id="email" type="email" placeholder="Your Email" {...register("email")} />
                            <FieldError errors={[errors.email]} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
                            <Input className="border-gray-300" id="phone_number" type="text" placeholder="Your Phone Number" {...register("phone_number")} />
                            <FieldError errors={[errors.phone_number]} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="company">Company</FieldLabel>
                            <Input className="border-gray-300" id="company" type="text" placeholder="Your Company" {...register("company")} />
                            <FieldError errors={[errors.company]} />
                        </Field>
                    </FieldGroup>

                    <FieldGroup className="flex-1">
                        <Field className="h-full">
                            <FieldLabel htmlFor="message">Message *</FieldLabel>
                            <FieldDescription>Enter your message below.</FieldDescription>
                            <Textarea className="h-full min-h-48 border-gray-300" id="textarea-message" placeholder="Type your message here." {...register("message")} />
                            <FieldError errors={[errors.message]} />
                        </Field>
                    </FieldGroup>
                </div>

                {errors.root && <p className="text-red-500">{errors.root.message}</p>}

                {Object.entries(errors).some(([key]) => !["name", "email", "phone_number", "company", "message", "root"].includes(key)) && (
                    <p className="text-red-500 text-sm">Something's wrong with the submission — please try again.</p>
                )}

                <Turnstile
                    ref={turnstileRef}
                    siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                    onSuccess={(token) => {
                        setCaptchaToken(token);
                        clearErrors("root");
                    }}
                    onExpire={() => setCaptchaToken("")}
                    onError={() => setCaptchaToken("")}
                />

                <Button size="lg" type="submit" disabled={isSubmitting || !captchaToken}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
            </form>
        </section>
    );
}