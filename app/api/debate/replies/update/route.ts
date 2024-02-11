import prisma from "@/prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { id, status } = await req.clone().json();
  const reply = await prisma.argsInDebRoom.update({
    where: { id: id },
    data: {
      readyStatus: {
        set: status,
      },
    },
  });
  return NextResponse.json(reply);
}
