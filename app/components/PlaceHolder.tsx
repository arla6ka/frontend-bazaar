"use client";

import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";

export function PlaceholdersAndVanishInputDemo({
  onChange,
  onSubmit
}: {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}) {
  const placeholders = [
    "Найди мне хорошую офисную мышь",
    "Я бы хотела заказать себе часы для бега",
    "Игровой компьютер до 300 тысяч тенге",
    "Хочу себе зарядку на айфон",
    "Найдите мне кроссовки для гор",
  ];

  return (
    <div className="h-[40rem] w-[25rem] md:w-[40rem] mb-[-200px]  flex flex-col justify-center mt-[-260px] items-center px-4 font-onest">

      <PlaceholdersAndVanishInput 
        placeholders={placeholders}
        onChange={onChange}
        onSubmit={onSubmit}
      />
    </div>
  );
}
