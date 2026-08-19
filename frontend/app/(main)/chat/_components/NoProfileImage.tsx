import { getInitials } from "../utils/get-initials";

interface NoProfileImageProps {
  firstName: string;
  lastName: string;
}

export default function NoProfileImage({
  firstName,
  lastName,
}: NoProfileImageProps) {
  const initials = getInitials(firstName, lastName);
  return (
    <div className="bg-olive-700 w-8 h-8 rounded-full flex items-center justify-center">
      <p className="text-stone-200 text-xs">{initials}</p>
    </div>
  );
}
