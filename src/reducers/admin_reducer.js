import { createSlice } from "@reduxjs/toolkit";
import updateCandidateStatusAction from "../actions/update_candidate_status_action";
import addNewCandidateStatus from "../actions/add_new_candidate_status";
//import getAllStatus from '../actions/get_all_status';
//import getAllStatusItems from '../actions/get_all_status_items';
//import addNewStatus from "../actions/add_new_status";
//import getStatusById from "../actions/get_status_by_id";
//import updateStatusAction from "../actions/update_status";
//import deleteStatusAction from "../actions/delete_status";
import getStatusesByPagination from "../actions/get_statuses_by_page";

const adminSlice = createSlice({
  name: "AdminStatusApp",
  initialState: {
    statuses: [],
    loading: false,
    
    totalNoOfStatuses: 0,
    statusMessage: ''
  },
  reducers: {},
  extraReducers: {
    [getStatusesByPagination.pending]: (state, action) => {
      state.loading = true;
    },
    [getStatusesByPagination.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.statuses = payload.statuses;
      state.totalNoOfStatuses = payload.totalNoOfStatuses;
      state.isSuccess = true;
    },
    [getStatusesByPagination.rejected]: (state, { payload }) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
    [addNewCandidateStatus.pending]: (state, action) => {
      console.log("Entered reducer pending state");
      state.loading = true;
    },
    [addNewCandidateStatus.fulfilled]: (state, { payload }) => {
      console.log("Entered reducer fullfilled state");
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
      state.statusMessage=<p className="font-weight-bold text-success">Candidate Status Succcessfully Added</p>
    },
    [addNewCandidateStatus.rejected]: (state, { payload }) => {
      console.log("Entered reducer rejected state");
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
      state.statusMessage = payload.data;
      console.log("serverError", state.statusMessage);
    },
    [updateCandidateStatusAction.pending]: (state) => {
      state.loading = true;
    },
    [updateCandidateStatusAction.fulfilled]: (state, payload) => {
      state.loading = false;
      state.data = payload;
      state.isSuccess = true;
    },
    [updateCandidateStatusAction.rejected]: (state) => {
      state.loading = false;
      state.isSuccess = false;
      state.message = "failed";
    },
  },
});

export default adminSlice;
