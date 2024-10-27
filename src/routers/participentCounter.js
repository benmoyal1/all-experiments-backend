import express from "express";
import { kv } from "@vercel/kv";

const router = express.Router();

router.get("/participantCounter", async (req, res) => {
  try {
    res.json({
      maleCounter: await kv.get("maleCounter"),
      femaleCounter: await kv.get("femaleCounter"),
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
