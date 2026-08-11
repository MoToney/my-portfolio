"use client"

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { sendContactEmail } from "@/src/features/contact/actions/send-contact-email";
import { ContactFormValues, ContactSchema } from "@/src/schemas/contact";
import { Input } from "@/src/components/ui/input";
import { Button } from "@/src/components/ui/button";
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel, FieldSet } from "@/src/components/ui/field";
import { Textarea } from "@/src/components/ui/textarea";




export default function ContactForm() {
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<ContactFormValues>({ resolver: zodResolver(ContactSchema), });

    const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
        const result = await sendContactEmail(data);
        if (!result.success) {
            setError("root", {
                type: "server",
                message: result.message
            });
            return;
        }
        console.log("Email sent successfully");
    };

    return (
        <>
            <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
            <form
                className="space-y-6"
                onSubmit={handleSubmit(onSubmit)}
            >
                <div className="flex gap-6">
                    <FieldGroup className="flex-1 space-y-4">
                        <Field>
                            <FieldLabel htmlFor="name">Name *</FieldLabel>
                            <Input
                                className="border-gray-300"
                                id="name"
                                type="text"
                                placeholder="Your Name"
                                {...register("name")}
                            />
                            <FieldError errors={[errors.name]} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="email">Email *</FieldLabel>
                            <Input
                                className="border-gray-300"
                                id="email"
                                type="email"
                                placeholder="Your Email"
                                {...register("email")}
                            />
                            <FieldError errors={[errors.email]} />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="phone_number">Phone Number</FieldLabel>
                            <Input
                                className="border-gray-300"
                                id="phone_number"
                                type="text"
                                placeholder="Your Phone Number"
                                {...register("phone_number")}
                            />
                            <FieldError errors={[errors.phone_number]} />
                        </Field>

                        <Field>
                            <FieldLabel htmlFor="company">Company</FieldLabel>
                            <Input
                                className="border-gray-300"
                                id="company"
                                type="text"
                                placeholder="Your Company"
                                {...register("company")}
                            />
                            <FieldError errors={[errors.company]} />
                        </Field>
                    </FieldGroup>

                    <FieldGroup className="flex-1">
                        <Field className="h-full">
                            <FieldLabel htmlFor="message">Message *</FieldLabel>
                            <FieldDescription>Enter your message below.</FieldDescription>
                            <Textarea
                                className="h-full min-h-48 border-gray-300"
                                id="textarea-message"
                                placeholder="Type your message here."
                                {...register("message")}
                            />
                            <FieldError errors={[errors.message]} />
                        </Field>
                    </FieldGroup>
                </div>

                {errors.root && <p className="text-red-500">{errors.root.message}</p>}


                <Button size="lg" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                </Button>


            </form>
        </>
    );

}