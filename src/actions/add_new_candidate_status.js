import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { post_url } from "../utilities/constants";

const addNewCandidateStatus = createAsyncThunk(
  "addNewCandidate",
  async (newCandidateStatus, { getState, rejectWithValue }) => {
    console.log(
      "AddNewCandidate status called: newCandidateStatus - ",
      newCandidateStatus
    );
    let jwt =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZWxsIiwiZXhwIjoxNjcxODgxNDI4LCJpYXQiOjE2NzE4NDU0Mjh9.UoRkXwTA-dOB_WwVara79gPywZht7HlBy8ncPdtg_u0";
    //  let jwt=localStorage.getItem('token');
    try {
      const { data } = await axios.post(post_url, newCandidateStatus, {
        "Content-type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("Added new product -", data);
      return data;
    } catch (error) {
      console.log("Entered actions catch block");
      console.log("error", error.response.data);
      return rejectWithValue(error.response);
    }
  }
);
export default addNewCandidateStatus;
