import { Router } from "express";
import db from "../db";

const router = Router();

/**
 * GET /verses/:surahId
 */
router.get("/:surahId", (req, res) => {
  const { surahId } = req.params;

  const verses = db
    .prepare(
      `
    SELECT number, text_ar, text_en
    FROM verses
    WHERE surah_number = ?
    ORDER BY number
  `,
    )
    .all(surahId);

  res.json(verses);
});

export default router;
