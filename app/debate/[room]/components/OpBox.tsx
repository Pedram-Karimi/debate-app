import Media from "@/app/_components/debateBox/components/Media";
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
  statement: string;
  media: string;
}
function OpBox({
  title,
  debateId,
  description,
  creatorId,
  createdAt,
  creatorImg,
  statement,
  creatorName,
  creatorHandle,
  media,
}: Props) {
  return (
    <div className="w-[64%] gap-2 flex flex-col">
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
                <span className="font-bold">{creatorName ?? "[name]"}</span>
              </p>
            </div>
            <p className="text-sm text-[var(--dark-text)]">{createdAt}</p>
          </div>
        </div>
      </Link>
      <div className="gap-2">
        <p className="border rounded-lg border-[var(--primary-color-dark)] w-fit p-2 font-bold cursor-pointer">
          {title}
        </p>
        <p className="text-lg">{statement}</p>
        <p className="text-[var(--dark-text)] text-sm">{description}</p>
      </div>
      <div className="w-full flex justify-center">
        <Media media={media} />
      </div>
      <div className="w-full h-2 border-b border-[var(--border-color-2)] pl-4 pr-4"></div>
    </div>
  );
}

export default OpBox;
