import { Html, Body, Heading, Text, } from "react-email";
import { ContactFormValues } from "@/src/schemas/contact";

type ContactNotificationProps = ContactFormValues

export default function ContactNotification(props: ContactNotificationProps ) {
  return (
    <Html>
      <Body>
        <Heading>
          New Portfolio Contact {props.company ? `from ${props.company}` : ""}
        </Heading>

        <Text>
          From: {props.name}
        </Text>

        <Text>
          Email: {props.email}
        </Text>

        <Text>
          {props.message}
        </Text>
      </Body>
    </Html>
  );
}