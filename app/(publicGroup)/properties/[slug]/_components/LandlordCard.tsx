import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IUser } from "@/lib/types";
import { getInitials, isValidImageUrl } from "@/lib/utils";
import { Mail, User } from "lucide-react";

export function LandlordCard({ landlord }: { landlord?: IUser }) {
  if (!landlord) {
    return (
      <div className="rounded-xl border p-4 text-sm text-muted-foreground">
        Landlord details are unavailable for this property.
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-xl border p-4">
      <Avatar className="size-12">
        {isValidImageUrl(landlord.profile?.profilePicture) && (
          <AvatarImage
            src={landlord.profile!.profilePicture!}
            alt={landlord.name}
          />
        )}
        <AvatarFallback className="bg-primary/10 text-primary">
          {getInitials(landlord.name)}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0">
        <p className="flex items-center gap-1.5 font-medium">
          <User className="size-3.5 shrink-0" />
          {landlord.name}
        </p>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Mail className="size-3.5 shrink-0" />
          <span className="truncate">{landlord.email}</span>
        </p>
      </div>
    </div>
  );
}
