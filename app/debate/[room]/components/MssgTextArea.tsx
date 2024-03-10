"use client";
import { FormEvent, useRef, useState } from "react";
import { IoSend } from "react-icons/io5";
import { writeDebateMssg } from "@/app/actions/writeDebateMssg";

function MssgTextArea({
  currUserHandle,
  replyId,
  currUserId,
}: {
  currUserHandle: string;
  replyId: string;
  currUserId: string;
}) {
  const messageInput = useRef<string>("");

  const publishMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    writeDebateMssg(
      { mssg: messageInput.current, writerId: currUserId },
      replyId
    );
    messageInput.current = "";
  };

  return (
    <form
      className="absolute left-0 bottom-0  w-full flex py-2 px-6"
      onSubmit={(e) => {
        publishMessage(e);
      }}
    >
      <input
        type="text"
        className="bg-[var(--wrapper-2)] w-full p-2 text-lg rounded-lg focus:border-[var(--white-bg)] outline-none border border-[var(--border-color-2)] rounded-r-none"
        placeholder="Type..."
        onChange={(e) => {
          messageInput.current = e.currentTarget.value;
        }}
      />
      <button className="p-2 bg-[var(--wrapper-2)] rounded-lg border border-[var(--border-color-2)] rounded-l-none hover:border-[var(--primary-color)]">
        <IoSend />
      </button>
    </form>
  );
}

export default MssgTextArea;
