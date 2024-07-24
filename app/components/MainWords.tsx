import React from "react";
import { FlipWords } from "./ui/flip-words";

export function FlipWordsDemo() {
  const words = ["быстро", "выгодно", "удобно", "легко"];

  return (
    <div className="mt-[60px] flex justify-center items-center px-3">
      <div className="text-5xl max-w-[470px] md:max-w-[1000px] md:leading-[55px] scale-[0.7] md:scale-90 text-center mx-auto font-medium font-unbounded text-neutral-600 dark:text-neutral-400">
        Ищи
        <FlipWords words={words} />на всех<br />
        маркетплейсах c Bazaar
      </div>
    </div>
  );
}
