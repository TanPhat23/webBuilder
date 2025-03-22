import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { createUser, deleteUser, updateuser } from "@/lib/users";
import { Users } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const SIGNING_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env"
    );
  }

  const wh = new Webhook(SIGNING_SECRET);

  const headerPayload = await headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new NextResponse("Error: Missing Svix headers", {
      status: 400,
    });
  }

  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new NextResponse("Error: Verification error", {
      status: 400,
    });
  }

  const eventType = evt.type;
  if (eventType === "user.created") {
    const { id, email_addresses, last_name, first_name, image_url } = evt.data;

    if (!id || !email_addresses) {
      return new NextResponse("Error occurred -- missing data", {
        status: 400,
      });
    }

    const user = {
      Id: id,
      Email: email_addresses[0].email_address,
      ...(first_name ? { FirstName: first_name } : {}),
      ...(last_name ? { LastName: last_name } : {}),
      ...(image_url ? { ImageUrl: image_url } : {}),
      CreatedAt: new Date(),
      UpdatedAt: new Date(),
    };

    const error = await createUser(user as Users);
    if (error){
      return new NextResponse("Error occurred -- creating user", {
        status: 400,
      });
    }
  } else if (eventType === "user.deleted") {
    const { id } = evt.data;

    if (!id) {
      return new NextResponse("Error occurred -- missing data", {
        status: 400,
      });
    }
    console.log("Deleting user with ID: ", id);
    await deleteUser(id);
  } else if (eventType === "user.updated") {
    const { id, email_addresses, last_name, first_name, image_url } = evt.data;

    if (!id || !email_addresses) {
      return new NextResponse("Error occurred -- missing data", {
        status: 400,
      });
    }

    const user = {
      Id: id,
      Email: email_addresses[0].email_address,
      ...(first_name ? { FirstName: first_name } : {}),
      ...(last_name ? { LastName: last_name } : {}),
      ...(image_url ? { ImageUrl: image_url } : {}),
      UpdatedAt: new Date(),
    };

    await updateuser(id, user as Partial<Users>);
  }
  return new NextResponse("Webhook received", { status: 200 });
}
