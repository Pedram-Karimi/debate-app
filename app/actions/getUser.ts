"use server";
import prisma from "@/prisma/client";
import { User } from "@/types/globals";
export async function getUser(id: string) {
  "use server";

  const user = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  if (user) {
    return {
      id: user.id,
      handle: user.handle,
      email: user.email,
      username: user.username,
      emailVerified: user.emailVerified,
      image: user.image,
      createdAt: user.createdAt,
    };
  } else {
    return null;
  }
}
