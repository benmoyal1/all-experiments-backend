import dotenv from "dotenv";
import express from "express";
import dataRouter from "./routers/participentCounter.js"; 
import homeRouter from "./routers/home.js";
import resetRouter from "./routers/reset.js";
import updateRouter from "./routers/update.js";
import bodyParser from "body-parser";
import { resetExpDate,showAllKVs,addKeyValueToKVs,deleteKey,increaseExpSubjectByOne } from "./KVApi/kvApi.js";
dotenv.config();
const app = express();
const PORT = 3000;

app.use(bodyParser.json()); // Parse JSON requests

// routers 
app.use('/',homeRouter);
app.use('/data',dataRouter);
app.use('/reset',resetRouter);
app.use('/update',updateRouter);

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);
  showAllKVs();
});

