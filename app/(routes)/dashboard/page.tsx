"use client";
import { GetAllProjects } from "@/app/actions/projects";
import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { appProject } from "@/lib/interface";
import { useRouter } from "next/navigation";
import useSWR from "swr";

export default function Page() {
  const router = useRouter();
  const {
    data: projects,
    error,
    isLoading,
  } = useSWR<appProject[]>(
    process.env.NEXT_PUBLIC_API_URL + "/projects",
    GetAllProjects
  );

  if (error) console.log(error);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
            <div className="aspect-video rounded-xl bg-muted/50" />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min ">
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <ul className="m-4 grid gap-4 grid-cols-6">
                {projects?.map((project) => (
                  <li
                    key={project.id}
                    className="rounded-lg shadow-md bg-foreground"
                  >
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-primary-foreground">
                        {project.name}
                      </h3>
                      <p className="text-sm">{project.description}</p>
                      <div className="flex gap-2 mt-4">
                        <Button
                          className="w-full border-primary-foreground border-2"
                          onClick={() => router.push(`/editor/${project.id}`)}
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
