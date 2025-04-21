"use server";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function uploadImage(userImage: any) {
  "use server";
  const session = await getServerSession(authOptions);
  try {
    await fetch(
      `https://api.imgbb.com/1/upload?expiration=600&key=${process.env.IMGBB_API_KEY}`,
      {
        method: "POST",
        body: userImage,
      }
    )
      .then((response) => response.json())
      .then(async (data) => {
        await prisma.user.update({
          where: {
            id: session?.user.id,
          },
          data: { image: data.data.url },
        });
      });
    revalidatePath(`/profile/${session?.user.id}`);
    return "image updated";
  } catch (err) {
    if (err) {
      return err;
    }
  }
}
