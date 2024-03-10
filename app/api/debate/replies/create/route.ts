import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { arg, creatorEmail, debRoom } = await req.clone().json();

  if (creatorEmail) {
    const argCreator = await prisma.user.findUnique({
      where: { email: creatorEmail },
    });
    if (argCreator === null) {
      return NextResponse.json("you are invalid");
    }
    const createDebate = await prisma.replyToDebate.create({
      data: {
        creator: { connect: { id: argCreator.id } },
        room: { connect: { id: debRoom } },
        text: arg,
      },
    });
    return NextResponse.json("success");
  } else {
    return NextResponse.json("nope");
  }
}
