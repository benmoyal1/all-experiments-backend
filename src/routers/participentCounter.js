import express from "express";
import handleData from "../awsApi/aws_upload.js";
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

router.post("/sendDataToS3", async (req, res) => {
  const receivedData = req.body;
  const expData = receivedData.data;
  const participantGender = receivedData.gender;
  const path = receivedData.path;

  try {
    const bucketRes = await handleData(expData, path);
    const setGender =
      participantGender === "male" ? "maleCounter" : "femaleCounter";
    const updateGenderCounter = (await kv.get(setGender)) + 1;
    await kv.set(setGender, updateGenderCounter);
    res.json(bucketRes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to upload data to S3" });
  }
});
export default router;
