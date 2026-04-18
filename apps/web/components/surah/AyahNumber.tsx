"use client";

import Image from "next/image";

interface AyahNumberProps {
  number: number;
}

const toArabicDigits = (num: number): string => {
  const arabicDigits = ["٠", "١", "٢", "٣", "٤", "٥", "٦", "٧", "٨", "٩"];
  return num
    .toString()
    .split("")
    .map((digit) => arabicDigits[parseInt(digit)])
    .join("");
};

export default function AyahNumber({ number }: AyahNumberProps) {
  return (
    <div className="relative inline-flex items-center justify-center w-10 h-10 group">
      {/* Ayah Frame Image */}
      <Image
        src="/ayah.png"
        alt=""
        width={40}
        height={40}
        className="w-full h-full object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />
      
      {/* Arabic Number Overlay */}
      <span 
        className="absolute inset-x-0 top-1/2 -translate-y-[45%] text-center text-[10px] font-bold text-gray-700 font-sans leading-none"
        style={{ direction: 'rtl' }}
      >
        {toArabicDigits(number)}
      </span>
    </div>
  );
}
