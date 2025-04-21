"use client";

import { useRef, useState, useEffect } from "react";
import CatagorySelection from "./CatagorySelection";
import { BiSend } from "react-icons/bi";
import { IoCloseOutline } from "react-icons/io5";

function Form() {
  const [title, setTitle] = useState<string>("");
  const [currCat, setCurrCat] = useState<number | null>(null);
  const [statement, setStatement] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [media, setMedia] = useState<string[]>([]);
  const mediaRef = useRef<HTMLInputElement | null>(null);

  function checkImage(url: string) {
    var image = new Image();
    image.onload = function () {
      if (image.width > 0) {
        console.log("yes");
      }
    };
    image.onerror = function () {
      console.log("no");
      setMedia((prevItems) => {
        const newItems = [...prevItems];
        newItems.pop();
        return newItems;
      });
    };
    image.src = url;
  }

  // console.log(checkImage("https://i.ibb.co/6JgvSjQ/6380.jpg"));
  const createDebate = async () => {
    console.log(media.length);
    if (media.length > 3) {
      alert("You can't add more than 3 media links");
      return;
    }
    if (!description || !statement || !title || currCat === null) {
      alert("Fill all the fields");
      return;
    }
    try {
      const response = await fetch("/api/debate/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currCat,
          media: media.join(";"),
          title,
          statement,
          description,
        }),
      });

      if (response.ok) {
        const createdPost = await response.json();
        console.log("Created debate:", createdPost);
      } else {
        console.error("Failed to create debate:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating debate:", error);
    }
  };
  return (
    <div className="pt-4 w-full flex flex-col items-center gap-4">
      {/* cat.... */}
      <div className="flex gap-4">
        <div
          className={`${
            currCat === 0
              ? "bg-[var(--primary-color-dark)]"
              : "hover:bg-[var(--bg-3)]"
          } p-4 border border-[var(--primary-color-transparent-1)] rounded-lg cursor-pointer`}
          onClick={() => {
            setCurrCat(0);
          }}
        >
          <p>Art/Entertainment</p>
        </div>
        <div
          className={`${
            currCat === 1
              ? "bg-[var(--primary-color-dark)]"
              : "hover:bg-[var(--bg-3)]"
          } p-4 border border-[var(--primary-color-transparent-1)] rounded-lg cursor-pointer`}
          onClick={() => {
            setCurrCat(1);
          }}
        >
          <p>Politics</p>
        </div>
        <div
          className={`${
            currCat === 2
              ? "bg-[var(--primary-color-dark)]"
              : "hover:bg-[var(--bg-3)]"
          } p-4 border border-[var(--primary-color-transparent-1)] rounded-lg cursor-pointer`}
          onClick={() => {
            setCurrCat(2);
          }}
        >
          <p>Philosophy</p>
        </div>
      </div>
      {/*  */}
      <div className="w-full flex flex-col items-center gap-2">
        <input
          type="text"
          placeholder={
            "Topic | ex: books, U.S. election, anime, god, morality, movies, civil rights, etc..."
          }
          className="w-full bg-transparent border border-[var(--border-color-2)] rounded-lg p-2 text-lg outline-4 focus:outline-none  focus:border-[var(--primary-color-dark)] "
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="Your statement/claim"
          className="w-full bg-transparent border border-[var(--border-color-2)] rounded-lg p-2 text-lg focus:outline-none  focus:border-[var(--primary-color-dark)]"
          value={statement}
          onChange={(e) => {
            setStatement(e.target.value);
          }}
        />
        <textarea
          className="w-full bg-transparent border border-[var(--border-color-2)] rounded-lg p-2 text-lg focus:outline-none  focus:border-[var(--primary-color-dark)]"
          placeholder="Add a short summary of your argument, context etc... "
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <form
          className="w-full relative flex items-center"
          onSubmit={(e) => {
            e.preventDefault();
            if (mediaRef.current) setMedia([...media, mediaRef.current.value]);
          }}
        >
          <input
            type="text"
            name="media"
            className="w-full pr-8 bg-transparent border border-[var(--border-color-2)] rounded-lg p-2 text-lg focus:outline-none  focus:border-[var(--primary-color-dark)]"
            placeholder="Add links to include images or youtube videos"
            ref={mediaRef}
          />
          <button className="absolute right-2 text-2xl cursor-pointer">
            <BiSend className="hover:fill-[var(--primary-color-dark)]" />
          </button>
        </form>
        {media.map((item, i) => {
          if (item.split("=")[0] === "https://www.youtube.com/watch?v") {
            return (
              <div className="relative">
                <IoCloseOutline
                  className="absolute top-0 right-0 cursor-pointer bg-black border-white border text-4xl"
                  onClick={() => {
                    const newArray = media.filter((item, index) => index !== i);
                    setMedia(newArray);
                  }}
                />
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
            checkImage(item);
            return (
              <div className="relative">
                <IoCloseOutline
                  className="absolute top-0 right-0 cursor-pointer bg-black border-white border text-4xl"
                  onClick={() => {
                    const newArray = media.filter((item, index) => index !== i);
                    setMedia(newArray);
                  }}
                />
                <img
                  className="w-[560px] h-[315px]"
                  src={item}
                  alt="Link is invalid"
                  key={item}
                />
              </div>
            );
          }
        })}
        <button
          className="p-2 px-4 rounded-lg border border-[var(--primary-color)] cursor-pointer hover:bg-[var(--primary-color-transparent-1)]"
          onClick={(e) => {
            e.preventDefault();
            createDebate();
            // setTitle("");
            // setDescription("");
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Form;

{
  // TAGS
  //
  //
  //
  //
  /* <div className="flex gap-2">
{tags.map((tag, index) => {
  return (
    <p
      className={
        tag === ""
          ? "hidden"
          : "p-2 flex gap-2 text-base rounded text-white border border-[var(--border-color-2)]"
      }
      key={index}
    >
      {tag}
      <svg
        x="0px"
        y="0px"
        className="w-3 fill-white cursor-pointer"
        viewBox="0 0 92.132 92.132"
        onClick={() => {
          setTags((pervTags) =>
            pervTags.filter((tagItem) => {
              return tag !== tagItem;
            })
          );
        }}
      >
        <path
          d="M2.141,89.13c1.425,1.429,3.299,2.142,5.167,2.142c1.869,0,3.742-0.713,5.167-2.142l33.591-33.592L79.657,89.13
c1.426,1.429,3.299,2.142,5.167,2.142c1.867,0,3.74-0.713,5.167-2.142c2.854-2.854,2.854-7.48,0-10.334L56.398,45.205
l31.869-31.869c2.855-2.853,2.855-7.481,0-10.334c-2.853-2.855-7.479-2.855-10.334,0L46.065,34.87L14.198,3.001
c-2.854-2.855-7.481-2.855-10.333,0c-2.855,2.853-2.855,7.481,0,10.334l31.868,31.869L2.143,78.795
C-0.714,81.648-0.714,86.274,2.141,89.13z"
        />
      </svg>
    </p>
  );
})}
</div> */
}
