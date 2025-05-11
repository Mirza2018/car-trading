// import { tagTypes } from "@/redux/tagTypes";
// import { baseApi } from "../baseApi";

// const productUrl = "/products";

// const productApi = baseApi.injectEndpoints({
//   endpoints: (build) => ({
//     createProduct: build.mutation({
//       query: (data) => ({
//         url: `${productUrl}/add`,
//         method: "POST",
//         body: data,
//       }),
//       invalidatesTags: [tagTypes.product],
//     }),

//     //   getAllProduct: builder.query({
//     //     query: ({ page, searchTerm }) => {
//     //         return {
//     //             url: `/products/get-all?page=${page}&searchTerm=${searchTerm}`,
//     //             method: "GET"
//     //         }
//     //     },
//     //     providesTags: ['AllProduct']
//     // }),
//     getAllProduct: build.query({
//       query: ({ page }) => ({
//         url: `${productUrl}/?page=${page}&limit=12`,
//         method: "GET",
//       }),
//       providesTags: [tagTypes.product],
//     }),
//     updateProduct: build.mutation({
//       query: (data) => {
//         const formData = data?.formData;
//         const id = data?.id;

//         return {
//           url: `${productUrl}/${id}`,
//           method: "PATCH",
//           body: formData,
//         };
//       },
//       invalidatesTags: [tagTypes.product],
//     }),
//     deleteProduct: build.mutation({
//       query: (id) => ({
//         url: `${productUrl}/${id}`,
//         method: "DELETE",
//       }),
//       invalidatesTags: [tagTypes.product],
//     }),
//   }),
// });

// export const {
//   useCreateProductMutation,
//   useGetAllProductQuery,
//   useUpdateProductMutation,
//   useDeleteProductMutation,
// } = productApi;
