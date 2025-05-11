// import { tagTypes } from "@/redux/tagTypes";
// import { baseApi } from "../baseApi";

// const shelterUrl = "/shelter";

// const shelterApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     createShelter: build.mutation({
//       query: (data) => ({
//         url: `${shelterUrl}/add`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: [tagTypes.shelter],
//     }),
//     getAllShelter: build.query({
//       query: ({ page }) => ({
//         url: `${shelterUrl}/?page=${page}&limit=12`,
//         method: "GET",
//       }),
//       providesTags: [tagTypes.shelter],
//     }),
//     updateShelter: build.mutation({
//       query: (data) => {
//         const formData = data?.formData;
//         const id = data?.id;

//         return {
//           url: `${shelterUrl}/${id}`,
//           method: "PATCH",
//           body: formData,
//         };
//       },
//       invalidatesTags: [tagTypes.shelter],
//     }),
//     deleteShelter: build.mutation({
//       query: (id) => ({
//         url: `${shelterUrl}/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: [tagTypes.shelter],
//     }),
//   }),
// });

// export const {
//   useCreateShelterMutation,
//   useGetAllShelterQuery,
//   useUpdateShelterMutation,
//   useDeleteShelterMutation,
// } = shelterApi;
