"use client";

import { useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

function Verify() {
  const vCode = useRef<string>();

  const searchParams = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const id = searchParams.get("id");

  const router = useRouter();

  const codeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const verified = await fetch("/api/auth/verifyEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          code: vCode.current,
        }),
      });

      if (verified.ok) {
        console.log("yoho", verified);
        router.push("/", { scroll: false });
      } else {
        setError(verified.statusText);
      }
    } catch (err) {
      console.error("Error checking the code:", err);
    }
    setLoading(false);
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="bg-[var(--bg-2)] rounded-lg border border-[var(--border-color)] p-5 flex flex-col h-[70vh] pb-3 w-[95%] sm:w-[30%]">
        <h1 className="text-[var(--text-color)] text-2xl text-center pb-5 font-bold pt-0">
          Verifaction Email Sent!
        </h1>
        <form
          className="flex-col flex gap-2 justify-between h-full "
          onSubmit={codeSubmit}
        >
          <div className="flex-col flex gap-2 pt-0">
            <input
              placeholder="Enter the Code..."
              className="bg-transparent p-2 border border-[var(--border-color-2)] rounded-lg outline-none text-[var(--text-color)] placeholder-[var(--placeholder-text)]"
              required
              onChange={(e) => {
                vCode.current = e.target.value;
              }}
              disabled={loading}
            />
            {error && (
              <p className="p-2 bg-[var(--error-bg)] flex justify-center rounded-lg">
                {error}
              </p>
            )}
          </div>

          <div className="flex-col flex gap-2 pt-0">
            <button
              disabled={loading}
              className={`border border-[var(--primary-color-transparent-1)] text-[var(--text-color)] p-2 cursor-pointer rounded-lg  hover:bg-[var(--primary-color-transparent-1)] transition ${
                loading &&
                "pointer-events-none bg-[var(--primary-color-transparent-2)] border-[var(--primary-color-transparent-2)]"
              }`}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Verify;
