import {
  getCategories,
  getPropertyById,
} from "@/app/(publicGroup)/_actions/propertyActions";
import { getMe } from "@/service/getMe";
import { notFound } from "next/navigation";
import { PropertyForm } from "../../_components/PropertyForm";

type Props = { params: Promise<{ id: string }> };

export default async function EditPropertyPage({ params }: Props) {
  const { id } = await params;

  const [propertyResult, categoriesResult, user] = await Promise.all([
    getPropertyById(id),
    getCategories(),
    getMe(),
  ]);

  if (!propertyResult.success) notFound();
  if (propertyResult.data.userId !== user?.id) notFound();

  const categories = categoriesResult.success
    ? categoriesResult.data.categories
    : [];

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Edit Property</h1>
        <p className="text-muted-foreground">Update your listing details.</p>
      </div>
      <PropertyForm categories={categories} property={propertyResult.data} />
    </div>
  );
}
