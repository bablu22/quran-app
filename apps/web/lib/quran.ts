export async function getSurahs() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahs`, {
    cache: "force-cache",
  });
  if (!res.ok) return [];
  return res.json();
}

export async function getSurahData(id: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/surahs/${id}`, {
    cache: "force-cache",
  });
  if (!res.ok) return null;
  return res.json();
}
