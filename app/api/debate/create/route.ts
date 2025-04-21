import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function POST(req: Request) {
  const { currCat, media, title, statement, description } = await req
    .clone()
    .json();

  const session = await getServerSession(authOptions);

  console.log(media);
  const catTypes = ["Art/Entertainment", "Politics", "Philosophy"];
  if (session?.user) {
    const debateCreator = await prisma.user.findUnique({
      where: { id: session?.user.id },
    });
    if (debateCreator === null) {
      return NextResponse.json("you are invalid");
    }
    if (media.split(";").length > 3) {
      return NextResponse.json("You can't add more than 3 media links");
    }
    const createDebate = await prisma.debateRoom.create({
      data: {
        title,
        description,
        currCat: catTypes[currCat],
        statement,
        media,
        creator: { connect: { id: debateCreator.id } },
      },
    });
    return NextResponse.json("success");
  } else {
    return NextResponse.json("nope");
  }
}
