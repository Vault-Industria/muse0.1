import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useSelector } from 'react-redux';
import {store} from '../core/store';

const API_URL = process.env.REACT_APP_API_ENDPOINT
export const dataSlice = createSlice({
  name: 'userinfo',
  initialState:{
    wallet:"",
    sold:[],
    loading:false,
    hasErrors:false,
    transactions:[],
    loginInfo:[]
  },

  reducers: {
    setWallet: (state, action) => {
      state.wallet = action.payload;
    },
    setSold: (state, action) => {
     
      state.sold.push(action.payload)
    },

    setLogInfo: (state, action) => {
     
      state.loginInfo.push(action.payload)
    },

    getTransactions: state => {
      state.loading = true;
    },
    getTransSuccess: (state, { payload }) => {
      state.transactions = payload
      state.loading = false
      state.hasErrors = false
    },
    getTransFailure: state => {
      state.loading = false
      state.hasErrors = true
    },

  },
})

// Action creators are generated for each case reducer function
export const {setWallet,setSold,getTransFailure,getTransSuccess,getTransactions,setLogInfo} = dataSlice.actions;



export default dataSlice.reducer

// Asynchronous thunk action
export function fetchBought(wallet) {
  return async (dispatch,getState) => {
    dispatch(getTransactions())
    
    const address = wallet
    
     await axios.post(`${API_URL}/nfts/bought`, {address})
      .then((response)=> {
        dispatch(getTransSuccess(response.data))
      })
      .catch((error)=> {
        dispatch(getTransFailure())
      })

      
   
    
  }
}

