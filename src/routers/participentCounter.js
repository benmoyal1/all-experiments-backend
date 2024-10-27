import express from "express";
import { kv } from "@vercel/kv";

const router = express.Router();

router.get("/participantCounter", async (req, res) => {
  const { gender, exp } = req.query; // Extract gender and exp from query parameters
  const participantsDict = await kv.get(exp);
  try {
    res.json({
      maleCounter: participantsDict.maleCounter,
      femaleCounter : participantsDict.femaleCounter,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
