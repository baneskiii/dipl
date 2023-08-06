import { apiSlice } from "../../app/api/apiSlice";

export const citiesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCities: builder.query({
      query: () => "/cities",
    }),
  }),
});

export const { useGetCitiesQuery } = citiesApiSlice;
