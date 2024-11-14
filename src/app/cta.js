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
      <svg
        className="hi-mini hi-plus-circle inline-block size-5 opacity-50"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z"
          clipRule="evenodd"
        />
      </svg>
      <span>Create your Account</span>
    </Link>
  );
}

export default Cta;
