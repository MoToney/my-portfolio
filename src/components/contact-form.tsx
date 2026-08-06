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
        <form onSubmit={handleSubmit(onSubmit)}>
            <FieldSet className="w-full max-w-md mx-auto">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Name *</FieldLabel>
                        <Input
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
                            id="company"
                            type="text"
                            placeholder="Your Company"
                            {...register("company")}
                        />
                        <FieldError errors={[errors.company]} />
                    </Field>  

                    <Field>
                        <FieldLabel htmlFor="message">Message *</FieldLabel>
                        <FieldDescription>Enter your message below.</FieldDescription>
                        <Textarea
                            id="textarea-message"
                            placeholder="Type your message here."
                            {...register("message")}
                        />                        
                        <FieldError errors={[errors.message]} />
                    </Field>
                </FieldGroup>
                {errors.root && <p className="text-red-500">{errors.root.message}</p>}

                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
            </FieldSet>
        </form>
    );
            
            



    
    

}