import { GetAll } from "@/app/data/element/elementDAL";
import EditorPageClient from "./EditorPageClient";
import { EditorElement } from "@/lib/type";

// export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  let elements: EditorElement[] = [];
  try {
      const result = await GetAll(
        `${process.env.NEXT_PUBLIC_API_URL}/elements/public/${slug}`
      );
      elements = Array.isArray(result) ? result : [];
    } catch (error) {
      console.error("Error fetching elements:", error);
    }

  return <EditorPageClient slug={slug} initialElements={elements} />;
}
