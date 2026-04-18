import { Router } from "express";
import db from "../db";

const router = Router();

/**
 * GET /audio
 * Get all audio recitations
 */
router.get("/", (_req, res) => {
  const audio = db
    .prepare(
      `
    SELECT 
      id,
      surah_number,
      reciter_en,
      reciter_ar,
      rewaya_en,
      rewaya_ar,
      link
    FROM audio
  `,
    )
    .all();

  res.json(audio);
});

/**
 * GET /audio/:surahId
 * Get all reciters for a surah
 */
router.get("/:surahId", (req, res) => {
  const { surahId } = req.params;

  const audio = db
    .prepare(
      `
    SELECT 
      id,
      surah_number,
      reciter_en,
      reciter_ar,
      rewaya_en,
      rewaya_ar,
      link
    FROM audio
    WHERE surah_number = ?
  `,
    )
    .all(surahId);

  res.json(audio);
});

export default router;
