// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { open } from "./slices/alertSlice";
export const ormApi = createApi({
  reducerPath: "ormApi",
  tagTypes: ["albums"],
  refetchOnReconnect: true,

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/",
  }),

  endpoints: (builder) => ({
    getAlbums: builder.query({
      query: (params) => `albums?${params}`,
      providesTags: ["albums"],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // `onSuccess` side-effect
        } catch (err) {
          // `onError` side-effect
          if (err.error?.data?.error) {
            dispatch(
              open({
                error: true,
                desc: err?.error?.data?.error,
                errorinfo: err?.error?.data?.errorInfo,
              })
            );
          } else {
            dispatch(
              open({
                error: true,
                desc: "Неизвестная ошибка при отправке запроса",
              })
            );
          }
        }
      },
    }),
    deleteAlbum: builder.mutation({
      query: (id) => ({
        url: `albums/${id}`,
        method: "DELETE",
      }),
      // invalidatesTags:['albums'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(
            open({
              error: false,
              desc: data.message,
            })
          );
        } catch (err) {
          // `onError` side-effect
          if (err.error?.data?.error) {
            dispatch(
              open({
                error: true,
                desc: err?.error?.data?.error,
                errorinfo: err?.error?.data?.errorInfo,
              })
            );
          } else {
            dispatch(
              open({
                error: true,
                desc: "Неизвестная ошибка при отправке запроса",
              })
            );
          }
        }
      },
    }),
    addAlbum: builder.mutation({
      query: (body) => ({
        url: `albums/`,
        method: "POST",
        body: body,
      }),
      // invalidatesTags:['albums'],
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // `onSuccess` side-effect
          dispatch(
            open({
              error: false,
              desc: data.message,
            })
          );
        } catch (err) {
          // `onError` side-effect
          if (err.error?.data?.error) {
            dispatch(
              open({
                error: true,
                desc: err?.error?.data?.error,
                errorinfo: err?.error?.data?.errorInfo,
              })
            );
          } else {
            dispatch(
              open({
                error: true,
                desc: "Неизвестная ошибка при отправке запроса",
              })
            );
          }
        }
      },
    }),
  }),
});

export const {
  useGetAlbumsQuery,
  useDeleteAlbumMutation,
  useAddAlbumMutation,
} = ormApi;
