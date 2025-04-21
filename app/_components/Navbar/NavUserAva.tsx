"use client";

import { useState, useRef } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { User } from "@/types/globals";
import useOnClickOutside from "@/app/hooks/useOnClickOutside";

function NavUserAva({
  email,
  id,
  user,
}: {
  email: string;
  id: string;
  user: User;
}) {
  const [popup, setPopUp] = useState<boolean>(false);
  const avatar = useRef<HTMLImageElement>(null);
  const avaBox = useRef<HTMLDivElement>(null);
  useOnClickOutside(avaBox, avatar, () => setPopUp(false));
  return (
    <>
      <img
        ref={avatar}
        src={
          user?.image
            ? user.image
            : "https://www.gravatar.com/avatar/b3568450826559f6ce26b424b8283279.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
        }
        className="w-[50px] h-[50px] rounded-full cursor-pointer"
        onClick={() => {
          setPopUp(!popup);
        }}
      />

      {popup && (
        <div
          className="bg-[var(--bg-3)] z-50 absolute w-[300px] h-fit right-4 border border-[var(--border-color)] rounded-lg p-3 top-16"
          ref={avaBox}
        >
          <ul>
            <li className="flex gap-2 pb-2 mb-2 cursor-pointer border-b border-[var(--border-color)] text-base text-[var(--dark-text)] hover:text-[var(--text-color)]">
              <Link href={`/profile/${id}`}>
                <img
                  className="w-[40px] h-[40px] rounded-full cursor-pointer"
                  src={
                    user?.image
                      ? user.image
                      : "https://www.gravatar.com/avatar/b3568450826559f6ce26b424b8283279.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
                  }
                />
              </Link>
              <Link href={`/profile/${id}`}>
                <div className="pt-[5px] ">
                  <p>{email}</p>
                </div>
              </Link>
            </li>

            <li
              className="cursor-pointer items-center transition flex text-sm text-[var(--text-color)] hover:text-[var(--danger-color)]"
              onClick={() => signOut()}
            >
              log out
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default NavUserAva;
