import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

export const privateDashboard = baseApi.injectEndpoints({
  endpoints: (build) => ({
    sellCar: build.query({
      query: (params) => {
        console.log(params);
        return {
          url: `/sell_car`,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.sellCar],
    }),

    offerCar: build.query({
      query: () => {
        // console.log(filter);
        return {
          url: `/offer_car`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.offer],
    }),

    offerCarAction: build.mutation({
      query: (offerCar) => {
        console.log(offerCar, "i am from");
        return {
          url: `/offer_car/action`,
          method: "PATCH",
          body: offerCar,
        };
      },
      invalidatesTags: [tagTypes.offer,tagTypes.sellCarPrivate],
    }),

    bidCarDetails: build.query({
      query: (params) => {
        // console.log(filter);
        return {
          url: `/bid`,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.bid],
    }),

    bidCarAction: build.mutation({
      query: (bidCar) => {
        // console.log(filter);

        return {
          url: `/bid/action`,
          method: "PATCH",
          body: bidCar,
        };
      },
      invalidatesTags: [tagTypes.bid, tagTypes.sellCar],
    }),

    offerCarList: build.query({
      query: (params) => {
        // console.log(filter);
        return {
          url: `/offer_car/my_list`,
          method: "GET",
          params,
        };
      },
      providesTags: [tagTypes.offer],
    }),

    userCarsDetails: build.query({
      query: (data) => {
        console.log(data);
        // return;
        return {
          url: `/users/private_user_total_car/${data.id}`,
          method: "GET",
          params: data.filters,
        };
      },
      providesTags: [tagTypes.allCar],
    }),
    // end
  }),
});

export const {
  useSellCarQuery,
  useOfferCarQuery,
  useOfferCarActionMutation,
  useBidCarDetailsQuery,
  useBidCarActionMutation,
  useOfferCarListQuery,
  useUserCarsDetailsQuery,
} = privateDashboard;
