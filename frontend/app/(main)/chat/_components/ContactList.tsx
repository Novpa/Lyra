import { ContactChatHistory } from "../types/contact-chat-history-type";
import ContactItems from "./ContactItems";

interface ContactListProps {
  contacts: ContactChatHistory;
}

function ContactList({ contacts }: ContactListProps) {
  return (
    <div className="divide-y divide-neutral-200">
      {contacts?.map((person, i: number) => {
        return <ContactItems person={person} key={i} />;
      })}
    </div>
  );
}

export default ContactList;
