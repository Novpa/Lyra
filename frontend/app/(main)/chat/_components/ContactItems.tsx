import Image from "next/image";

function ContactItems() {
  return (
    <div className="flex w-full gap-3 items-center py-4 px-3 hover:bg-brand-olive-200 hover:cursor-pointer transition-all duration-300 hover:rounded-sm">
      {/* profile */}
      <div className="relative w-12 h-10 rounded-full overflow-hidden">
        <Image
          src="https://i.pinimg.com/736x/93/5d/79/935d7906b9850bddeda88d22e9c00d46.jpg"
          alt="contact-profile"
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>

      {/* name, chat preview, time */}
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1">
          <div>
            <h3 className="font-semibold text-sm text-brand-neutral-600">
              John Doe
            </h3>
          </div>
          <div>
            <p className="text-xs text-brand-neutral-500">
              This my message preview ...
            </p>
          </div>
        </div>

        <div>
          <p className="text-xs text-brand-neutral-500">12:30</p>
        </div>
      </div>
    </div>
  );
}

export default ContactItems;
