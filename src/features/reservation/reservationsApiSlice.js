import { apiSlice } from "../../app/api/apiSlice";

export const reservationsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Reservations"],
  endpoints: (builder) => ({
    addReservation: builder.mutation({
      query: (reservation) => ({
        url: "/reservations",
        method: "POST",
        body: reservation,
      }),
      invalidatesTags: ["Reservations"],
    }),
    getReservations: builder.query({
      query: () => "/reservations",
      providesTags: ["Reservations"],
    }),
    getReservationsByDate: builder.query({
      query: ({ dateFrom, dateTo }) => `/reservations/byDate?dateFrom=${dateFrom}&dateTo=${dateTo}`,
      providesTags: ["Reservations"],
    }),
    getReservation: builder.query({
      query: ({ id }) => `/reservations/${id}`,
      providesTags: ["Reservations"],
    }),
    deleteReservation: builder.mutation({
      query: ({ id }) => ({
        url: `/reservations/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Reservations"],
    }),
    updateReservation: builder.mutation({
      query: (reservation) => ({
        url: `/reservations/${reservation.id}`,
        method: "PUT",
        body: reservation,
      }),
      invalidatesTags: ["Reservations"],
    }),
  }),
});
export const {
  useAddReservationMutation,
  useGetReservationsQuery,
  useGetReservationsByDateQuery,
  useGetReservationQuery,
  useDeleteReservationMutation,
  useUpdateReservationMutation,
} = reservationsApiSlice;
