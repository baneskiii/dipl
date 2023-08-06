import { apiSlice } from "../../app/api/apiSlice";

export const roomRatingApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["RoomRating"],
  endpoints: (builder) => ({
    addRoomRating: builder.mutation({
      query: (roomRating) => ({
        url: "/ratings",
        method: "POST",
        body: roomRating,
      }),
      invalidatesTags: ["RoomRating"],
    }),
  }),
});
export const { useAddRoomRatingMutation } = roomRatingApiSlice;
