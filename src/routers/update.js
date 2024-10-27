import express from "express";
import handleData from "../awsApi/aws_upload.js";
import { increaseExpSubjectByOne } from "../KVApi/kvApi.js";
const router = express.Router();


router.post("/S3", async (req, res) => {
  const body = req.body;
  const expName = body.expName;
  const expData = body.data;
  const participantGender = body.gender;
  const path = body.path;

  try {
    const bucketRes = await handleData(expData, path);
    const setGender =
      participantGender === "male" ? "maleCounter" : "femaleCounter";
    increaseExpSubjectByOne(expName,setGender);
    res.json(bucketRes);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to upload data to S3" });
  }
});
export default router;