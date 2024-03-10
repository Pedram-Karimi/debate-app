"use client";

import { updateUser } from "@/app/actions/updateUser";
import { uploadImage } from "@/app/actions/uploadImage";
import { useEffect, useRef, useState } from "react";
import { FaPen } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

function UserInfo({
  image,
  username,
  email,
  id,
  handle,
}: {
  image: string;
  username: string;
  email: string;
  id: string;
  handle: string;
}) {
  const [usernameInput, setUsernameInput] = useState<string>(username);
  const [usernameFormState, setUsernameFormState] = useState<boolean>(false);
  const [handleFormState, setHandleFormState] = useState<boolean>(false);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [handleInput, setHandleInput] = useState<string>(handle);

  const changeProfilePic = async () => {
    if (userImage) {
      const image = new FormData();
      image.append("image", userImage);
      await uploadImage(id, image);
    }
  };

  useEffect(() => {
    if (userImage) changeProfilePic();
  }, [userImage]);

  const changeUsername = async () => {
    const updated = await updateUser(id, { username: usernameInput });
    if (updated) {
      setUsernameFormState(false);
    }
    console.log(updated);
  };

  const changeHandle = async () => {
    const updated = await updateUser(id, { handle: handleInput });
    if (updated) {
      setHandleFormState(false);
    }
    console.log(updated);
  };
  return (
    <div className="w-[33%] h-96 pt-4 ">
      <label htmlFor="userImage" className="">
        <img
          src={
            image
              ? image
              : "https://www.gravatar.com/avatar/b3568450826559f6ce26b424b8283279.jpg?size=240&d=https%3A%2F%2Fwww.artstation.com%2Fassets%2Fdefault_avatar.jpg"
          }
          className="w-[200px] h-[200px] rounded-lg cursor-pointer"
        />

        <input
          type="file"
          id="userImage"
          accept="image/*"
          className="hidden"
          onChange={(e: any) => {
            if (!e.target.files) {
              return;
            }
            setUserImage(e.target.files[0]);
          }}
          onClick={(e) => {
            console.log("click!");
          }}
        />
      </label>
      <br />
      <p className="group items-center ">
        <span className="font-bold ">Name:</span>{" "}
        {!usernameFormState && username}
        {usernameFormState && (
          <input
            className={`outline-none bg-transparent w-fit `}
            type="text"
            defaultValue={username}
            value={usernameInput}
            onChange={(e) => {
              setUsernameInput(e.currentTarget.value);
            }}
          />
        )}
        {!usernameFormState ? (
          <button
            className="opacity-0 p-2 rounded-lg ml-8 w-fit group-hover:opacity-100 bg-[var(--light-bg)] hover:bg-[var(--border-color-2)]"
            onClick={() => {
              setUsernameFormState(true);
            }}
          >
            <FaPen />
          </button>
        ) : (
          <button
            className="opacity-0 p-2  ml-8 rounded-lg bg-[var(--light-bg)] w-fit group-hover:opacity-100  hover:bg-[red]"
            onClick={() => {
              setUsernameInput(username);
              setUsernameFormState(false);
            }}
          >
            <ImCross />
          </button>
        )}
        {usernameFormState && (
          <button
            className="opacity-0 p-2 rounded-lg ml-2 w-fit group-hover:opacity-100 bg-[var(--light-bg)] hover:bg-[green]"
            onClick={changeUsername}
          >
            <FaCheck />
          </button>
        )}
      </p>

      <p>
        <span className="font-bold">Email:</span> {email}
      </p>

      <p className="group items-center ">
        <span className="font-bold ">Handle:</span> {!handleFormState && handle}
        {handleFormState && (
          <input
            className={`outline-none bg-transparent w-fit `}
            type="text"
            defaultValue={handle}
            value={handleInput}
            onChange={(e) => {
              setHandleInput(e.currentTarget.value);
            }}
          />
        )}
        {!handleFormState ? (
          <button
            className="opacity-0 p-2 rounded-lg ml-8 w-fit group-hover:opacity-100 bg-[var(--light-bg)] hover:bg-[var(--border-color-2)]"
            onClick={() => {
              setHandleFormState(true);
            }}
          >
            <FaPen />
          </button>
        ) : (
          <button
            className="opacity-0 p-2  ml-8 rounded-lg bg-[var(--light-bg)] w-fit group-hover:opacity-100  hover:bg-[red]"
            onClick={() => {
              setHandleInput(handle);
              setHandleFormState(false);
            }}
          >
            <ImCross />
          </button>
        )}
        {handleFormState && (
          <button
            className="opacity-0 p-2 rounded-lg ml-2 w-fit group-hover:opacity-100 bg-[var(--light-bg)] hover:bg-[green]"
            onClick={changeHandle}
          >
            <FaCheck />
          </button>
        )}
      </p>
    </div>
  );
}

export default UserInfo;
