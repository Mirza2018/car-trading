// // For fetchbase query
// import Cookies from "universal-cookie";
// const cookies = new Cookies();
// import { baseApi } from "../baseApi";
// import { decodedToken } from "@/utils/jwt";
// import { tagTypes } from "../../tagTypes";

// const profileUrl = "/user-profile";
// const petProfileUrl = "/pet-profile";

// export const profileApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     //*--------------------------- User Profile ---------------------------*//
//     userProfile: build.query({
//       query: ({ id }) => {
//         return {
//           url: `${profileUrl}/${id}`,
//           method: "GET",
//         };
//       },
//       providesTags: [tagTypes.userProfile],
//     }),
//     createUserProfile: build.mutation({
//       query: (data) => {
//         return {
//           url: `${profileUrl}/add`,
//           method: "POST",
//           body: data,
//         };
//       },
//       invalidatesTags: [tagTypes.userProfile],
//     }),
//     updateUserProfile: build.mutation({
//       query: (data) => {
//         const formData = data?.formData;
//         const id = data?.id;

//         return {
//           url: `${profileUrl}/${id}`,
//           method: "PATCH",
//           body: formData,
//         };
//       },
//       invalidatesTags: [tagTypes.userProfile],
//     }),
//     //*--------------------------- Pets Profile ---------------------------*//
//     petProfile: build.query({
//       query: ({ id }) => {
//         return {
//           url: `${petProfileUrl}/${id}`,
//           method: "GET",
//         };
//       },
//       providesTags: [tagTypes.petProfile],
//     }),
//     createPetProfile: build.mutation({
//       query: (data) => {
//         return {
//           url: `${petProfileUrl}/add`,
//           method: "POST",
//           body: data,
//         };
//       },
//       invalidatesTags: [tagTypes.petProfile],
//     }),
//     updatePetProfile: build.mutation({
//       query: (data) => {
//         const formData = data?.formData;
//         const id = data?.id;

//         return {
//           url: `${petProfileUrl}/${id}`,
//           method: "PATCH",
//           body: formData,
//         };
//       },
//       invalidatesTags: [tagTypes.petProfile],
//     }),
//     //*--------------------------- Nearby Friends ---------------------------*//
//     nearbyFriends: build.query({
//       query: ({ id }) => {
//         return {
//           url: `/near-friends/${id}`,
//           method: "GET",
//         };
//       },
//       providesTags: [tagTypes.userProfile],
//     }),
//   }),
// });

// export const {
//   useUserProfileQuery,
//   useCreateUserProfileMutation,
//   useUpdateUserProfileMutation,
//   usePetProfileQuery,
//   useCreatePetProfileMutation,
//   useUpdatePetProfileMutation,
//   useNearbyFriendsQuery,
// } = profileApi;
