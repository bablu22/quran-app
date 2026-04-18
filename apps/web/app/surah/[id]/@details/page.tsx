import SurahReadingMain from "@/components/surah/SurahReadingMain";
import { getSurahData } from "@/lib/quran";
import { notFound } from "next/navigation";

export default async function DetailsSlot({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surahData = await getSurahData(id);

  if (!surahData) {
    notFound();
  }

  return (
    <SurahReadingMain 
      currentSurah={surahData.surah} 
      verses={surahData.verses} 
    />
  );
}
