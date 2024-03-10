"use server";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";

export async function updateUser(
  userId: string,
  userChange: {
    id?: string;
    email?: string;
    username?: string;
    image?: string;
    handle?: string;
    createdAt?: Date;
    emailVerified?: boolean;
  }
) {
  "use server";

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: userChange,
    });
    if (updateUser) {
      revalidatePath(`/profile/${userId}`);
      return "user updated";
    }
  } catch (err) {
    if (err) {
      return err;
    }
  }
}
