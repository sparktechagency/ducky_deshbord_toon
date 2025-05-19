import { api } from "../api/baseApi";

const earningSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    earnings: builder.query({
      query: ({page, limit}) => {
        return {
          method: "GET",
          url: `/payment?limit=${limit}&page=${page}`,
        };
      },
      invalidatesTags: ["Earnings"],
    }),
    revenueYear: builder.query({
      query: (year) => {
        return {
          method: "GET",
          url: `/payment/all-income-rasio?year=${year}`,
        };
      },
      invalidatesTags: ["Earnings"],
    }),
    revenueDayWeek: builder.query({
      query: (dayWeek) => {
        return {
          method: "GET",
          url: `/payment/all-income-rasio-by-days?days=${dayWeek}`,
        };
      },
      invalidatesTags: ["Earnings"],
    }),
  }),
});

export const { useEarningsQuery, useRevenueYearQuery, useRevenueDayWeekQuery } = earningSlice;
