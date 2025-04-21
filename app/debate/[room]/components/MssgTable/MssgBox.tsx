"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUser } from "@/app/actions/getUser";
import { User } from "@/types/globals";
export default function MssgBox({
  id,
  mssg,
  writerId,
  replyId,
  createdAt,
}: {
  id: string;
  mssg: string;
  writerId: string;
  replyId: string;
  createdAt: Date;
}) {
  const [user, setUser] = useState<User | null>();

  useEffect(() => {
    const getChatter = async () => {
      setUser(await getUser(writerId));
    };
    getChatter();
  }, []);
  return (
    <div className=" ">
      {/* debate creator */}

      <div className="flex gap-2 items-center">
        <Link href={`/profile/${writerId}`} className="w-fit">
          <img
            src={
              user?.image
                ? user?.image
                : "https://www.gravatar.com/avatar/b3568450826559f6ce26b424b8283279.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
            }
            className="w-[37px] h-[37px] rounded-full cursor-pointer"
          />
        </Link>
        <div>
          <Link href={`/profile/${writerId}`} className="w-fit">
            <div>
              <p>
                <span className="font-bold text-sm">
                  {user?.username ?? "[name]"}
                </span>
              </p>
            </div>
          </Link>
          <p className="text-md">{mssg}</p>
        </div>
      </div>
    </div>
  );
}
