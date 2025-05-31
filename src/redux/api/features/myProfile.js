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
    }),

    //end
  }),
});

export const {
  useProfileQuery,
  useUpdateProfileMutation,
  useStaticContentQuery,
} = myProfile;
