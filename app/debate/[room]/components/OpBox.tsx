import Link from "next/link";
interface Props {
  title: string;
  debateId: string;
  description: string;
  creatorId: string;
  createdAt: string;
  creatorImg: string;
  creatorName: string;
  creatorHandle: string;
}
function OpBox({
  title,
  debateId,
  description,
  creatorId,
  createdAt,
  creatorImg,
  creatorName,
  creatorHandle,
}: Props) {
  return (
    <div className="w-[64%] ">
      <Link href={`/profile/${creatorId}`} className="w-fit">
        <div className="flex gap-2 items-center">
          <img
            src={
              creatorImg
                ? creatorImg
                : "https://www.gravatar.com/avatar/b3568450826559f6ce26b424b8283279.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
            }
            className="w-[45px] h-[45px] rounded-full cursor-pointer border border-[var(--border-color-2)]"
          />

          <div>
            <div>
              <p>
                <span className="font-bold">{creatorName ?? "[name]"}</span> .
                ID
              </p>
            </div>
            <p className="text-sm text-[var(--dark-text)]">{createdAt}</p>
          </div>
        </div>
      </Link>
      <Link href={`/debate/room/${debateId}`}>
        <div>
          <p className="text-lg">{title}</p>

          <p className="text-[var(--dark-text)] text-sm">{description}</p>
        </div>

        <div></div>
      </Link>
      <div className="w-full h-2 border-b border-[var(--border-color-2)] pl-4 pr-4"></div>
    </div>
  );
}

export default OpBox;
