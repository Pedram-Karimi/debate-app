import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { signIn } from "next-auth/react";

export async function POST(req: Request) {
  const { email, password, username } = await req.clone().json();

  const user = await prisma.user.create({
    data: {
      email: email as string,
      password: password as string,
      username: username as string,
      image: "",
    },
  });
  return NextResponse.json(user);
}
