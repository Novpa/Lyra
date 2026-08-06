import ContactItems from "./ContactItems";

function ContactList() {
  return (
    <div className="divide-y divide-brand-neutral-100">
      {Array.from({ length: 5 }).map((_, i) => {
        return <ContactItems key={i} />;
      })}
    </div>
  );
}

export default ContactList;
