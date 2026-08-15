"use client";

import Image from "next/image";
import { ContactChatHistory } from "../types/contact-chat-history-type";
import { formatRelativeTime } from "../utils/format-relative-time-util";
import NoProfileImage from "./NoProfileImage";
import { formatLastMessagePreview } from "../utils/format-last-message-preview-util";
import { useChatStore } from "@/shared/store/chat-store/ChatStoreProvider";

interface ContactItemsProps {
  person: ContactChatHistory;
}

function ContactItems({ person }: ContactItemsProps) {
  const setActiveContactId = useChatStore((store) => store.setContactId);
  const formatedLastMessagePreview = formatLastMessagePreview(person.content);

  return (
    <div
      onClick={() => setActiveContactId(person.contactId)}
      className="flex w-full gap-3 items-center py-4 px-3 hover:bg-olive-200 hover:cursor-pointer transition-all duration-300 hover:rounded-sm"
    >
      {/* profile */}

      {person.avatar ? (
        <div className="relative w-12 h-10 rounded-full overflow-hidden">
          <Image
            src={
              person.avatar ||
              "https://i.pinimg.com/736x/93/5d/79/935d7906b9850bddeda88d22e9c00d46.jpg"
            }
            alt="contact-profile"
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      ) : (
        <NoProfileImage
          lastName={person.lastName}
          firstName={person.firstName}
        />
      )}
      {/* name, chat preview, time */}
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1">
          <div>
            <h3 className="font-semibold text-sm text-neutral-600">
              {person.firstName} {person.lastName}
            </h3>
          </div>
          <div>
            <p className="text-xs text-neutral-500">
              {formatedLastMessagePreview}
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-neutral-500">
            {formatRelativeTime(person.createdAt)}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactItems;
