import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
    res.json({
      Status: "We are Good"});
     })

export default router;