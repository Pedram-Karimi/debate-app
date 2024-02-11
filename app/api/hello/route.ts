import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request, res: Response) {
  const createUser = await prisma.user.create({
    data: {
      email: "brah.com",
      image: "profile?.image as string",
      username: "profile?.name as string",
    },
  });
  return NextResponse.json(createUser);
}
