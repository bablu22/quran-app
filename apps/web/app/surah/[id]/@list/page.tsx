import SurahListSidebar from "@/components/surah/SurahListSidebar";
import { getSurahs } from "@/lib/quran";

export async function generateStaticParams() {
  const surahs = await getSurahs();
  return surahs.map((surah: { number: number }) => ({
    id: surah.number.toString(),
  }));
}

export default async function ListSlot({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const surahs = await getSurahs();

  return <SurahListSidebar surahs={surahs} currentSurahNumber={parseInt(id)} />;
}
