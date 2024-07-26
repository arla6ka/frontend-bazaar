import React from "react";
import { FlipWords } from "./ui/flip-words";

export function FlipWordsDemo() {
  const words = ["быстро", "выгодно", "удобно", "легко"];

  return (
    <div className="mt-[60px] w-[700px] md:w-[1000px]  flex justify-center items-center px-3">
      <div className="text-[35px] leading-[50px] md:text-5xl md:leading-[55px] scale-[0.65] md:scale-90 text-center mx-auto font-medium font-unbounded text-neutral-600 dark:text-neutral-400">
        Ищи
        <FlipWords words={words} />на всех<br />
        маркетплейсах c Bazaar
      </div>
    </div>
  );
}
