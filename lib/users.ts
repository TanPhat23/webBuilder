import { Users } from "@prisma/client";
import prisma from "./prisma";

async function createUser(
  data: Users
): Promise<{ user?: Users; error?: Error | unknown }> {
  try {
    const user = await prisma.users.create({ data });
    return { user };
  } catch (error) {
    return { error };
  }
}

async function updateuser(Id: string, data: Partial<Users>) : Promise<{ user?: Users; error?: Error | unknown }> {
  try {
    const user = await prisma.users.update({ where: { Id }, data });
    return { user };
  } catch (error) {
    return { error };
  }
}

async function deleteUser(
  Id: string
): Promise<{ user?: Users; error?: Error | unknown }> {
  try {
    const user = await prisma.users.delete({ where: { Id } });
    return { user };
  } catch (error) {
    return { error };
  }
}
export { createUser, updateuser, deleteUser };
