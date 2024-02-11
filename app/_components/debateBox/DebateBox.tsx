import prisma from "@/prisma/client";
import Link from "next/link";

interface Props {
  debateTitle: string;
  debateDescription: string;
  creatorId: string;
  debateId: string;
  createdAt: string;
}
//
const DebateBox = async ({
  debateTitle,
  debateId,
  debateDescription,
  createdAt,
  creatorId,
}: Props) => {
  async function getUser() {
    const user = await prisma.user.findUnique({
      where: {
        id: creatorId,
      },
    });
    return user;
  }

  // check to not fetch current loged in user!! do not forget!

  const user = await getUser();

  return (
    <div>
      <div className="w-[100%] gap-2 flex flex-col pr-4 pl-4 ">
        {/* debate creater */}
        <Link href={`/profile/${creatorId}`} className="w-fit">
          <div className="flex gap-2 items-center">
            <img
              src={
                user?.image ??
                "https://www.gravatar.com/avatar/b3568450826559f6ce26b424b8283279.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
              }
              className="w-[45px] h-[45px] rounded-full cursor-pointer"
            />

            <div>
              <div>
                <p>
                  <span className="font-bold">
                    {user?.username ?? "[name]"}
                  </span>{" "}
                  . rank . [ID]
                </p>
              </div>
              <p className="text-sm text-[var(--dark-text)]">{createdAt}</p>
            </div>
          </div>
        </Link>
        <Link href={`/debate/${debateId}`}>
          {/* debate main line */}
          <div>
            <p className="text-lg">{debateTitle}</p>
            {/* debate description */}
            <p className="text-[var(--dark-text)] text-sm">
              {debateDescription}
            </p>
          </div>

          {/* possible media */}
          <div>
            {/* <img src={img} className="w-full rounded-xl m-auto max-w-[100%]" /> */}
          </div>
        </Link>
        {/* debate footer */}
      </div>

      <div className="w-full h-2 border-b border-[var(--border-color-2)] pl-4 pr-4"></div>
    </div>
  );
};

export default DebateBox;
