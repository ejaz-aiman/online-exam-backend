export const uploadFileToS3 = async (params) => {
  const data = await s3.upload(params).promise();
  return data.Location;
};
