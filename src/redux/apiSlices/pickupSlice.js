import { api } from "../api/baseApi";

const pickupSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createPickup: builder.mutation({
      query: () => {
        return {
          url: `/pickup-address/create-pickup-address`,
          method: "POST",
        };
      },
      invalidatesTags: ["Pickup"],
    }),
    updatePickup: builder.mutation({
      query: (data) => {
        return {
          url: `/pickup-address`,
          method: "PATCH",
          body: data,
        };
      },
      invalidatesTags: ["Pickup"],
    }),
    getPickup: builder.query({
      query: () => {
        return {
          url: "/pickup-address",
          method: "GET",
        };
      },
      providesTags: ["Pickup"],
      // transformResponse: ({ data }) => {
      //   return data;
      // },
    }),
  }),
});

export const { useCreatePickupMutation, useUpdatePickupMutation, useGetPickupQuery } = pickupSlice;
