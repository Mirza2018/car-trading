export const getBaseUrl = () => {
  return process.env.NEXT_BASE_URL || "http://182.252.68.227:8010/api/v1";
};

export const getImageUrl = (key) => {
  return process.env.NEXT_IMAGE_URL || "http://182.252.68.227:8010/";
};
