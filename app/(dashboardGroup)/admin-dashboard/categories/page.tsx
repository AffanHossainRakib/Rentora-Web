import { getCategories } from "@/app/(publicGroup)/_actions/propertyActions";
import { CreateCategoryForm } from "./_components/CreateCategoryForm";

export default async function AdminCategoriesPage() {
  const result = await getCategories();
  const categories = result.success ? result.data.categories : [];

  return (
    <div className="max-w-xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Categories</h1>
        <p className="text-muted-foreground">Property categories available across Rentora.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <span key={category} className="rounded-full border px-3 py-1.5 text-sm font-medium">
            {category}
          </span>
        ))}
      </div>

      <CreateCategoryForm />
    </div>
  );
}
