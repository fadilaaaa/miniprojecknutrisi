"use client";
import React, { useState } from "react";
import Image from "next/image";
import Cta from "./cta";
import { useRouter } from "next/navigation";

export default function CTASimplewithIllustration() {
  const router = useRouter();
  return (
    <>
      {/* CTA Section: Simple With Illustration */}
      <div className="bg-white ">
        <div className="container mx-auto grid grid-cols-1 gap-12 px-4 py-16 lg:grid-cols-2 lg:px-8 lg:py-32 xl:max-w-7xl">
          <div className="flex items-center text-center lg:text-left">
            <div className="space-y-8">
              {/* Heading */}
              <div>
                <div className="mb-1 text-sm font-bold uppercase tracking-wider text-blue-600 ">
                  Mulai Sekarang
                </div>
                <h2 className="mb-4 text-4xl font-black text-black ">
                  Cek Nutrisi Makanan Anda{" "}
                  <span className="text-blue-600 ">sekarang</span>!
                </h2>
                <h3 className="text-xl font-medium leading-relaxed text-gray-700 ">
                  Dapatkan informasi nutrisi dari foto makanan Anda dengan
                  mudah. Mulai sekarang dan ketahui kandungan kalori,
                  karbohidrat, lemak, dan protein dari makanan Anda.
                </h3>
              </div>
              {/* END Heading */}

              {/* Action */}
              <div>
                <Cta router={router}></Cta>
              </div>
              {/* END Action */}
            </div>
          </div>
          <div className="flex items-center text-blue-500 lg:justify-end">
            <Image
              // className="hi-mini hi-plus-circle inline-block size-5 opacity-50"
              priority
              src="/illustration.svg"
              width={564}
              height={360}
              alt="Illustration"
            />
          </div>
        </div>
      </div>
      {/* END CTA Section: Simple With Illustration */}
    </>
  );
}
