import Image from "next/image";

function ChatHeader() {
  return (
    <div className="flex gap-4 w-full items-center">
      {/* profile */}
      <div className="relative w-8 h-8 rounded-full overflow-hidden">
        <Image
          src="https://i.pinimg.com/736x/93/5d/79/935d7906b9850bddeda88d22e9c00d46.jpg"
          alt="contact-profile"
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      {/* name */}
      <div>
        <p className="font-semibold text-md text-neutral-100"> John Doe</p>
      </div>
    </div>
  );
}

export default ChatHeader;
