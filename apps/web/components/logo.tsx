import Image from "next/image";

export const Logo = () => (
  <div className="flex items-center gap-3">
    <Image src="/logo.svg" alt="Quran Mazid Logo" height={40} width={40} />

    <div>
      <h1 className="text-lg font-semibold text-gray-800 font-sans">
        Quran Mazid
      </h1>
      <p className="text-xs text-gray-500">Read, Study, and Learn The Quran</p>
    </div>
  </div>
);
