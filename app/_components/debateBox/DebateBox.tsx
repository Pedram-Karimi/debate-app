import prisma from "@/prisma/client";
import Link from "next/link";
import type { DebateBox } from "@/types/globals";
import Media from "./components/Media";
//
const DebateBox = async ({
  title,
  id,
  description,
  createdAt,
  creatorId,
  media,
  currCat,
  statement,
}: DebateBox) => {
  async function getUser() {
    const user = await prisma.user.findUnique({
      where: {
        id: creatorId,
      },
    });
    return user;
  }

  const user = await getUser();

  return (
    <div>
      <div className="w-[100%] gap-2 flex flex-col pr-4 pl-4 ">
        {/* debate creator */}
        <Link href={`/profile/${creatorId}`} className="w-fit">
          <div className="flex gap-2 items-center">
            <img
              src={
                user?.image
                  ? user?.image
                  : "https://www.gravatar.com/avatar/b3568450826559f6ce26b424b8283279.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
              }
              className="w-[45px] h-[45px] rounded-full cursor-pointer"
            />
            <div>
              <div>
                <p>
                  <span className="font-bold">
                    {user?.username ?? "[name]"}
                  </span>
                </p>
              </div>
              <p className="text-sm text-[var(--dark-text)]">{createdAt}</p>
            </div>
          </div>
        </Link>
        <Link href={`/debate/${id}`}>
          {/* debate main line */}
          <div>
            <div className="flex justify-between w-full align-middle">
              <p className="text-[var(--primary-color)] w-fit m-2 font-bold cursor-pointer">
                {title}
              </p>
              <p className="text-sm text-[var(--dark-text) w-fit m-2 cursor-pointer]">
                {currCat}
              </p>
            </div>
            <p className="text-lg">{statement}</p>
            {/* debate description */}
            <p className="text-[var(--dark-text)] text-sm">{description}</p>
          </div>
        </Link>
        <div className="w-full flex justify-center">
          <Media media={media} />
        </div>
      </div>

      <div className="w-full h-6 border-b border-[var(--border-color-2)] pl-4 pr-4"></div>
    </div>
  );
};

export default DebateBox;
