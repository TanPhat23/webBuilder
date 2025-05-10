import { GetProjectById } from "@/actions/project/action";
import DefaultSettingsPageClient from "./DefaultSettingsPageClient";
import DefaultSettingsSideBar from "@/components/defaultsettings/DefaultSettingsSideBar";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await GetProjectById(slug);
  return (
    <>
      <DefaultSettingsPageClient project={project} />
      <DefaultSettingsSideBar/>
    </>
  );
}
