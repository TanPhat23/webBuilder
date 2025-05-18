import { GetAll } from "@/app/actions/element/action";
import EditorPageClient from "./EditorPageClient";
import { GetProjectById } from "@/app/actions/project/action";

export const revalidate = 10;

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    return [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const elements = await GetAll(
    `${process.env.NEXT_PUBLIC_API_URL}/elements/${slug}`
  );

  const project = await GetProjectById(slug);

  return (
    <EditorPageClient
      slug={slug}
      initialElements={elements}
      project={project}
    />
  );
}
