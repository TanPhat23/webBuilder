import { GetAll } from "@/actions/element/action";
import EditorPageClient from "./EditorPageClient";
import { GetProjectById } from "@/actions/project/action";

// export const dynamic = "force-dynamic";

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
