"use client";

import MssgBox from "./MssgBox";
import MssgTextArea from "./MssgTextArea";
import { useMssgPanel } from "@/app/context/MssgPanelCtx";
import { useState, useEffect, useRef } from "react";
import socket from "@/app/libs/socket";
import { Message } from "@/types/globals";
import { getDebateMess } from "@/app/actions/getDebateMess";
import useOnClickOutside from "@/app/hooks/useOnClickOutside";
export default function ChatSlide() {
  const { panelStatue, changePanelStatus } = useMssgPanel();
  const [newMessages, setNewMessages] = useState<Message[]>([]);
  const chatSlide = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setNewMessages([]);
    const setMess = async () => {
      if (panelStatue.replyId)
        setNewMessages(await getDebateMess(panelStatue.replyId));
    };
    setMess();
  }, [panelStatue]);

  useEffect(() => {
    socket.on("chat message", (message) => {
      setNewMessages((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  useOnClickOutside(chatSlide, closeBtn, () =>
    changePanelStatus({
      open: false,
      replyId: "",
      replyWriter: "",
      debating: false,
    })
  );
  //
  return (
    <div
      className={`w-[33%] h-[100vh] fixed top-0 right-0 backdrop-blur-sm pt-16  bg-[var(--wrapper-1)] border-l border-[var(--border-color-2)] ${
        !panelStatue.open && "hidden"
      }`}
      ref={chatSlide}
    >
      <div className="p-6 w-full flex flex-col relative h-full px-2 pt-8">
        <div
          className="absolute top-2 left-2 cursor-pointer"
          ref={closeBtn}
          onClick={() => {
            changePanelStatus({
              open: false,
              replyId: "",
              replyWriter: "",
              debating: false,
            });
          }}
        >
          Close
        </div>

        {newMessages.map((mssg, index) => {
          return <MssgBox key={mssg.id} {...mssg} />;
        })}
        {/* REMINDER: FIXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX this shit */}
        {panelStatue.debating && (
          <MssgTextArea
            replyId={panelStatue.replyId}
            replyWriter={panelStatue.replyWriter}
          />
        )}
      </div>
    </div>
  );
}
