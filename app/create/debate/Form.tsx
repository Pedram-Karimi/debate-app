"use client";

import { useState } from "react";

function Form() {
  const [topic, setTopic] = useState<string>();

  return (
    <div className="pt-4 w-full flex flex-col items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
        className="w-full flex flex-col items-center gap-2"
      >
        <input
          type="text"
          placeholder="Debate Topic"
          className="w-full bg-transparent border border-[var(--border-color-2)] rounded-lg p-2 text-lg"
          value={topic}
          onChange={(e) => {
            setTopic(e.target.value);
          }}
        />
        <button className="p-2 rounded-lg border border-[var(--border-color-2)] cursor-pointer">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
