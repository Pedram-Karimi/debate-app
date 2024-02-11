"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";

function Form() {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const { data, status } = useSession();

  const createDebate = async () => {
    try {
      const response = await fetch("/api/debate/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          creatorEmail: data?.user?.email,
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
    <div className="pt-4 w-full flex flex-col items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createDebate();
          setTitle("");
          setDescription("");
        }}
        className="w-full flex flex-col items-center gap-2"
      >
        <input
          type="text"
          placeholder="Debate Topic"
          className="w-full bg-transparent border border-[var(--border-color-2)] rounded-lg p-2 text-lg"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <textarea
          className="w-full bg-transparent border border-[var(--border-color-2)] rounded-lg p-2 text-lg"
          placeholder="Short description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <button className="p-2 rounded-lg border border-[var(--border-color-2)] cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
