"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

import DebateReply from "./DebateReply";

function WritingReplies({ debRoom }: { debRoom: string }) {
  const [arg, setArg] = useState<string>();
  const { data, status } = useSession();
  const createReply = async () => {
    try {
      const response = await fetch("/api/debate/replies/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          arg,
          debRoom,
        }),
      });
    } catch (error) {
      console.error("Error creating debate:", error);
    }
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createReply();
          setArg("");
        }}
        className="w-full flex flex-col items-center gap-2"
      >
        <textarea
          className="w-full bg-transparent border border-[var(--border-color-2)] rounded-lg p-2 text-lg"
          placeholder="Short text..."
          value={arg}
          onChange={(e) => {
            setArg(e.target.value);
          }}
        ></textarea>
        <button className="p-2 rounded-lg border border-[var(--border-color-2)] cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
}

export default WritingReplies;
