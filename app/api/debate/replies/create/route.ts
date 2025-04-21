import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request) {
  const { arg, debRoom } = await req.clone().json();

  const session = await getServerSession(authOptions);

  if (session?.user) {
    if (session.user.id === null) {
      return NextResponse.json("you are invalid");
    }
    const createDebate = await prisma.replyToDebate.create({
      data: {
        creator: { connect: { id: session.user.id } },
        room: { connect: { id: debRoom } },
        text: arg,
        challenger: "",
      },
    });
    return NextResponse.json("success");
  } else {
    return NextResponse.json("nope");
  }
}
