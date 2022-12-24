import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { get_Url } from "../utilities/constants";

const searchStatusesByPagination = createAsyncThunk(
  "getStatusesByPagination",
  async (pageDetails, { getState, rejectWithValue }) => {
    //let { pageNo, pageSize, statusId, status } = pageDetails;
    console.log(pageDetails.status);
    if (!pageDetails.pageNo || pageDetails.pageNo == "") pageDetails.pageNo = 0;
    if (!pageDetails.pageSize || pageDetails.pageSize == "")
      pageDetails.pageSize = 3;
    //if (!statusIdRef || statusRef == "") statusRef = null;
    if (!pageDetails.status || pageDetails.status == "")
      pageDetails.status = "";
    localStorage.setItem("activePage", pageDetails.pageNo);
    localStorage.setItem("pageSize", pageDetails.pageSize);
    let jwt =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZWxsIiwiZXhwIjoxNjcxODgxNDI4LCJpYXQiOjE2NzE4NDU0Mjh9.UoRkXwTA-dOB_WwVara79gPywZht7HlBy8ncPdtg_u0";
    //let jwt=localStorage.getItem('token');
    try {
      const { data } = await axios.get(
        get_Url +
          "pageNumber=0" +
          "&pageSize=" +
          pageDetails.pageSize +
          "&status=" +
          pageDetails.status,
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

export default searchStatusesByPagination;
