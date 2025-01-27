import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const isDevelopment = import.meta.env.VITE_ENV === 'development';

const baseUrl = isDevelopment
  ? 'http://localhost:3000'
  : 'https://jibo-backend-seven.vercel.app';

console.log('Environment:', import.meta.env.VITE_ENV); // Log environment
console.log('Base URL:', baseUrl); // Log base URL

export const productApi = createApi({
    reducerPath: 'productApi',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ["Product"],
    endpoints: (builder) => ({
        // Mendapatkan semua produk
        fetchGetAllProducts: builder.query({
            query: () => ({
                url: '/product',
                method: 'GET'
            }),
            transformResponse: (response) => {
                return {
                    products: response.products.map(product => ({
                        ...product,
                        // Gunakan URL langsung dari response
                        image: product.image
                    }))
                };
            },
            providesTags: ['Product']
        }),

        // Mendapatkan produk berdasarkan kategori
        fetchProductsByCategory: builder.query({
            query: (category) => ({
                url: `/product/${category}`,
                method: 'GET'
            }),
            transformResponse: (response) => {
                return {
                    products: response.products.map(product => ({
                        ...product,
                        // Gunakan URL langsung dari response
                        image: product.image
                    }))
                };
            },
            providesTags: ['Product']
        }),

        // Mendapatkan detail produk
        fetchGetProduct: builder.query({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'GET'
            }),
            transformResponse: (response) => ({
                ...response,
                product: {
                    ...response.product,
                    // Gunakan URL langsung dari response
                    image: response.product.image
                }
            }),
            providesTags: ['Product']
        }),

        // Menambahkan produk baru
        createProduct: builder.mutation({
            query: (formData) => ({
                url: '/product',
                method: 'POST',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['Product']
        }),

        // Mengupdate produk
        updateProduct: builder.mutation({
            query: ({ id, formData }) => ({
                url: `/product/${id}`,
                method: 'PUT',
                body: formData,
                formData: true,
            }),
            invalidatesTags: ['Product']
        }),

        // Menghapus produk
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `/product/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Product']
        }),
    }),
});

export const {
    useFetchGetAllProductsQuery,
    useFetchProductsByCategoryQuery,
    useFetchGetProductQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation,
} = productApi;

export default productApi;