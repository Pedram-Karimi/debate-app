import prisma from "@/prisma/client";
import { NextResponse } from "next/server";
import { google } from "googleapis";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import fs from "node:fs";

export async function POST(req: Request) {
  const { email, password, username, handle } = await req.clone().json();

  // check if user already exists

  const check = await prisma.user.findUnique({
    where: { email: email as string },
  });

  if (check) {
    return NextResponse.json(null, {
      status: 409,
      statusText: "email already in use",
    });
  }

  const user = await prisma.user.create({
    data: {
      email: email as string,
      handle: handle as string,
      password: password as string,
      username: username as string,
      image: "",
    },
  });

  const oAuth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
  );

  oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  async function sendEmail() {
    try {
      const accessToken = await oAuth2Client.getAccessToken();
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: "player7861001@gmail.com",
          clientId: process.env.CLIENT_ID as string,
          clientSecret: process.env.CLIENT_SECRET as string,
          refreshToken: process.env.REFRESH_TOKEN as string,
          accessToken: accessToken as string,
        },
      });

      const generateRandomString = async (length: number) => {
        let result = "";
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        return result;
      };

      const uuid = await generateRandomString(8);
      fs.writeFileSync("C:/apps/debate-app/app/api/auth/signup/code.txt", uuid);

      const mailOptions = {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Email Verification",
        text: `Use this code to verify your account: ${uuid}`,
      };

      await transport.sendMail(mailOptions);
    } catch (error) {
      console.log(error);
    }
  }
  sendEmail();

  if (!user) {
    return NextResponse.json(user);
  }

  // const token = jwt.sign(
  //   { userId: user.id, email: user.email, handle: user.handle },
  //   process.env.JWT_SECRET + "",
  //   { expiresIn: "7d" }
  // );

  return NextResponse.json({
    id: user.id,
    email: user.email,
    username: user.username,
    image: user.image,
    createdAt: user.createdAt,
    // token,
  });
}
