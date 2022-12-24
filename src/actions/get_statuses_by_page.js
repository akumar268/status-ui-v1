import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get_Url } from "../utilities/constants";

const getStatusesByPagination = createAsyncThunk(
  "getStatusesByPagination",
  async (pageDetails, { getState, rejectWithValue }) => {
    let { pageNo, pageSize } = pageDetails;
    console.log("page=", pageNo, pageSize);
    if (!pageNo || pageNo == "") pageNo = 0;
    if (!pageSize || pageSize == "") pageSize = 3;
    //if (!statusIdRef || statusRef == "") statusRef = null;
    localStorage.setItem("activePage", pageNo);
    localStorage.setItem("pageSize", pageSize);
    let jwt =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZWxsIiwiZXhwIjoxNjcxODM2NDAyLCJpYXQiOjE2NzE4MDA0MDJ9.hCOqDcMFBvCM0H4gf1C8Zus0nE7-EZDStkShRICrSLU";
    //let jwt=localStorage.getItem('token');
    try {
      const { data } = await axios.get(
        get_Url + "pageNumber=" + pageNo + "&pageSize=" + pageSize,
        {
          "Content-type": "application/json; charset=UTF-8",
          "Access-Control-Allow-Origin": "*",
          headers: { Authorization: `Bearer ${jwt}` },
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
