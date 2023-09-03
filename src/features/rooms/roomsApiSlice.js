import { apiSlice } from "../../app/api/apiSlice";

export const roomsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Rooms"],
  endpoints: (builder) => ({
    addRoom: builder.mutation({
      query: (room) => ({
        url: "/rooms",
        method: "POST",
        body: room,
      }),
      invalidatesTags: ["Rooms"],
    }),
    getRooms: builder.query({
      query: () => "/rooms",
      providesTags: ["Rooms"],
    }),
    getRoomsByFloor: builder.query({
      query: ({ floor }) => `/rooms/byFloor?floor=${floor}`,
      providesTags: ["Rooms"],
    }),
    getRoom: builder.query({
      query: ({ id }) => `/rooms/${id}`,
      providesTags: ["Rooms"],
    }),
    deleteRoom: builder.mutation({
      query: ({ id }) => ({
        url: `/rooms/${id}`,
        method: "DELETE",
        body: id,
      }),
      invalidatesTags: ["Rooms"],
    }),
    updateRoom: builder.mutation({
      query: (room) => ({
        url: `/rooms/${room.id}`,
        method: "PUT",
        body: room,
      }),
      invalidatesTags: ["Rooms"],
    }),
  }),
});

export const {
  useAddRoomMutation,
  useGetRoomsQuery,
  useGetRoomsByFloorQuery,
  useGetRoomQuery,
  useDeleteRoomMutation,
  useUpdateRoomMutation,
} = roomsApiSlice;
