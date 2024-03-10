"use client";
import { useContext } from "react";
import { LuSwords } from "react-icons/lu";
import { useMssgPanel } from "@/app/context/MssgPanelCtx";
export default function EnterDebateBtn() {
  const { setPanelStatus } = useMssgPanel();
  return (
    <button
      className="flex"
      onClick={() => {
        setPanelStatus(true);
      }}
    >
      Enter the debate <LuSwords className="text-lg" />
    </button>
  );
}
