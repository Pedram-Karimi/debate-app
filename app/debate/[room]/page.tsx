import prisma from "@/prisma/client";
import OpBox from "./components/OpBox";
import DebateReply from "./components/DebateReply";
import WritingReplies from "./components/WritingReplies";

async function page({ params }: { params: { room: string } }) {
  const debateRoom = await prisma.debateRoom.findUnique({
    where: {
      id: params.room,
    },
    include: {
      replies: true,
    },
  });

  const debateCreator = await prisma.user.findUnique({
    where: { id: debateRoom?.creatorId },
  });

  return (
    <div className="pt-20 p-6 w-full justify-center flex flex-col">
      <div className="w-full flex justify-center">
        {debateRoom && debateCreator && (
          <OpBox
            title={debateRoom.title}
            description={debateRoom.description}
            creatorId={debateRoom.creatorId}
            creatorHandle={debateCreator.handle}
            debateId={debateRoom.id}
            createdAt={
              (debateRoom.createdAt + "").split(" ")[1] +
              " " +
              (debateRoom.createdAt + "").split(" ")[2] +
              " " +
              (debateRoom.createdAt + "").split(" ")[3]
            }
            creatorImg={debateCreator.image}
            creatorName={debateCreator.username}
          />
        )}
      </div>

      {/* writing replies */}
      <h1 className="py-4">Write arguments under this post:</h1>
      <WritingReplies debRoom={debateRoom?.id as string} />
      {/* replies */}
      <h1 className="py-4">Arguments under this post:</h1>
      <div className="flex flex-col gap-4">
        {debateRoom &&
          debateRoom.replies.map((arg) => (
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
