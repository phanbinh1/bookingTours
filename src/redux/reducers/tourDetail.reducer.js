import {
   GET_TOUR_DETAIL_SUCCESS,
   GET_TOUR_DETAIL_FAIL,
   GET_TOUR_RELATE_SUCCESS,
   GET_TOUR_RELATE_FAIL
 } from '../constants';
 
 const initialState = {
  tourDetail: {
   apply: "",
   day: "",
   id: 2,
   image: "",
   name: "",
   place: "",
   price: "",
   start: "",
   transports: [
      {transport:""}
],
   startDays: [
      ""
   ],
   calendarDays: [
      {
         startDay:"",
         abouttDay:"",
      }
   ]
  },

  tourRelateDetail: []
 };
 
 export default function tourDetailReducer(state = initialState, action) {
   switch (action.type) {
     case GET_TOUR_DETAIL_SUCCESS: {
       return {
         ...state,
         tourDetail:
           action.payload,
       
       }
     }

     case GET_TOUR_RELATE_SUCCESS: {
      return {
        ...state,
        tourRelateDetail: [...action.payload],
      
      }
    }

     case GET_TOUR_DETAIL_FAIL: {
       return state;
     }
     default: {
       return state;
     }
   }

 }
 