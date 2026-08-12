import { Html, Body, Heading, Text, } from "react-email";
import { ContactEmailValues } from "@/src/schemas/contact";

type ContactNotificationProps = ContactEmailValues;

export default function ContactEmail(props: ContactNotificationProps ) {
  return (
    <Html>
      <Body>
        <Heading>
          {props.name} {props.company ? ` from ${props.company}` : ""}
        </Heading>

        <Text>
          From: {props.name}
        </Text>

        <Text>
          Email: {props.email}
          {props.phone_number ? ` ${props.phone_number}`: "" }
        </Text>

        <Text>
          {props.message}
        </Text>
      </Body>
    </Html>
  );
}