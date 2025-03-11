import { Delete, GetAll } from "@/app/api/project/route";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { appProjectTypes } from "@/lib/type";
import React, { useMemo, useCallback } from "react";
import { toast } from "react-toastify";
import useSWR from "swr";

type Props = {};

const DeleteProjectDialog = (props: Props) => {
  const [selectedProject, setSelectedProject] = React.useState<string>("");
  const { data: projects } = useSWR<appProjectTypes[]>(
    `${process.env.NEXT_PUBLIC_API_URL}/projects`,
    GetAll
  );

  const handleDelete = useCallback(async () => {
    const id = projects?.find(
      (project) => project.name === selectedProject
    )?.id;
    if (id) {
      try {
        await Delete(id);
        toast.success("Project deleted successfully");
        setSelectedProject("");
      } catch (error) {
        toast.error("Failed to delete project");
      }
    }
  }, [projects, selectedProject]);

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          <select
            value={selectedProject}
            className="w-full p-2 mt-2 border border-gray-300 rounded-lg bg-background"
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Choose a project</option>
            {projects?.map((project) => (
              <option key={project.id} value={project.name}>
                {project.name}
              </option>
            ))}
          </select>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          onClick={handleDelete}
          disabled={!selectedProject}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Delete
        </Button>
      </DialogFooter>
    </DialogContent>
  );
};

export default DeleteProjectDialog;
