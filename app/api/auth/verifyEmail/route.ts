import prisma from "@/prisma/client";
import fs from "node:fs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { code, id } = await req.clone().json();
  const trueCode = fs.readFileSync(
    "C:/apps/debate-app/app/api/auth/signup/code.txt"
  );
  console.log(code, id);
  if (code == trueCode) {
    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        emailVerified: true,
      },
    });

    fs.writeFileSync("C:/apps/debate-app/app/api/auth/signup/code.txt", "");

    return NextResponse.json({
      mssg: "success!",
      status: updateUser.emailVerified,
    });
  } else {
    console.log("error!");
    return NextResponse.json(null, {
      status: 409,
      statusText: "Wrong code!",
    });
  }
}
