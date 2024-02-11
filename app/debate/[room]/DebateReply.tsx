import prisma from "@/prisma/client";
import Link from "next/link";
import { LuSwords } from "react-icons/lu";

// import ReadyBtn from "./ReadyBtn";

async function DebateReply(params: {
  id: string;
  creatorId: string;
  roomId: string;
  text: string;
  createdAt: string;
  readyStatus: boolean;
}) {
  async function getUser() {
    const user = await prisma.user.findUnique({
      where: {
        id: params.creatorId,
      },
    });
    return user;
  }

  // check to not fetch current loged in user!! do not forget!

  const user = await getUser();
  return (
    <div className="w-[100%] gap-2 flex flex-col pr-4 pl-4 ">
      {" "}
      {/* arg creator */}
      <div className="flex gap-2 items-center">
        <Link href={`/profile/${params.creatorId}`} className="w-fit">
          <img
            src={
              user?.image ??
              "https://www.gravatar.com/avatar/b3568450826559f6ce26b424b8283279.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
            }
            className="w-[45px] h-[45px] rounded-full cursor-pointer"
          />
        </Link>
        <div className="w-full">
          <div className="flex gap-2 justify-between w-full ">
            <Link
              href={`/profile/${params.creatorId}`}
              className="w-fit flex gap-2 "
            >
              <p>
                <span className="font-bold">{user?.username ?? "[name]"}</span>
              </p>
              <p>ID</p>
            </Link>
            <Link
              href={{
                pathname: `/debate/${params.roomId}/chatId`,
                query: { id: `${user?.username}&1` },
              }}
            >
              <button className="flex">
                Enter the debate <LuSwords className="text-lg" />
              </button>
            </Link>
            {/* <ReadyBtn id={params.id} readyStatus={params.readyStatus} /> */}
          </div>

          <p className="text-sm text-[var(--dark-text)]">{params.createdAt}</p>
        </div>
      </div>
      <div>
        <p className="text-lg">{params.text}</p>
      </div>
      <div className="w-full h-2 border-b border-[var(--border-color-2)] pl-4 pr-4"></div>
    </div>
  );
}

export default DebateReply;
