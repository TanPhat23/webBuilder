"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "../../ui/button";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Create } from "@/actions/project/action";
import { useRouter } from "next/navigation";
import { appProject } from "@/lib/interface";

const formSchema = z.object({
  name: z.string().nonempty(),
  description: z.string(),
  styles: z
    .object({
      backgroundColor: z.string().default("#ffffff"),
      width: z.string().default("100%"),
      height: z.string().default("100%"),
      gridEnabled: z.boolean().default(false),
      gridSize: z.number().default(8),
      snapToGrid: z.boolean().default(false),
      overflow: z.string().default("auto"),
      borderRadius: z.string().default("0px"),
      border: z.string().default("none"),
      boxShadow: z.string().default("none"),
      backgroundImage: z.string().default(""),
      backgroundSize: z.string().default("cover"),
      backgroundPosition: z.string().default("center"),
      backgroundRepeat: z.string().default("no-repeat"),
    })
    .default({}),
  subdomain: z.string().optional(),
  published: z.boolean().optional(),
});

const CreatePojectDialog = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      styles: {
        backgroundColor: "#ffffff",
        width: "100%",
        height: "100%",
        gridEnabled: false,
        gridSize: 8,
        snapToGrid: false,
        overflow: "auto",
        borderRadius: "0px",
        border: "none",
        boxShadow: "none",
        backgroundImage: "",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      },
      subdomain: "",
      published: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response: appProject = await Create(values);
    router.push(`/editor/${response.id}`);
  }
  return (
    <Dialog>
      <DialogTrigger className="flex w-full items-center gap-2 rounded-md bg-sidebar-primary px-3 py-2 text-sidebar-primary-foreground hover:bg-sidebar-primary/90 transition-colors focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-ring">
        Create Project
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a project</DialogTitle>
          <DialogDescription>
            Enter project name and description to create a project
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Project&apos;s name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project's name" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your project&apos;s name
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Project's description" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is your project&apos;s description
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Confirm</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePojectDialog;
