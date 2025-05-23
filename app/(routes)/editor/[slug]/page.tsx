import { GetAll } from "@/app/actions/elements";
import EditorPageClient from "./EditorPageClient";
import { appProject } from "@/lib/interface";
import { GetProjectById } from "@/app/actions/projects";

export const revalidate = 3600;

export const dynamicParams = true;
export async function generateStaticParams() {
  try {
    const projects = await fetch("http://localhost:3000/api/projects").then(
      (res) => res.json()
    );

    return projects.map((project: appProject) => ({
      slug: String(project.id),
    }));
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
  const [elements, project] = await Promise.all([
    GetAll(`${process.env.NEXT_PUBLIC_API_URL}/elements/${slug}`),
    GetProjectById(slug),
  ]);

  return (
    <EditorPageClient
      slug={slug}
      initialElements={elements}
      project={project}
    />
  );
}
