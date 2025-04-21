"use client";
import { LuSwords } from "react-icons/lu";
import { useMssgPanel } from "@/app/context/MssgPanelCtx";
export default function EnterDebateBtn({
  debating,
  replyId,
  replyWriter,
}: {
  debating: boolean;
  replyId: string;
  replyWriter: string;
}) {
  const { changePanelStatus } = useMssgPanel();
  return (
    <button
      className="flex"
      onClick={() => {
        changePanelStatus({
          open: true,
          debating: debating,
          replyId: replyId,
          replyWriter: replyWriter,
        });
      }}
    >
      Expand the debate
      {/* <LuSwords className="text-lg" /> */}
    </button>
  );
}
