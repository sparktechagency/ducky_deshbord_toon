import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query({
      query: ({ page, limit, trackUrl="" }) => {
        console.log(trackUrl);
        return {
          method: "GET",
          url: trackUrl !== "false" ? `/order?limit=${limit}&page=${page}` : `/order?limit=${limit}&page=${page}&trackUrl=${trackUrl}`,
        };
      },
      invalidatesTags: ["Orders"],
    }),

    retryOrder: builder.mutation({
      query: ({id, data}) => {
        return {
          method: "PATCH",
          url: `/order/update/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["Orders"],
    }),

    orderStatus: builder.mutation({
      query: ({id, status}) => {
        return {
          method: "PATCH",
          url: `/order/${id}?status=${status}`,
        };
      },
      invalidatesTags: ["Orders"],
    }),

    orderProgress: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/dashboard/order-progress",
        };
      },
    }),
  }),
});

export const { useOrdersQuery, useOrderProgressQuery, useRetryOrderMutation, useOrderStatusMutation } = orderSlice;
