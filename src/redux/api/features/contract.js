import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

export const contract = baseApi.injectEndpoints({
  endpoints: (build) => ({
    contactPaper: build.query({
      query: (ContactPaper) => {
        console.log(ContactPaper);
        return {
          url: `/car/contact_paper/${ContactPaper}`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.contactPaper],
    }),

    updateContactPaper: build.mutation({
      query: ({ ContactPaper, ContactData }) => {
        console.log("ContactPaper", ContactPaper);
        console.log("ContactData", ContactData);

        return {
          url: `/sell_car/update_contact_paper/${ContactPaper}`,
          method: "PATCH",
          body: ContactData,
        };
      },
      invalidatesTags: [
        tagTypes.sellCar,
        tagTypes.contactPaper,
        tagTypes.purchasedCar,
        tagTypes.offer,
        tagTypes.purchasedCar
      ],
    }),

    updateOfferContactPaper: build.mutation({
      query: ({ ContactPaper, ContactData }) => {
        console.log("ContactPaper", ContactPaper);
        console.log("ContactData", ContactData);
        return {
          url: `/offer_car/update_offer_car/${ContactPaper}`,
          method: "PATCH",
          body: ContactData,
        };
      },
      invalidatesTags: [tagTypes.offer, tagTypes.sellCar, tagTypes.offer,tagTypes.purchasedCar],
    }),

    //end
  }),
});

export const {
  useContactPaperQuery,
  useUpdateContactPaperMutation,
  useUpdateOfferContactPaperMutation,
} = contract;
