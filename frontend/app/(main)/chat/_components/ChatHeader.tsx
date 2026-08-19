"use client";

import { useChatStore } from "@/shared/store/chat-store/ChatStoreProvider";
import Image from "next/image";
import NoProfileImage from "./NoProfileImage";

function ChatHeader() {
  const { activeFirstName, activeLastName, activeAvatar, activeContactId } =
    useChatStore((store) => store);

  if (!activeContactId) return null;

  return (
    <div className="flex gap-4 w-full items-center">
      {/* profile */}

      {activeAvatar ? (
        <div className="relative w-8 h-10 rounded-full overflow-hidden">
          <Image
            src={activeAvatar as string}
            alt="contact-profile"
            fill
            className="object-cover"
            sizes="48px"
          />
        </div>
      ) : (
        <NoProfileImage lastName={activeLastName} firstName={activeFirstName} />
      )}

      {/* name */}
      <div>
        <p className="font-semibold text-md text-neutral-100">
          {activeFirstName} {activeLastName}
        </p>
      </div>
    </div>
  );
}

export default ChatHeader;
