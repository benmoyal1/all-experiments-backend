import express from "express";
import { kv } from "@vercel/kv";

const router = express.Router();

// Reset the counters to zero or initial state
router.post("/resetKV", async (req, res) => {
  try {
    await kv.set("maleCounter", 0);
    await kv.set("femaleCounter", 0);
    res.json({ message: "Counters have been reset successfully." });
  } catch (error) {
    console.error("Error resetting counters:", error);
    res.status(500).json({ error: "Failed to reset counters." });
  }
});
// updates male and femal counter 
router.post("/updateCounter", async (req, res) => {
  try {
    // Update male counter
    let maleCounter = await kv.get('maleCounter');
    const updatedMaleCounter = maleCounter + 1;
    await kv.set('maleCounter', updatedMaleCounter);

    // Update female counter
    let femaleCounter = await kv.get('femaleCounter');
    const updatedFemaleCounter = femaleCounter + 1;
    await kv.set('femaleCounter', updatedFemaleCounter);

    res.json({
      message: "Male Counter: " + updatedMaleCounter + ", Female Counter: " + updatedFemaleCounter
    });
  } catch (error) {
    console.error("Error updating counters:", error);
    res.status(500).json({ error: "Failed to update counters." });
  }
});

export default router;
