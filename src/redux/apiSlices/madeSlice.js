import { api } from "../api/baseApi";

const madeSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    allMade: builder.query({
      query: ({page, limit}) => {
        return {
          url: `/how-made?page=${page}&limit=${limit}?`,
          method: "GET",
        };
      },
      providesTags: ["HowMade"],
    }),
    getMadeById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/how-made/${id}`,
        };
      },
    }),
    addMade: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/how-made/create-made",
          body: data,
        };
      },
      invalidatesTags: ["HowMade"],
    }),
    updateMade: builder.mutation({
      query: ({ id, data }) => {
        return {
          method: "PATCH",
          url: `/how-made/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteMade: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/how-made/${id}`,
        };
      },
      invalidatesTags: ["HowMade"],
    }),
  }),
});

export const {
  useAllMadeQuery,
  useGetMadeByIdQuery,
  useAddMadeMutation,
  useUpdateMadeMutation,
  useDeleteMadeMutation,
} = madeSlice;
