const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require('@aws-sdk/client-s3');

const dotenv = require('dotenv');
dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretKey = process.env.SECRET_ACCESS_KEY;

const S3 = new S3Client({
  credentials: { accessKeyId: accessKey, secretAccessKey: secretKey },
  region: bucketRegion,
});


const getSignedUrlFromS3 = async (key, expiresIn = 3600) => {

  if(key){
    try {
      const getObjectParams = {
        Bucket: process.env.BUCKET_NAME,
        Key: key,
      };
      const command = new GetObjectCommand(getObjectParams);
      return await getSignedUrl(S3, command, { expiresIn });
    } catch (error) {
      throw new Error('Error generating signed URL: ' + error.message);
    }
  }
};

module.exports = {
  getSignedUrlFromS3,
};