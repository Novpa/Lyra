"use client";

import { useChatStore } from "@/shared/store/chat-store/ChatStoreProvider";
import Image from "next/image";
import NoProfileImage from "./NoProfileImage";

function ChatHeader() {
  const { activeFirstName, activeLastName, activeAvatar, activeContactId } =
    useChatStore((store) => store);

  if (!activeContactId) return null;

  return (
    <section className="absolute top-0 left-0 right-0 px-4 py-4 bg-olive-500 border-olive-300 z-1">
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
          <NoProfileImage
            lastName={activeLastName}
            firstName={activeFirstName}
          />
        )}

        {/* name */}
        <div>
          <p className="font-semibold text-md text-neutral-100">
            {activeFirstName} {activeLastName}
          </p>
        </div>
      </div>
    </section>
  );
}

export default ChatHeader;
