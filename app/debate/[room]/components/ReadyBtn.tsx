"use client";

import { useEffect, useState } from "react";

function ReadyBtn({ id, readyStatus }: { id: string; readyStatus: boolean }) {
  const [status, setStatus] = useState<boolean>(readyStatus);

  useEffect(() => {
    const updateStatus = async () => {
      const response = await fetch("/api/debate/replies/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: status,
          id: id,
        }),
      });
    };
    updateStatus();
  }, [status]);
  return (
    <button
      className="border border-white px-2 py-1"
      onClick={() => {
        setStatus(!status);
      }}
    >
      {status + ""}
    </button>
  );
}

export default ReadyBtn;
