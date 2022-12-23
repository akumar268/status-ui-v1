import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get_Url } from "../utilities/constants";

const getStatusesByPagination = createAsyncThunk(
  "getStatusesByPagination",
  async (pageDetails, { getState, rejectWithValue }) => {
    let { pageNo, pageSize } = pageDetails;
    if (!pageNo || pageNo == "") pageNo = 0;
    if (!pageSize || pageSize == "") pageSize = 3;
    localStorage.setItem("activePage", pageNo);
    localStorage.setItem("pageSize", pageSize);
    let token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZWxsIiwiZXhwIjoxNjcxODE3OTgxLCJpYXQiOjE2NzE3ODE5ODF9.Q2D-HAJjEBbFFbQq54fSGYuE7ooMHQEcFtSTvS7tMNs";
    //let jwt=localStorage.getItem('token');
    try {
      const { data } = await axios.get(
        get_Url + "pageNumber=" + pageNo + "&pageSize=" + pageSize,
        {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("getStatusesByPagination data - ", data);
      return data;
    } catch (error) {
      console.log(error);
      rejectWithValue(error.response);
    }
  }
);

export default getStatusesByPagination;
