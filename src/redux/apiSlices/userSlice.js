import { api } from "../api/baseApi";

const userSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    admin: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=ADMIN",
        };
      },
    }),
    users: builder.query({
      query: ({searchTerm, page, limit}) => {
        return {
          method: "GET",
          url: `/users/all-users?searchTerm=${searchTerm}&page=${page}&limit=${limit}`,
        };
      },
      providesTags: ["UserData"],
    }),
    vendors: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/user?role=VENDOR",
        };
      },
    }),
    userById: builder.query({
      query: (id) => {
        return {
          method: "GET",
          url: `/user/profile/${id}`,
        };
      },
    }),
    userBlock: builder.mutation({
      query: (id) => {
        return {
          method: "PATCH",
          url: `/users/blocked/${id}`,
        };
      },
      invalidatesTags: ["UserData"],
    }),
  }),
});

export const {
  useAdminQuery,
  useUsersQuery,
  useVendorsQuery,
  useUserByIdQuery,
  useUserBlockMutation,
} = userSlice;
