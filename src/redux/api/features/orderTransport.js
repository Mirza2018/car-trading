import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

export const orderTransport = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrderTransport: build.query({
      query: () => {
        return {
          url: `/order_transport`,
          method: "GET",
        };
      },
      providesTags: tagTypes.order,
    }),

    createOrderTransport: build.mutation({
      query: (transportDetails) => {
        console.log("order transport", transportDetails);

        return {
          url: `/order_transport/create`,
          method: "POST",
          body: transportDetails,
        };
      },
      invalidatesTags: tagTypes.order,
    }),

    SendMailOrderTransport: build.mutation({
      query: (transportDetails) => {
        console.log("order transport", transportDetails);
        return {
          url: `/users/order-transport`,
          method: "POST",
          body: transportDetails,
        };
      },
      invalidatesTags: tagTypes.order,
    }),

    //end
  }),
});

export const {
  useCreateOrderTransportMutation,
  useSendMailOrderTransportMutation,
  useGetOrderTransportQuery
} = orderTransport;
