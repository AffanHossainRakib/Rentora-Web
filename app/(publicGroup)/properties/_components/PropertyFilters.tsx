"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const AMENITY_OPTIONS = [
  "WiFi",
  "Parking",
  "Furnished",
  "Generator",
  "Lift",
  "Garden",
  "AC",
  "Security",
];

export function PropertyFilters({ categories }: { categories: string[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") ?? "",
  );
  const [location, setLocation] = useState(searchParams.get("location") ?? "");
  const [priceMin, setPriceMin] = useState(searchParams.get("priceMin") ?? "");
  const [priceMax, setPriceMax] = useState(searchParams.get("priceMax") ?? "");
  const category = searchParams.get("category") ?? "all";
  const isAvailable = searchParams.get("isAvailable") ?? "all";
  const selectedAmenities = new Set(
    (searchParams.get("amenities") ?? "").split(",").filter(Boolean),
  );

  const applyParams = (updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });

    params.delete("page");
    startTransition(() => {
      router.push(`/properties?${params.toString()}`);
    });
  };

  const toggleAmenity = (amenity: string) => {
    const next = new Set(selectedAmenities);
    if (next.has(amenity)) next.delete(amenity);
    else next.add(amenity);
    applyParams({ amenities: next.size ? Array.from(next).join(",") : null });
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    applyParams({
      searchTerm: searchTerm || null,
      location: location || null,
      priceMin: priceMin || null,
      priceMax: priceMax || null,
    });
  };

  const clearAll = () => {
    setSearchTerm("");
    setLocation("");
    setPriceMin("");
    setPriceMax("");
    startTransition(() => {
      router.push("/properties");
    });
  };

  return (
    <div
      className="space-y-4 rounded-xl border p-4"
      aria-busy={isPending}
    >
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        inert={isPending || undefined}
      >
        <div className="space-y-1.5">
          <Label htmlFor="searchTerm">Search</Label>
          <Input
            id="searchTerm"
            placeholder="Title or description"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            placeholder="e.g. Dhaka"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="priceMin">Min price</Label>
          <Input
            id="priceMin"
            type="number"
            min={0}
            value={priceMin}
            onChange={(event) => setPriceMin(event.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="priceMax">Max price</Label>
          <Input
            id="priceMax"
            type="number"
            min={0}
            value={priceMax}
            onChange={(event) => setPriceMax(event.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <Label>Category</Label>
          <Select
            value={category}
            onValueChange={(value) =>
              applyParams({ category: value === "all" ? null : value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1.5">
          <Label>Availability</Label>
          <Select
            value={isAvailable}
            onValueChange={(value) =>
              applyParams({ isAvailable: value === "all" ? null : value })
            }
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="true">Available now</SelectItem>
              <SelectItem value="false">Not available</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-end gap-2 sm:col-span-2 lg:col-span-2">
          <Button type="submit" disabled={isPending}>
            {isPending && <Loader2 className="animate-spin" />}
            Apply filters
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={clearAll}
            disabled={isPending}
          >
            Clear
          </Button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2" aria-busy={isPending} inert={isPending || undefined}>
        {AMENITY_OPTIONS.map((amenity) => (
          <Button
            key={amenity}
            type="button"
            size="sm"
            variant={selectedAmenities.has(amenity) ? "default" : "outline"}
            onClick={() => toggleAmenity(amenity)}
          >
            {amenity}
          </Button>
        ))}
      </div>
    </div>
  );
}
