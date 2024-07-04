import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleResponse, headerConfig } from "../common";
// import { URL } from "../../Constant copy/Constant";
// import { toast } from "react-toastify";
export const getUserList = createApi({
  reducerPath: "userList",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/api",
    prepareHeaders: (headers, { getState }) => {
      return headerConfig(headers, getState);
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => ({
        url: `users/me`,
        method: "GET",
      }),
      async onQueryStarted({}, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          handleResponse(false, data, dispatch);
        } catch (error) {
          handleResponse(true, error, dispatch);
        }
      },
    }),
  }),
});

export const { useLazyGetUserQuery } = getUserList;
