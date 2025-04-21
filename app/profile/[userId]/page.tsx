import Image from "next/image";
import prisma from "@/prisma/client";
import DebateBox from "@/app/_components/debateBox/DebateBox";
import UserInfo from "./UserInfo";

async function page({ params }: { params: { userId: string } }) {
  async function getUser() {
    const user = await prisma.user.findUnique({
      include: {
        debatesCreated: true,
      },
      where: {
        id: params.userId,
      },
    });
    return user;
  }
  const user = await getUser();

  return (
    <div className="pt-20 p-6 w-full justify-between flex">
      <div className="w-[64%] ">
        <h1 className="text-xl pb-4">Debates created: </h1>

        <div className="flex flex-col gap-4 border-l border-r border-[var(--border-color-2)] pt-4 pb-4 ">
          {user?.debatesCreated.map((debate) => {
            return (
              <DebateBox
                key={debate.id}
                media={debate.media}
                statement={debate.statement}
                currCat={debate.currCat}
                id={debate.id}
                title={debate.title}
                creatorId={debate.creatorId as string}
                description={debate.description}
                createdAt={
                  (debate?.createdAt + "").split(" ")[1] +
                  " " +
                  (debate?.createdAt + "").split(" ")[2] +
                  " " +
                  (debate?.createdAt + "").split(" ")[3]
                }
              />
            );
          })}
        </div>
      </div>
      {user !== null && (
        <UserInfo
          username={user.username}
          email={user.email}
          image={user.image}
          handle={user.handle}
          id={user.id}
        />
      )}
    </div>
  );
}

export default page;
