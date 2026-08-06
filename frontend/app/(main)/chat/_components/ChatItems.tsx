import Image from "next/image";

function ChatItems() {
  return (
    <div className="flex gap-4 py-3">
      {/* image */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <Image
          src="https://i.pinimg.com/736x/93/5d/79/935d7906b9850bddeda88d22e9c00d46.jpg"
          alt="contact-profile"
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      {/* content section*/}
      <div>
        <div className="flex gap-4">
          {/* name & time */}
          <div>
            <h4 className="font-semibold">John Doe</h4>
          </div>
          <div>
            <p className="text-xs font-light text-brand-neutral-600">12.55</p>
          </div>
        </div>
        {/* message  */}
        <div>
          <p className="text-sm text-brand-neutral-600">Hey there!</p>
        </div>
      </div>
    </div>
  );
}

export default ChatItems;
