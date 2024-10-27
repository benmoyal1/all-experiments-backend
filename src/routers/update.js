import express from "express";
import handleData from "../awsApi/aws_upload.js";

const router = express.Router();


router.post("/S3", async (req, res) => {
  const body = req.body;
  const expData = body.data;
  const participantGender = body.gender;
  const path = body.path;

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