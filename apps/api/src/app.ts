import express from "express";
import cors from "cors";

import surahRoutes from "./routes/surah.route";
import verseRoutes from "./routes/verse.route";
import searchRoutes from "./routes/search.route";
import audioRoutes from "./routes/audio.route";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/surahs", surahRoutes);
app.use("/verses", verseRoutes);
app.use("/search", searchRoutes);
app.use("/audio", audioRoutes);

app.get("/", (_req, res) => {
  res.json({ message: "Welcome to the Al-Quran API" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
