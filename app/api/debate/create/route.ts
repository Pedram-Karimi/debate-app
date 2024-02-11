import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { title, description, creatorEmail } = await req.clone().json();

  if (creatorEmail) {
    const debateCreator = await prisma.user.findUnique({
      where: { email: creatorEmail },
    });
    if (debateCreator === null) {
      return NextResponse.json("you are invalid");
    }
    const createDebate = await prisma.debateRoom.create({
      data: {
        title,
        description,
        creator: { connect: { id: debateCreator.id } },
      },
    });
    return NextResponse.json("success");
  }
}
