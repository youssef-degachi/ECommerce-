import { apiSlice} from './apiSlice';
import { ORDERS_URL } from '../constants';

export const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
        query: (order) =>({
          url: ORDERS_URL,
          method: 'POST',
          body: {...order},
        }),
      }),
      
      
      getOrderDetails: builder.query({
        query: (id) => ({
          url: `${ORDERS_URL}/${id}`,
        }),
        // how many time will refetched before cleaning cache automatically
        //!: it's normal to remove this once but cache will save old data and make my web site take longer reload
        // will ne full of not important data 
        keepUnusedDataFor: 5,
      }),

      payOrder: builder.mutation({
        query: ({ orderId, details }) => ({
          url: `${ORDERS_URL}/${orderId}/pay`,
          method: 'PUT',
          body: details,
        }),
      }),

      getMyOrders: builder.query({
        query: () => ({
          url: `${ORDERS_URL}/mine`,
        }),
        // how many time will refetched before cleaning cache automatically
        keepUnusedDataFor: 5,
      }),


    getOrders: builder.query({
      query: () => ({
        url: ORDERS_URL,
        method: 'GET',
      }),keepUnusedDataFor: 5,
    }),



    // todo: add paid and deliver
    deliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'PUT',
      }),
    }),
    paidOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/paid`,
        method: 'PUT',
      }),
    }),


    // todo: remove from paid and deliver
    notDeliverOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/deliver`,
        method: 'Post',
      }),
    }),
    notPaidOrder: builder.mutation({
      query: (orderId) => ({
        url: `${ORDERS_URL}/${orderId}/paid`,
        method: 'Post',
      }),
    }),



  })
});

export const { useCreateOrderMutation,
  useGetMyOrdersQuery,
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetOrdersQuery,

  useDeliverOrderMutation,
  usePaidOrderMutation,
  useNotDeliverOrderMutation,
  useNotPaidOrderMutation,

  
} =orderApiSlice;