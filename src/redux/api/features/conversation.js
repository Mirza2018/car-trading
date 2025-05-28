import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

export const conversation = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // createOrderTransport: build.mutation({
    //   query: (transportDetails) => {
    //     console.log("order transport", transportDetails);

    conversation: build.query({
      query: () => {
        return {
          url: `/conversation`,
          method: "GET",
        };
      },
      providesTags: tagTypes.message,
    }),

    singleConversation: build.query({
      query: (id) => {
        return {
          url: `/conversation/message/${id}`,
          method: "GET",
        };
      },
      providesTags: tagTypes.message,
    }),

    createConversation: build.mutation({
      query: (receiverId) => {
        return {
          url: `/conversation/create`,
          method: "POST",
          body: { receiverId },
        };
      },
      invalidatesTags: tagTypes.message,
    }),

    //end
  }),
});

export const {
  useCreateConversationMutation,
  useConversationQuery,
  useSingleConversationQuery,
  useLazySingleConversationQuery
} = conversation;
