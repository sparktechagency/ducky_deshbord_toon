import { api } from "../api/baseApi";

const reportSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    allReports: builder.query({
      query: ({page, limit}) => {
        return {
          url: `/report?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useAllReportsQuery } = reportSlice;
