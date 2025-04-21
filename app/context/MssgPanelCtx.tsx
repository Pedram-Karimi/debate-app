"use client";
import { createContext, useContext, useState } from "react";
import { MssgPannelCtxType } from "./types/MssgPannelType";
const MssgPanelContext = createContext<MssgPannelCtxType | null>(null);

type ChildComponents = {
  children: JSX.Element;
};

export function MssgPanelCtxProvider({ children }: ChildComponents) {
  const [panelStatue, setPanelStatus] = useState<{
    open: boolean;
    replyId: string;
    replyWriter: string;
    debating: boolean;
  }>({ open: false, replyId: "", replyWriter: "", debating: false });
  function changePanelStatus(value: {
    open: boolean;
    replyId: string;
    replyWriter: string;
    debating: boolean;
  }) {
    setPanelStatus(value);
  }
  return (
    <MssgPanelContext.Provider value={{ changePanelStatus, panelStatue }}>
      {children}
    </MssgPanelContext.Provider>
  );
}

export function useMssgPanel() {
  return useContext(MssgPanelContext) as MssgPannelCtxType;
}
