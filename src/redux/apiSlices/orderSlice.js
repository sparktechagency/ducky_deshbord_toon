import { api } from "../api/baseApi";

const orderSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    orders: builder.query({
      query: ({ page, limit }) => {
        return {
          method: "GET",
          url: `/order?page=${page}&limit=${limit}`,
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

export const { useOrdersQuery, useOrderProgressQuery, useOrderStatusMutation } = orderSlice;
