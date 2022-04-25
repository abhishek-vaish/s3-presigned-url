"use strict";

const S3 = require("aws-sdk/clients/s3");

module.exports.getPresignedUrl = async (event) => {
  const BUCKET_NAME = process.env.BUCKET_NAME;
  const s3 = new S3();
  try {
    let key = JSON.parse(event.body).key;
    let action = JSON.parse(event.body).action;
    let url = s3.getSignedUrl(action, {
      Bucket: BUCKET_NAME,
      Key: key,
      Expires: 60 * 5,
    });

    return {
      statusCode: 200,
      body: JSON.stringify(url),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e),
    };
  }
};
