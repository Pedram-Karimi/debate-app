"use server";
import prisma from "@/prisma/client";
import { revalidatePath } from "next/cache";
export async function uploadImage(userId: string, userImage: any) {
  "use server";
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
            id: userId,
          },
          data: { image: data.data.url },
        });
      });
    revalidatePath(`/profile/${userId}`);
    return "image updated";
  } catch (err) {
    if (err) {
      return err;
    }
  }
}
