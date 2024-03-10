"use client";
import { createContext, useContext, useState } from "react";

const MssgPanelContext = createContext<any>(null);

type ChildComponents = {
  children: JSX.Element;
};

export function MssgPanelCtxProvider({ children }: ChildComponents) {
  const [panelStatue, setPanelStatus] = useState<boolean>(false);
  // function changePanelStatus() {
  //   setPanelStatus(!panelStatue);
  // }
  return (
    <MssgPanelContext.Provider value={{ setPanelStatus, panelStatue }}>
      {children}
    </MssgPanelContext.Provider>
  );
}

export function useMssgPanel() {
  return useContext(MssgPanelContext);
}
