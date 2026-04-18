import { Router } from "express";
import db from "../db";

const router = Router();

/**
 * GET /surahs
 * List all surahs (with optional search filter)
 */
router.get("/", (req, res) => {
  const q = req.query.q as string;

  let query = `
    SELECT number, name_ar, name_en, name_transliteration, verses_count
    FROM surahs
  `;

  if (q) {
    query += ` WHERE name_en LIKE ? OR name_transliteration LIKE ? `;
  }

  query += ` ORDER BY number `;

  const surahs = db
    .prepare(query)
    .all(q ? [`%${q}%`, `%${q}%`] : []);

  res.json(surahs);
});

/**
 * GET /surahs/:id
 * Single surah + verses (with optional verse text search)
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;
  const q = req.query.q as string;

  const surah = db
    .prepare(
      `
    SELECT *
    FROM surahs
    WHERE number = ?
  `,
    )
    .get(id);

  if (!surah) {
    return res.status(404).json({ message: "Surah not found" });
  }

  let versesQuery = `
    SELECT number, text_ar, text_en
    FROM verses
    WHERE surah_number = ?
  `;

  if (q) {
    versesQuery += ` AND text_en LIKE ? `;
  }

  versesQuery += ` ORDER BY number `;

  const verses = db
    .prepare(versesQuery)
    .all(q ? [id, `%${q}%`] : [id]);

  res.json({ surah, verses });
});

export default router;
