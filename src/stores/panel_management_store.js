import { configureStore, combineReducers } from '@reduxjs/toolkit'
import adminSlice from '../reducers/admin_reducer';
import candidateSlice from '../reducers/candidate_reducer';
import interviewSlice from '../reducers/interview_reducer';
import panelSlice from '../reducers/panel_reducer';
import userSlice from '../reducers/user_reducer';

const reducer = combineReducers({
  adminReducer: adminSlice.reducer,
  candidateReducer: candidateSlice.reducer,
  interviewReducer: interviewSlice.reducer,
  panelReducer: panelSlice.reducer,
  userReducer: userSlice.reducer,
  
});

const panelManagementStore = configureStore({
    reducer
});

export default panelManagementStore;