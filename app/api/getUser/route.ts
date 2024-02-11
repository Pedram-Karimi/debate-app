import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
export async function POST(req: Request, res: Response) {
  const { email } = await req.clone().json();
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  return NextResponse.json(user);
}
