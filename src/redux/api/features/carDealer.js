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
      query: (params) => {
        const { filter, ...rest } = params || {};

        const searchParams = new URLSearchParams();

        // Add other params normally
        Object.entries(rest).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        });

        // Add multiple 'filter' keys if filter is array
        if (Array.isArray(filter)) {
          filter.forEach((f) => {
            if (f) searchParams.append("filter", f);
          });
        } else if (filter) {
          // if filter is a single string
          searchParams.append("filter", filter);
        }

        return {
          url: `/car/sale_car_list?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.sellCarList, tagTypes.contactPaper],
    }),

    submitListing: build.query({
      query: (params) => {
        const { filter, ...rest } = params || {};

        const searchParams = new URLSearchParams();

        // Add other params normally
        Object.entries(rest).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        });

        // Add multiple 'filter' keys if filter is array
        if (Array.isArray(filter)) {
          filter.forEach((f) => {
            if (f) searchParams.append("filter", f);
          });
        } else if (filter) {
          // if filter is a single string
          searchParams.append("filter", filter);
        }

        return {
          url: `/submit_listing?${searchParams.toString()}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.sellCarPrivate, tagTypes.contactPaper],
    }),

    offerCarDeal: build.mutation({
      query: (offerCar) => {
        return {
          url: `offer_car/create`,
          method: "POST",
          body: offerCar,
        };
      },
      invalidatesTags: [tagTypes.sellCarPrivate],
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
      invalidatesTags: [tagTypes.bid, tagTypes.sellCarList],
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
