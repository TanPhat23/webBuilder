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
import { Create } from "@/app/data/project/projectDAL";
import { appProjectTypes } from "@/lib/type";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().nonempty(),
  description: z.string(),
});

const CreatePojectDialog = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response: appProjectTypes = await Create(values);
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
