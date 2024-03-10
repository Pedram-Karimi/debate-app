"use client";

import MssgTable from "./MssgTable";
import MssgTextArea from "./MssgTextArea";
import { useMssgPanel } from "@/app/context/MssgPanelCtx";
import { useState } from "react";

export default function ChatSlide({
  currUser,
  replyId,
  messages,
}: {
  currUser: { handle: string; email: string; id: string };
  replyId: string;
  messages: {
    id: string;
    mssg: string;
    writerId: string;
    replyId: string;
    createdAt: Date;
  }[];
}) {
  const { panelStatue, setPanelStatus } = useMssgPanel();
  return (
    <div
      className={`w-[33%] h-[100vh] absolute top-0 right-0 pt-16 backdrop-blur-xl bg-[var(--wrapper-1)] border-l border-[var(--border-color-2)] ${
        !panelStatue && "hidden"
      }`}
    >
      <div className="p-6 w-full flex flex-col relative h-full">
        <button
          className="absolute top-2 left-2"
          onClick={() => {
            setPanelStatus(false);
          }}
        >
          Close
        </button>

        <div className="w-full flex-1  mb-8">
          {messages.map((mssg) => {
            return <MssgTable key={mssg.id} {...mssg} />;
          })}
        </div>

        <MssgTextArea
          currUserHandle={currUser.handle}
          replyId={replyId}
          currUserId={currUser.id}
        />
      </div>
    </div>
  );
}
