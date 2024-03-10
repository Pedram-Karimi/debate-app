"use client";
import { User } from "@/types/globals";

function SetLocalStorage(props: { user: User }) {
  localStorage.setItem("user", JSON.stringify(props.user));
  return <></>;
}

export default SetLocalStorage;
