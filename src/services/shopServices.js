import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseUrl } from '../database/realtimeDatabase'

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: baseUrl }),
    tagTypes: ['profileImageGet'],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories.json`
        }),
        getProductsByCategory: builder.query({
            query: (category) => `products.json?orderBy="category"&equalTo="${category}"`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response)
                return responseTransformed
            }
        }),
        getProductById: builder.query({
            query: (productId) => `products.json?orderBy="id"&equalTo=${productId}`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response)
                if (responseTransformed.length) return responseTransformed[0]
                return null
            }
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`,
            providesTags: ['profileImageGet']
        }),
        //We make a PUT request for not creating additional key, because de localId is already an unique key.
        postProfileImage: builder.mutation({
            query: ({ image, localId }) => ({
                url: `profileImages/${localId}.json`,
                method: "PUT",
                body: {
                    image: image
                },
            }),
            invalidatesTags: ['profileImageGet'] //Invalidates will trigger a refetch on profileImageGet
        }),
        postOrder: builder.mutation({
            query: (order) => ({
                url: 'orders.json',
                method: 'POST',
                body: {
                    ...order,
                    "timestamp": new Date().getTime()
                }
            })
        }),
        getOrdersByUser: builder.query({
            query: (email) => `orders.json`,
            transformResponse: (response) => {
                const responseTransformed = Object.values(response)
                if (responseTransformed.length) 
                    return responseTransformed
                return null
            }
        })
    })
})

export const { useGetCategoriesQuery,
    useGetProductByIdQuery,
    useGetProductsByCategoryQuery,
    useGetProfileImageQuery,
    usePostProfileImageMutation,
    usePostOrderMutation,
    useGetOrdersByUserQuery
} = shopApi