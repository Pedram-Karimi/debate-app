"use server";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function updateUser(userChange: {
  id?: string;
  email?: string;
  username?: string;
  image?: string;
  handle?: string;
  createdAt?: Date;
  emailVerified?: boolean;
}) {
  "use server";
  const session = await getServerSession(authOptions);

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: session?.user.id,
      },
      data: userChange,
    });
    if (updateUser) {
      revalidatePath(`/profile/${session?.user.id}`);
      return "user updated";
    }
  } catch (err) {
    if (err) {
      return err;
    }
  }
}
