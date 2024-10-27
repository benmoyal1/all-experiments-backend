import { S3Client } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
dotenv.config();
import { Readable } from "stream";
import { Upload } from "@aws-sdk/lib-storage";
import { parse } from "json2csv";

// env variables
const bucketName = process.env.BUCKET_NAME;
const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;

// s3 client
const s3 = new S3Client({
  region: region,
  credentials: {
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
  },
});

async function uploadCsvToS3(dataObj, path) {
  // Convert JSON to CSV
  const csv_ = parse(dataObj);

  // Add BOM for UTF-8 encoding
  const csvWithBom = "\ufeff" + csv_;

  // Create a readable stream from the CSV content
  const csvStream = Readable.from([csvWithBom]);

  // Upload the CSV file to S3
  const uploadCsv = new Upload({
    client: s3,
    params: {
      Bucket: bucketName,
      Key: path,
      Body: csvStream,
      ContentType: "text/csv; charset=utf-8",
    },
  });
  return await uploadCsv.done();
}

async function handleData(dataObj, path) {
  try {
    return await uploadCsvToS3(dataObj, path);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
export default handleData;

