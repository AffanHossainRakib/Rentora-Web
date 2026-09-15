import { IReview } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";
import { Star } from "lucide-react";

export function ReviewList({ reviews }: { reviews?: IReview[] }) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-sm text-muted-foreground">No reviews yet.</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="space-y-1 rounded-xl border p-4">
          <div className="flex items-center justify-between">
            <p className="font-medium">{review.user?.name ?? "Tenant"}</p>
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }, (_, index) => (
                <Star
                  key={index}
                  className={cn(
                    "size-4",
                    index < review.rating
                      ? "fill-primary text-primary"
                      : "text-muted-foreground",
                  )}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{review.review}</p>
          <p className="text-xs text-muted-foreground">
            {formatDate(review.createdAt)}
          </p>
        </div>
      ))}
    </div>
  );
}
