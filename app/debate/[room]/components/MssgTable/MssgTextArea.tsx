"use client";
import { FormEvent, useRef, useState, useEffect } from "react";
import { IoSend } from "react-icons/io5";
import { writeDebateMssg } from "@/app/actions/writeDebateMssg";
import socket from "@/app/libs/socket";

function MssgTextArea({
  replyId,
  replyWriter,
}: {
  replyId: string;
  replyWriter: string;
}) {
  const [messageInput, setMessageInput] = useState<string>("");

  console.log(replyId);
  const publishMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const mssg = await writeDebateMssg(
      { mssg: messageInput },
      replyId,
      replyWriter
    );
    console.log(mssg);
    if (mssg.status) {
      socket.emit("chat message", mssg.response);
    }

    setMessageInput("");
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
        value={messageInput}
        onChange={(e) => {
          setMessageInput(e.currentTarget.value);
        }}
      />
      <button className="p-2 bg-[var(--wrapper-2)] rounded-lg border border-[var(--border-color-2)] rounded-l-none hover:border-[var(--primary-color)]">
        <IoSend />
      </button>
    </form>
  );
}

export default MssgTextArea;
