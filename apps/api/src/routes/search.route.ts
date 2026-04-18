import { Router } from "express";
import db from "../db";

const router = Router();

/**
 * GET /search?q=word
 */
router.get("/", (req, res) => {
  const q = req.query.q as string;

  if (!q) return res.json([]);

  const results = db
    .prepare(
      `
    SELECT 
      v.surah_number, 
      v.number as verse_number, 
      v.text_en, 
      v.text_ar,
      s.name_transliteration as surah_name,
      s.revelation_place_en as revelation_place
    FROM verses v
    JOIN surahs s ON v.surah_number = s.number
    WHERE v.text_en LIKE ?
    LIMIT 20
  `,
    )
    .all(`%${q}%`);

  res.json(results);
});

export default router;
