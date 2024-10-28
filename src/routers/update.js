import express from "express";
import handleData from "../awsApi/aws_upload.js";
import { increaseExpSubjectByOne } from "../KVApi/kvApi.js";
const router = express.Router();


router.post("/S3", async (req, res) => {
  const body = req.body;

  // params for handle data
  const expData = body.data;
  const path = body.path;
// params for increseExpSubjecytByOne
  const expName = body.expName;
  const participantGender = body.gender;

  try {
    const bucketRes = await handleData(expData, path);
    console.log("Data Uploaded to S3")
    console.log(participantGender);
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