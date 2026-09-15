import { getCategories } from "@/app/(publicGroup)/_actions/propertyActions";
import { PropertyForm } from "../_components/PropertyForm";

export default async function NewPropertyPage() {
  const result = await getCategories();
  const categories = result.success ? result.data.categories : [];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Property</h1>
        <p className="text-muted-foreground">List a new property for rent.</p>
      </div>
      <PropertyForm categories={categories} />
    </div>
  );
}
