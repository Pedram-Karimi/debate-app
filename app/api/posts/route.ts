import { NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(req: Request, res: Response) {
  await prisma.user.create({
    data: {
      email: "pedram",
      passwordHash: "shos",
    },
  });
  return NextResponse.json("bdood");
}
