export type MssgPannelCtxType = {
  changePanelStatus: (value: {
    open: boolean;
    replyId: string;
    replyWriter: string;
    debating: boolean;
  }) => void;
  panelStatue: {
    open: boolean;
    debating: boolean;
    replyId: string;
    replyWriter: string;
  };
};
