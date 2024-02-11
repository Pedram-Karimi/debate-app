import prisma from "@/prisma/client";
import Link from "next/link";
import OpBox from "./OpBox";
import ReadyBtn from "./ReadyBtn";
import DebateReply from "./DebateReply";

//
import WritingReplies from "./WritingReplies";
async function page({ params }: { params: { room: string } }) {
  async function getDebateRoom() {
    const debateRoom = await prisma.debateRoom.findUnique({
      where: {
        id: params.room,
      },
    });
    return debateRoom;
  }

  async function getDebArgs() {
    const debArgs = await prisma.argsInDebRoom.findMany({
      where: {
        roomId: params.room,
      },
    });
    return debArgs;
  }

  const debateRoom = await getDebateRoom();

  const debArgs = await getDebArgs();

  async function getCreator() {
    const creator = await prisma.user.findUnique({
      where: {
        id: debateRoom?.creatorId as string,
      },
    });
    return creator;
  }

  const creator = await getCreator();

  return (
    <div className="pt-20 p-6 w-full justify-center flex flex-col">
      <div className="w-full flex justify-center">
        <OpBox
          title={debateRoom?.title as string}
          description={debateRoom?.description as string}
          creatorId={debateRoom?.creatorId as string}
          debateId={debateRoom?.id as string}
          createdAt={
            (debateRoom?.createdAt + "").split(" ")[1] +
            " " +
            (debateRoom?.createdAt + "").split(" ")[2] +
            " " +
            (debateRoom?.createdAt + "").split(" ")[3]
          }
          creatorImg={creator?.image as string}
          creatorName={creator?.username as string}
        />
      </div>

      {/* writing replies */}
      <h1 className="py-4">Write arguments under this post:</h1>
      <WritingReplies debRoom={debateRoom?.id as string} />
      {/* replies */}
      <h1 className="py-4">Arguments under this post:</h1>
      <div className="flex flex-col gap-4">
        {debArgs.map((arg) => (
          <DebateReply
            key={arg.id}
            {...arg}
            createdAt={
              (arg.createdAt + "").split(" ")[1] +
              " " +
              (arg.createdAt + "").split(" ")[2] +
              " " +
              (arg.createdAt + "").split(" ")[3]
            }
          />
        ))}
      </div>
    </div>
  );
}

export default page;
