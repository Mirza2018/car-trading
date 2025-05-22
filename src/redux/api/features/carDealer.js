import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

export const carDealer = baseApi.injectEndpoints({
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
    //     },
    // }),
    saleCarList: build.query({
      query: () => {
        return {
          url: `/car/sale_car_list`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.bid],
    }),

    submitListing: build.query({
      query: () => {
        return {
          url: `/submit_listing`,
          method: "GET",
        };
      },
    }),

    offerCarDeal: build.mutation({
      query: (offerCar) => {
        return {
          url: `offer_car/create`,
          method: "POST",
          body: offerCar,
        };
      },
    }),

    buyCar: build.mutation({
      query: (buyCar) => {
        return {
          url: `/car/buy_car`,
          method: "POST",
          body: buyCar,
        };
      },
    }),

    bidCreate: build.mutation({
      query: (bidCreate) => {
        return {
          url: `/bid/create`,
          method: "POST",
          body: bidCreate,
        };
      },
      invalidatesTags: [tagTypes.bid],
    }),

    //end
  }),
});

export const {
  useSaleCarListQuery,
  useSubmitListingQuery,
  useOfferCarDealMutation,
  useBuyCarMutation,
  useBidCreateMutation,
} = carDealer;
