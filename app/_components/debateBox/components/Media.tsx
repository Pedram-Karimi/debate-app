"use client";

import { useState } from "react";

function Media({ media }: { media: string }) {
  const [showAllToggle, setShowAllToggle] = useState(false);

  return (
    <div className="relative">
      {media.split(";").length > 1 && (
        <button
          className="absolute z-20 right-0 bottom-[-22px]"
          onClick={() => {
            setShowAllToggle(!showAllToggle);
          }}
        >
          {showAllToggle ? "Show less" : "Show more..."}
        </button>
      )}
      {media.split(";").map((item, i) => {
        if (i !== 0) {
          return;
        }
        if (item.split("=")[0] === "https://www.youtube.com/watch?v") {
          return (
            <div className="relative">
              <iframe
                width="560"
                height="315"
                key={item}
                src={`https://www.youtube.com/embed/${
                  item.split("watch?v=")[1].split("&")[0]
                }`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          );
        } else {
          return (
            <div className="relative">
              <img
                className="w-[100%] h-[315px]"
                src={item}
                alt="Link is invalid"
                key={item}
              />
            </div>
          );
        }
      })}
      {media.split(";").length > 1 &&
        showAllToggle &&
        media.split(";").map((item, i) => {
          if (i === 0) {
            return;
          }
          if (item.split("=")[0] === "https://www.youtube.com/watch?v") {
            return (
              <div className="relative">
                <iframe
                  width="560"
                  height="315"
                  key={item}
                  src={`https://www.youtube.com/embed/${
                    item.split("watch?v=")[1].split("&")[0]
                  }`}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                ></iframe>
              </div>
            );
          } else {
            return (
              <div className="relative">
                <img
                  className="w-[100%] h-[315px]"
                  src={item}
                  alt="Link is invalid"
                  key={item}
                />
              </div>
            );
          }
        })}
    </div>
  );
}

export default Media;
