import { useEffect, RefObject } from "react";

export default function useOnClickOutside(
  ref: RefObject<HTMLDivElement>,
  ref2: RefObject<HTMLDivElement>,
  handler: (value: boolean) => void
) {
  useEffect(() => {
    const listener = (e: any) => {
      if (
        !ref.current ||
        ref.current.contains(e.target) ||
        !ref2.current ||
        ref2.current.contains(e.target)
      ) {
        return;
      }

      handler(e);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
