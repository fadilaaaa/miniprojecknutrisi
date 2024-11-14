"use client";
import React from "react";
import Link from "next/link";
// import { useRouter } from "next/router";

function Cta({ router }) {
  //   const router = useRouter();
  async function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function handleTransition(event) {
    event.preventDefault();
    const body = document.querySelector("body");
    body.classList.add("page-transition");
    await sleep(300);

    router.push("/generate");
    await sleep(500);
    body.classList.remove("page-transition");
    console.log("Transitioning to the generate page");
  }
  return (
    <Link
      href="/generate"
      onClick={handleTransition}
      className="inline-flex items-center justify-center gap-2 rounded-lg border border-blue-700 bg-blue-700 px-6 py-3 font-semibold leading-6 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 dark:focus:ring-blue-400/90"
    >
      <span className="uppercase">Cek Sekarang !</span>
    </Link>
  );
}

export default Cta;
