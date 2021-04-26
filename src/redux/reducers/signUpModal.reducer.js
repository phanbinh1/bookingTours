import {
   GET_USER_SUCCESS,
   CREATE_USER_FAIL,
   CREATE_USER_SUCCESS
 } from '../constants';
 
 const initialState = {
   // createUser: [],
   failUser: false,
   successUser: false,
 };
 
 export default function signUpModalReducer(state = initialState, action) {
   switch (action.type) {
   //   case GET_USER_SUCCESS: {
   //     return {
   //       ...state,
   //       createUser: [
   //         ...action.payload,
   //       ],
   //     }
   //   }
      case CREATE_USER_SUCCESS: {
         return {
         failUser: false,
         successUser: action.payload,
         }
      }

     case CREATE_USER_FAIL: {
      
       return {
         failUser: action.payload,
         successUser: false,
       }
     }
     
     
     default: {
       return state;
     }
   }
 }
 