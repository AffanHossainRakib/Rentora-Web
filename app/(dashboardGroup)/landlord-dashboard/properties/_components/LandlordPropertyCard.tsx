"use client";

import { PropertyImage } from "@/components/shared/property-image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { IProperty } from "@/lib/types";
import { formatCurrency } from "@/lib/utils";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import Link from "next/link";
import { useTransition } from "react";
import { toast } from "sonner";
import { deleteProperty } from "../_actions/propertyFormActions";

export function LandlordPropertyCard({ property }: { property: IProperty }) {
  const [isDeleting, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteProperty(property.id);
      if (result.success) {
        toast.success("Property deleted");
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border">
      <div className="relative aspect-4/3 w-full">
        <PropertyImage src={property.pictures[0]} alt={property.title} />
        <Badge
          variant={property.isAvailable ? "default" : "secondary"}
          className="absolute left-2 top-2"
        >
          {property.isAvailable ? "Available" : "Not available"}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-1 font-semibold">{property.title}</h3>
        <p className="line-clamp-1 text-sm text-muted-foreground">
          {property.location}
        </p>
        <p className="font-semibold text-primary">
          {formatCurrency(property.price)}
          <span className="text-sm font-normal text-muted-foreground">
            {" "}
            /month
          </span>
        </p>

        <div className="mt-auto flex gap-2 pt-2">
          <Button asChild size="sm" variant="outline" className="flex-1">
            <Link href={`/landlord-dashboard/properties/${property.id}/edit`}>
              <Pencil />
              Edit
            </Link>
          </Button>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button size="sm" variant="outline" disabled={isDeleting}>
                {isDeleting ? <Loader2 className="animate-spin" /> : <Trash2 />}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Delete this property?</AlertDialogTitle>
                <AlertDialogDescription>
                  This can&apos;t be undone. Properties with a pending, approved
                  or active rental request can&apos;t be deleted.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={handleDelete}>
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}
