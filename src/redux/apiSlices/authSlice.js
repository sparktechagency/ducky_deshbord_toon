import { api } from "../api/baseApi";

const authSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/forgot-password-otp",
          body: data,
        };
      },
    }),
    resendOtp: builder.mutation({
      query: () => {
        return {
          method: "PATCH",
          url: "/otp/resend-otp",
          headers: {
            token: localStorage.getItem("toon_forgot_password_token"),
          },
        };
      },
    }),
    otpVerify: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/auth/forgot-password-otp-match",
          body: data,
          headers: {
            token: localStorage.getItem("toon_forgot_password_token"),
          },
        };
      },
    }),
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/auth/forgot-password-reset",
          body: data,
          headers: {
            token: localStorage.getItem("toon_reset_password_token"),
          },
        };
      },
    }),
    
    // -------------------Login mutation -------------------//
    login: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/login",
          body: data,
        };
      },
      transformResponse: (data) => {
        return data;
      },
      transformErrorResponse: ({ data }) => {
        const { message } = data;
        return message;
      },
    }),

    changePassword: builder.mutation({
      query: (value) => {
        return {
          method: "PATCH",
          url: "/auth/change-password",
          body: value,
        };
      },
      invalidatesTags: ["AdminData"],
    }),

    updateProfile: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/auth/update-profile",
          body: data,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      invalidatesTags: ["AdminData"],
    }),
    updateAdminProfile: builder.mutation({
      query: (data) => {
        return {
          method: "PATCH",
          url: "/users/update-my-profile",
          body: data,
        };
      },
      invalidatesTags: ["AdminData"],
    }),

    profile: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/auth/get-profile",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };
      },
      providesTags: ["AdminData"],

      transformResponse: ({ user }) => {
        return user;
      },
    }),
    fetchAdminProfile: builder.query({
      query: () => {
        return {
          method: "GET",
          url: "/users/my-profile",
        };
      },
    }),
  }),
});

export const {
  useForgotPasswordMutation,
  useResendOtpMutation,
  useOtpVerifyMutation,
  useResetPasswordMutation,
  useLoginMutation,
  useChangePasswordMutation,
  useUpdateProfileMutation,
  useProfileQuery,
  useUpdateAdminProfileMutation,
  useFetchAdminProfileQuery,
} = authSlice;
