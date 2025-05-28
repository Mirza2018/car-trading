import { tagTypes } from "@/redux/tagTypes";
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
          url: `/task/my_tasks`,
          method: "GET",
        };
      },
      providesTags: tagTypes.task,
    }),

    taskSolve: build.mutation({
      query: (taskSolve) => {
        return {
          url: `/task_resolve`,
          method: "POST",
          body: taskSolve,
        };
      },
      invalidatesTags: tagTypes.task,
    }),

    //end
  }),
});

export const { useTaskListQuery,useTaskSolveMutation } = taskApi;
