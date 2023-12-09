import { NextResponse } from "next/server";
import { PrismaClient, Prisma } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: Request, res: Response) {
  const createUser = await prisma.user.create({
    data: { email: "g.com", passwordHash: "asas" },
  });
  return NextResponse.json("Hello");
}
