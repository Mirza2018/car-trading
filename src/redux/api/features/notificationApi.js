import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

export const notifcationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllnotification: build.query({
      query: () => ({
        url: `/notification/my_notifications`,
        method: "GET",
      }),
      providesTags: [tagTypes.notification],
    }),
    getAllnotificationCount: build.query({
      query: () => ({
        url: `/notification/notification_count`,
        method: "GET",
      }),
      providesTags: [tagTypes.notificationCount],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // console.log("getAllnotificationCount response:", data);
        } catch (error) {
          console.error("getAllnotificationCount error:", error);
        }
      },
    }),

    notificationAction: build.mutation({
      query: () => ({
        url: `/notification/action`,
        method: "PATCH",
      }),
      // invalidatesTags: [tagTypes.notificationCount, tagTypes.notification],
    }),
  }),
});

export const {


  useGetAllnotificationQuery,
  useLazyGetAllnotificationQuery,
  useGetAllnotificationCountQuery,
  useNotificationActionMutation
} = notifcationApi;
