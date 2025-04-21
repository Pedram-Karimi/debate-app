"use server";

import prisma from "@/prisma/client";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function writeDebateMssg(
  mssg: { mssg: string },
  replyId: string,
  replyWriter: string
) {
  "use server";
  const session = await getServerSession(authOptions);

  try {
    if (!session) {
      return { status: false, response: "not authenticated" };
    }
    console.log(replyId);
    const reply = await prisma.replyToDebate.findUnique({
      where: { id: replyId },
    });
    if (session.user.id === replyWriter && reply?.challenger === "") {
      return { status: false, response: "You can't debate yourself" };
    }
    if (
      reply?.challenger === session.user.id ||
      reply?.creatorId === session.user.id
    ) {
      const mssgCreated = await prisma.debateMssg.create({
        data: { replyId, mssg: mssg.mssg, writerId: session.user.id },
      });

      return { status: true, response: mssgCreated };
    } else if (reply?.challenger === "") {
      await prisma.replyToDebate.update({
        where: { id: replyId },
        data: { challenger: session.user.id },
      });
      return { status: true, response: "Message created" };
    } else {
      return { status: false, response: "This is not your chat" };
    }
  } catch (err) {
    console.log(err);
    return { status: false, error: err };
  }
}
