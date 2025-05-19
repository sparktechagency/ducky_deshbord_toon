import { api } from "../api/baseApi";

const shippingSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createShipping: builder.mutation({
      query: (id) => {
        return {
          method: "POST",
          url: `/shipping/create-shipping`,
          body: { "orderId": id }
        };
      },
      invalidatesTags: ["Shippings"],
    }),
    allShipping: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/shipping",
        };
      },
      invalidatesTags: ["Shippings"],
    }),
    singleShipping: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/shipping/${id}`,
        };
      },
      invalidatesTags: ["Shippings"],
    }),
    deleteShipping: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/shipping/${id}`
        };
      },
      invalidatesTags: ["Shippings"],
    }),
    createBookingShipment: builder.mutation({
      query: (id) => {
        return {
          method: "POST",
          url: `/shipping/create-shipping-request/${id}`,
        };
      },
      invalidatesTags: ["Shippings"],
    }),
    allBookingShipment: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/shipping/request`,
        };
      },
      invalidatesTags: ["Shippings"],
    }),
  }),
});

export const { useCreateShippingMutation, useAllShippingQuery, useSingleShippingQuery, useDeleteShippingMutation, useCreateBookingShipmentMutation, useAllBookingShipmentQuery } = shippingSlice;
