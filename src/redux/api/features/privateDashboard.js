import { clearSignUpToken } from "@/redux/slices/authSlice";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tagTypes";

export const privateDashboard = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // getCarInfo: build.query({
    //   query: ({ license }) => {
    //     console.log(license);
    //     return {
    //       url: `/car/car_info?carNumber=${license}`,
    //       method: "GET",
    //     };
    //   },
    // }),
    // saleCar: build.mutation({
    //   query: (carData) => {
    //     return {
    //       url: `/car/sale_car`,
    //       method: "POST",
    //       body: carData,
    //     };
    //   },
    // }),
    sellCar: build.query({
      query: (params) => {
        console.log(params);
        return {
          url: `/sell_car`,
          method: "GET",
          params,
        };
      },
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
        console.log(offerCar, "i am fro");
        return {
          url: `/offer_car/action`,
          method: "PATCH",
          body: offerCar,
        };
      },
      invalidatesTags: [tagTypes.offer],
    }),

    bidCarDetails: build.query({
      query: (params) => {
        // console.log(filter);
        return {
          url: `/bid`,
          method: "GET",
          params
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
      invalidatesTags: [tagTypes.bid],
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
      // providesTags: [tagTypes.bid],
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
  useOfferCarListQuery
} = privateDashboard;
