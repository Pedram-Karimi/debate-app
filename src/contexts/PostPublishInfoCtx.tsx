import { createContext, useContext, useState } from "react";

type ChildComponents = {
  children: JSX.Element;
};

const PostPublishInfoCtx = createContext<any>(null);

export const App = ({ children }: ChildComponents) => {
  const [publishInfo, setPublishInfo] = useState<any>();
  function changePostThumbnail(info: string) {
    let obj = { ...publishInfo, PublishThumbnail: info };
    setPublishInfo(obj);
  }
  function changePublishDescription(info: string) {
    let obj = { ...publishInfo, PublishDescription: info };
    setPublishInfo(obj);
  }
  function changePublishTagsInput(info: string) {
    let obj = { ...publishInfo, PublishThumbnail: info };
    setPublishInfo(obj);
  }

  function changeCategoryChoice(info: string) {
    let obj = { ...publishInfo, PublishThumbnail: info };
    setPublishInfo(obj);
  }
  function changeCategoryOfCategory(info: string) {
    let obj = { ...publishInfo, PublishThumbnail: info };
    setPublishInfo(obj);
  }
  return (
    <PostPublishInfoCtx.Provider value={{}}>
      {children}
    </PostPublishInfoCtx.Provider>
  );
};

export function usePostPublishInfo() {
  return useContext(PostPublishInfoCtx);
}
