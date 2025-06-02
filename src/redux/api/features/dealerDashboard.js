import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

export const dealerDashboard = baseApi.injectEndpoints({
  endpoints: (build) => ({
    totalPurchasedCars: build.query({
      query: (params) => {
        // console.log(filter);
        return {
          url: `/car/total_purchased_cars`,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.purchasedCar],
    }),
    contactPaper: build.query({
      query: (id) => {
        // console.log(filter);
        return {
          url: `/car/contact_paper/${id}`,
          method: "GET",
        };
      },
      // providesTags: [tagTypes.offer],
    }),

    orderTransport: build.mutation({
      query: (orderTransport) => {
        return {
          url: `/users/order-transport`,
          method: "POST",
          body: orderTransport,
        };
      },
      // invalidatesTags: [tagTypes.offer],
    }),
    orderTransportCreate: build.mutation({
      query: (orderTransportCreate) => {
        return {
          url: `/order_transport/create`,
          method: "POST",
          body: orderTransportCreate,
        };
      },
      // invalidatesTags: [tagTypes.offer],
    }),

    // end
  }),
});

export const {
useTotalPurchasedCarsQuery
} = dealerDashboard;
