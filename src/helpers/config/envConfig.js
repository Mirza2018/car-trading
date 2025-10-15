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
  return process.env.NEXT_PUBLIC_BASE_URL || "https://api.engrobasen.dk/api/v1";
};

export const getImageUrl = () => {
  return process.env.NEXT_PUBLIC_IMAGE_URL || "https://api.engrobasen.dk/";
};

export const getSocketUrl = () => {
  return process.env.NEXT_PUBLIC_SOCKET_URL || "http://10.10.10.30:8081";
};
