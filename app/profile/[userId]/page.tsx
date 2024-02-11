import Image from "next/image";
import prisma from "@/prisma/client";
import DebateBox from "@/app/_components/debateBox/DebateBox";
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
                debateId={debate.id}
                debateTitle={debate.title}
                creatorId={debate.creatorId as string}
                debateDescription={debate.description}
                createdAt=""
              />
            );
          })}
        </div>
      </div>
      <div className="w-[33%] h-96 pt-4">
        <Image
          src={user?.image as string}
          width={100}
          height={100}
          alt="Picture of the author"
        />

        <p>
          <span className="font-bold">Name:</span> {user?.username}
        </p>
        <p>
          <span className="font-bold">Email:</span> {user?.email}
        </p>
        <p>
          <span className="font-bold">Joined:</span> {user?.createdAt + ""}
        </p>
        <p>
          <span className="font-bold">Public ID:</span> {"something"}
        </p>
      </div>
    </div>
  );
}

export default page;
