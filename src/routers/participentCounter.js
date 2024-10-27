import express from "express";
import { kv } from "@vercel/kv";

const router = express.Router();
router.post("/participantCounter", async (req, res) => {
  const { exp } = req.body; // Extract exp from request body
  try {
    const participantsDict = await kv.get(exp); // Fetch participants data
    res.json({
      maleCounter: participantsDict.maleCounter,
      femaleCounter: participantsDict.femaleCounter,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


export default router;
