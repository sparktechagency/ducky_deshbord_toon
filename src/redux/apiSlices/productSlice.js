import { api } from "../api/baseApi";

const productSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    allProduct: builder.query({
      query: ({page, limit}) => {
        return {
          url: `/product?page=${page}&limit=${limit}`,
          method: "GET",
        };
      },
      providesTags: ["Product"],
    }),
    getProductById: builder.query({
      query: (id) => {
        return {
          url: `/product/admin/${id}`,
          method: "GET",
        };
      },
    }),
    addProduct: builder.mutation({
      query: (data) => {
        return {
          method: "POST",
          url: "/product/create-product",
          body: data,
        };
      },
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, data }) => {
        return {
          method: "PATCH",
          url: `/product/${id}`,
          body: data,
        };
      },
      invalidatesTags: ["Product"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => {
        return {
          method: "DELETE",
          url: `/product/${id}`,
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useAllProductQuery,
  useGetProductByIdQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productSlice;
