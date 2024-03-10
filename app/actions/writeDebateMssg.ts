"use server";
import { Redis } from "ioredis";
import prisma from "@/prisma/client";
export async function writeDebateMssg(
  mssg: { writerId: string; mssg: string },
  replyId: string
) {
  "use server";

  // create chat room in db
  try {
    const mssgCreated = await prisma.debateMssg.create({
      data: { replyId, mssg: mssg.mssg, writerId: mssg.writerId },
    });
    const redis = new Redis();
    redis.publish(replyId, JSON.stringify(mssg));
  } catch (err) {
    console.log(err);
  }
  // redis pub/sub
}
