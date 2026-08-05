// src/components/CustomNotificationToast.tsx
import Image from "next/image";
import { toast } from "sonner";

interface NotificationProps {
  avatar: string;
  firstName: string;
  lastName: string;
  content: string;
}

export const showSocialToast = ({
  avatar,
  firstName,
  lastName,
  content,
}: NotificationProps) => {
  toast.custom((t) => (
    <div className="flex items-start gap-3 w-full max-w-3xl rounded-xl bg-background p-4 shadow-lg border border-brand-neutral-200 text-foreground">
      {/* Avatar Image / Fallback */}
      <Image
        width={10}
        height={10}
        src={avatar || "https://github.com/shadcn.png"} // fixme (default avatar)
        alt={`${firstName} ${lastName}`}
        className="h-10 w-10 rounded-full object-cover border border-brand-olive-500 shrink-0"
      />

      {/* Content Container */}
      <div className="flex flex-col grow">
        <div className="flex items-center justify-between gap-4">
          <span className="font-semibold text-sm text-foreground">
            {firstName} {lastName}
          </span>
          {/* close button */}
          <button
            onClick={() => toast.dismiss(t)}
            className="text-xs text-brand-neutral-400 hover:text-foreground hover:cursor-pointer">
            Dismiss
          </button>
        </div>

        {/* Message */}
        <p className="text-xs text-brand-neutral-600 mt-1 line-clamp-2">
          {content?.length > 3 ? `${content.slice(0, 30)} ...` : content}
        </p>
      </div>
    </div>
  ));
};
