import { api } from "../api/baseApi";

const faqSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    faqs: builder.query({
      query: () => {
        return {
          method: "GET",
          url: `/faq`,
        };
      },
      invalidatesTags: ["faqs"],
    }),
    newFaq: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: `/faq/create-faq`,
          body: data,
        };
      },
      invalidatesTags: ["faqs"],
    }),
    updateFaq: builder.mutation({
      query: ({id, data}) => {
        return {
          method: "PATCH",
          url: `/faq/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["faqs"],
    }),
    deleteFaq: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/faq/${id}`,
        };
      },
      invalidatesTags: ["faqs"],
    }),
  }),
});

export const { useFaqsQuery, useUpdateFaqMutation, useDeleteFaqMutation, useNewFaqMutation } = faqSlice;
