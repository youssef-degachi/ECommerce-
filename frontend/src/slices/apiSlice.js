import { createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '../constants';

// Create a base query using the fetchBaseQuery function

const baseQuery = fetchBaseQuery({baseUrl: BASE_URL});

// Create an API slice using the createApi function
export const apiSlice = createApi({
    // Pass the base query to the baseQuery property of the options object

    baseQuery,

    // Pass the tagTypes property to specify the different types of resources that will be managed by the slice
    tagTypes: ['Product', 'Order', 'User'],

    // Pass the endpoints property to define the different endpoints that will be available for the slice
    endpoints: (builder) => ({}),


});