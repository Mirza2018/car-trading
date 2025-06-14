import { tagTypes } from "@/redux/tagTypes";
import { baseApi } from "../baseApi";

export const myProfile = baseApi.injectEndpoints({
  endpoints: (build) => ({
    profile: build.query({
      query: () => {
        return { 
          url: `/profile/my_profile`,
          method: "GET",
        };
      },
      providesTags: [tagTypes.privacy, tagTypes.userProfile],
    }),

    staticContent: build.query({
      query: (params) => {
        console.log(params);

        return {
          url: `/static_content?type=${params}`,
          method: "GET",
          // params,
        };
      },
      providesTags: [tagTypes.privacy],
    }),

    staticContentUpdate: build.mutation({
      query: (data) => {
        console.log("privacy", data);

        return {
          url: `/users/update_term_and_privacy`,
          method: "PUT",
          body: data,
        };
      },
      invalidatesTags: [tagTypes.privacy],
    }),

    updateProfile: build.mutation({
      query: (profileInfo) => {
        console.log("hi", profileInfo);
        // return;
        return {
          url: `/profile/update_profile/${profileInfo.userId}`,
          method: "PATCH",
          body: profileInfo.fromData,
        };
      },
      invalidatesTags: [tagTypes.userProfile],
    }),

    //end
  }),
});

export const {
  useProfileQuery,
  useUpdateProfileMutation,
  useStaticContentQuery,
  useStaticContentUpdateMutation,
} = myProfile;
