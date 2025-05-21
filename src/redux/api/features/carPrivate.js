import { baseApi } from "../baseApi";

export const carPrivate = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCarInfo: build.query({
      query: ({ license }) => {
        console.log(license);
        return {
          url: `/car/car_info?carNumber=${license}`,
          method: "GET",
        };
      },
    }),

    saleCar: build.mutation({
      query: (carData) => {
        return {
          url: `/car/sale_car`,
          method: "POST",
          body: carData,
        };
      },
    }),

    submitListingCreate: build.mutation({
      query: (carData) => {
        return {
          url: `/submit_listing/create`,
          method: "POST",
          body: carData,
        };
      },
    }),
  }),
});

export const { useGetCarInfoQuery, useLazyGetCarInfoQuery,useSaleCarMutation,useSubmitListingCreateMutation } = carPrivate;
