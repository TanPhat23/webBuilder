import { GetAll } from "@/app/data/element/elementDAL";
import EditorPageClient from "./EditorPageClient";
import { EditorElement } from "@/lib/type";

export default async function Page({ params }: { params: { slug: string } }) {
  const elements = await GetAll(
    `${process.env.NEXT_PUBLIC_API_URL}/elements/${params.slug}`
  );

  return <EditorPageClient slug={params.slug} initialElements={elements} />;
}
