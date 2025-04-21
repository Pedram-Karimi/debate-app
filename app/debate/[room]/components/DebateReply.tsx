import prisma from "@/prisma/client";
import Link from "next/link";
// import { Redis } from "ioredis";
// import ChatSlideParent from "./MssgTable/ChatSlideParent";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EnterDebateBtn from "./EnterDebateBtn";
import { getDebateMess } from "@/app/actions/getDebateMess";
import { Message } from "@/types/globals";
import { User } from "@/types/globals";
import { getUser } from "@/app/actions/getUser";
async function DebateReply({
  id,
  creatorId,
  roomId,
  text,
  createdAt,
  challenger,
}: {
  id: string;
  creatorId: string;
  roomId: string;
  text: string;
  createdAt: string;
  challenger: string;
}) {
  const user = await prisma.user.findUnique({ where: { id: creatorId } });
  const currentUser = await getServerSession(authOptions);
  const firstMssg: Message[] = await getDebateMess(id, 1);
  const opponent: User | null = await getUser(challenger);
  const latestDebateMessages = null;
  // messages under this reply

  return (
    <div className="w-[100%] gap-2 flex flex-col pr-4 pl-4 ">
      <div className="flex gap-2 items-center">
        <Link href={`/profile/${creatorId}`} className="w-fit">
          <img
            src={
              user?.image
                ? user?.image
                : "https://www.gravatar.com/avatar/b3568450826559f6ce26b424b8283279.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
            }
            className="w-[45px] h-[45px] rounded-full cursor-pointer"
          />
        </Link>
        <div className="w-full">
          <div className="flex gap-2 justify-between w-full ">
            <Link href={`/profile/${creatorId}`} className="w-fit flex gap-2 ">
              <p>
                <span className="font-bold">{user?.username ?? "[name]"}</span>
              </p>
            </Link>

            <EnterDebateBtn
              debating={
                challenger === currentUser?.user.id ||
                challenger === "" ||
                currentUser?.user.id === creatorId
              }
              replyId={id}
              replyWriter={creatorId}
            />
          </div>

          <p className="text-sm text-[var(--dark-text)]">{createdAt}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="text-lg">{text}</p>
        </div>
        {/* opponent */}
        <div className="flex gap-4">
          <div className="flex">
            <Link href={`/profile/${creatorId}`} className="w-fit">
              <img
                src={
                  opponent?.image
                    ? opponent?.image
                    : "https://www.gravatar.com/avatar/b3568450826559f6ce26b424b8283279.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
                }
                className="w-[45px] h-[45px] rounded-full cursor-pointer"
              />
            </Link>
            <Link
              href={`/profile/${opponent?.id}`}
              className="w-fit flex gap-2 "
            >
              <p>
                <span className="font-bold">
                  {opponent?.username ?? "[name]"}
                </span>
              </p>
            </Link>
          </div>
          {/* {firstMssg[0].mssg} */}
        </div>
      </div>
      <div className="w-full h-2 border-b border-[var(--border-color-2)] pl-4 pr-4"></div>
    </div>
  );
}

export default DebateReply;
