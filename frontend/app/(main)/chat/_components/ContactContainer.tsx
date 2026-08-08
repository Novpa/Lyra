import Link from "next/link";
import { MdOutlineArrowBack } from "react-icons/md";
import ContactSearchInput from "./ContactSearchInput";
import ContactList from "./ContactList";

function ContactContainer() {
  return (
    <section>
      {/* navigation & heading */}
      <div className="flex gap-4 items-center my-8">
        <div>
          <Link href="/">
            <MdOutlineArrowBack className="text-2xl text-olive-600" />
          </Link>
        </div>

        <div>
          <h1 className="text-2xl text-olive-600">Lyra Chats</h1>
        </div>
      </div>

      {/* search bar */}
      <div className="flex justify-center">
        <ContactSearchInput />
      </div>

      {/* contact list */}
      <div className="py-5">
        <ContactList />
      </div>
    </section>
  );
}

export default ContactContainer;
