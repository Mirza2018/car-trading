// export const getBaseUrl = () => {
//   return process.env.NEXT_PUBLIC_BASE_URL;
// };

// export const getImageUrl = () => {
//   return process.env.NEXT_PUBLIC_IMAGE_URL ;
// };

// export const getSocketUrl = () => {
//   return process.env.NEXT_PUBLIC_SOCKET_URL ;
// };


export const getBaseUrl = () => {
  return process.env.NEXT_PUBLIC_BASE_URL || "http://10.10.10.30:8080/api/v1";
};

export const getImageUrl = () => {
  return process.env.NEXT_PUBLIC_IMAGE_URL || "http://10.10.10.30:8080/";
};

export const getSocketUrl = () => {
  return process.env.NEXT_PUBLIC_SOCKET_URL || "http://10.10.10.30:8081";
};
