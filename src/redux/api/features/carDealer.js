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

    //end
  }),
});

export const { useSaleCarListQuery,useSubmitListingQuery,useOfferCarDealMutation,useBuyCarMutation } = carDealer;
