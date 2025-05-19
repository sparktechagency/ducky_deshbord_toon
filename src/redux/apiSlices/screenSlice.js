import { api } from "../api/baseApi";

const screenSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    updateScreen: builder.mutation({
      query: (data) => {
        return {
          url: `/setting`,
          method: "PATCH",
          body: data,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
    }),
    screen: builder.query({
      query: (userType) => {
        return {
          url: `/setting`,
          method: "GET",
        };
      },
      transformResponse: ({ data }) => {
        return data;
      },
    }),
  }),
});

export const { useUpdateScreenMutation, useScreenQuery } =  screenSlice;
