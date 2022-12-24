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
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZWxsIiwiZXhwIjoxNjcxODE3OTgxLCJpYXQiOjE2NzE3ODE5ODF9.Q2D-HAJjEBbFFbQq54fSGYuE7ooMHQEcFtSTvS7tMNs";
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
