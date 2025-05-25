import { baseApi } from "../baseApi";

export const orderTransport = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createOrderTransport: build.mutation({
      query: (transportDetails) => {
        console.log("order transport", transportDetails);

        return {
          url: `/order_transport/create`,
          method: "POST",
          body: transportDetails,
        };
      },
    }),

    //end
  }),
});

export const { useCreateOrderTransportMutation } = orderTransport;
