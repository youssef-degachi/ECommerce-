// import { createProduct, deleteProduct } from "../../../backend/controllers/produ ctController";
import { PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";


export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword, pageNumber }) => ({
            url: PRODUCT_URL,
            params: { keyword, pageNumber },
        }),
        // how many time will refetched before cleaning cache automatically
        //!: it's normal to remove this once but cache will save old data and make my web site take longer reload
        // will ne full of not important data 
        keepUnusedDataFor: 5,
        // providesTags property to specify the tags that will be used to cache the data returned by this endpoint
        providesTags: ['Products'],
        }),

        getProductsDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor: 5,
        }),
    
        createProduct: builder.mutation({
            query: () => ({
                url: `${PRODUCT_URL}`,
                method: 'POST',
            }),
            // invalidatesTags property to specify that the data for this endpoint should be invalidated (refetched) when the 'Product' tag is updated

            invalidatesTags: ['Product'],
        }),

        updateProduct: builder.mutation({
            query: (data) => ({
            url: `${PRODUCT_URL}/${data.productId}`,
            method: 'PUT',
            body: data,
        }),invalidatesTags: ['Products'],
    }),

    uploadProductImage: builder.mutation({
        query: (data) => ({
            url: `${UPLOAD_URL}`,
            method: 'POST',
            body: data,
            }),
        }),

    deleteProduct: builder.mutation({
        query: (productId) => ({
            url: `${PRODUCT_URL}/${productId}`,
            method: 'DELETE',
        }),
        providesTags: ['Product'],
    }),


    createReview: builder.mutation({
        query: (data) => ({
                    url: `${PRODUCT_URL}/${data.productId}/reviews`,
                    method: 'POST',
                    body: data,
                }),
                invalidatesTags: ['Product'],
    })

    }),// last arrow
})

export const { useGetProductsQuery , useGetProductsDetailsQuery, useCreateProductMutation, useUpdateProductMutation,useUploadProductImageMutation,useDeleteProductMutation,useCreateReviewMutation } = productsApiSlice;
