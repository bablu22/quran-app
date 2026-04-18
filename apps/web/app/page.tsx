import { HeroSection } from "@/components/hero";
import Quran from "@/components/quran/Quran";
import { getSurahs } from "@/lib/quran";

export default async function Home() {
  const surahs = await getSurahs();

  return (
    <>
      <HeroSection />
      <Quran surahs={surahs} />
    </>
  );
}
