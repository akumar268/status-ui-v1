import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit'
import { putUrl } from '../utilities/constants';

const updateCandidateStatusAction = createAsyncThunk(
    'updateCandidate',
    async ({ updatedCandidateStatus, statusId }, rejectWithValue) => {
        let jwt =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkZWxsIiwiZXhwIjoxNjcxODE3OTgxLCJpYXQiOjE2NzE3ODE5ODF9.Q2D-HAJjEBbFFbQq54fSGYuE7ooMHQEcFtSTvS7tMNs";
      //let jwt=localStorage.getItem('token');  
      try {
            await axios.put(putUrl + statusId,
                updatedCandidateStatus,
                {
                    'Content-type': 'application/json; charset=UTF-8',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': "DELETE, POST, GET, OPTIONS",
                    'Access-Control-Allow-Headers': "Content-Type, Authorization, X-Requested-With",
                    'headers': { "Authorization": `Bearer ${jwt}` }
                });
                
        } catch (error) {
            rejectWithValue(error.response);
        }
    }
)
export default updateCandidateStatusAction;