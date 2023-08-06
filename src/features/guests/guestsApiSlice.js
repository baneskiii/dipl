import { apiSlice } from "../../app/api/apiSlice";

export const guestsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Guests"],
  endpoints: (builder) => ({
    addGuest: builder.mutation({
      query: (guest) => ({
        url: "/guests",
        method: "POST",
        body: guest,
      }),
      invalidatesTags: ["Guests"],
    }),
    getGuests: builder.query({
      query: () => "/guests",
      providesTags: ["Guests"],
    }),
    getGuestsByName: builder.query({
      query: ({ firstName, lastName }) =>
        `/guests/byName?firstName=${firstName}&lastName=${lastName}`,
      providesTags: ["Guests"],
    }),
    getGuest: builder.query({
      query: ({ id }) => `/guests/${id}`,
      providesTags: ["Guests"],
    }),
    deleteGuest: builder.mutation({
      query: ({ id }) => ({
        url: `/guests/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Guests"],
    }),
    updateGuest: builder.mutation({
      query: (guest) => ({
        url: `/guests/${guest.id}`,
        method: "PUT",
        body: guest,
      }),
      invalidatesTags: ["Guests"],
    }),
  }),
});

export const {
  useAddGuestMutation,
  useGetGuestsQuery,
  useGetGuestsByNameQuery,
  useGetGuestQuery,
  useDeleteGuestMutation,
  useUpdateGuestMutation,
} = guestsApiSlice;
