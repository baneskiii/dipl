import { apiSlice } from "../../app/api/apiSlice";

export const roomTypesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoomTypes: builder.query({
      query: () => "/roomTypes",
    }),
  }),
});

export const { useGetRoomTypesQuery } = roomTypesApiSlice;
