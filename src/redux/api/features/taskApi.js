import { baseApi } from "../baseApi";

export const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // createOrderTransport: build.mutation({
    //   query: (transportDetails) => {
    //     console.log("order transport", transportDetails);

    //     return {
    //       url: `/order_transport/create`,
    //       method: "POST",
    //       body: transportDetails,
    //     };
    //   },
    // }),
    taskList: build.query({
      query: () => {
        return {
          url: `/task/task_list`,
          method: "GET",
        };
      },
    }),

    //end
  }),
});

export const { useTaskListQuery } = taskApi;
