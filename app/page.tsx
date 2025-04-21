import { NextResponse } from "next/server";
import DebateBox from "./_components/debateBox/DebateBox";
import prisma from "@/prisma/client";

const Home = async () => {
  async function getDebateRooms() {
    const debateRooms = await prisma.debateRoom.findMany();
    return debateRooms;
  }

  const debateRooms = await getDebateRooms();

  return (
    <div className="max-w-[1100px] m-auto flex justify-between mt-16">
      <div className="w-[64%] flex flex-col gap-4 border-l border-r border-[var(--border-color-2)] pt-4 pb-4">
        {debateRooms.map((room) => (
          <DebateBox
            key={room.id}
            id={room.id}
            title={room.title}
            media={room.media}
            statement={room.statement}
            currCat={room.currCat}
            createdAt={
              (room.createdAt + "").split(" ")[1] +
              " " +
              (room.createdAt + "").split(" ")[2] +
              " " +
              (room.createdAt + "").split(" ")[3]
            }
            creatorId={room.creatorId as string}
            description={room.description}
          />
        ))}
      </div>
      <div className="w-[33%] h-96 pt-4">
        <div className="w-[100%] h-96 rounded-xl">
          <p className="font-bold text-[22px]">Popular Tags</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
