"use server";

import prisma from "@/prisma/client";
import { Message } from "@/types/globals";

export async function getDebateMess(replyId: string, limit?: number) {
  "use server";
  if (limit) {
    const messages: Message[] = await prisma.debateMssg.findMany({
      where: { replyId: replyId },
      take: limit,
    });
    return messages;
  } else {
    const messages: Message[] = await prisma.debateMssg.findMany({
      where: { replyId: replyId },
    });
    return messages;
  }
}
