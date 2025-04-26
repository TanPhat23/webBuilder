import { GetAll } from "@/app/data/element/elementDAL";
import EditorPageClient from "./EditorPageClient";

export const dynamic = "force-dynamic";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const elements = await GetAll(
    `${process.env.NEXT_PUBLIC_API_URL}/elements/${slug}`
  );

  return <EditorPageClient slug={slug} initialElements={elements} />;
}
