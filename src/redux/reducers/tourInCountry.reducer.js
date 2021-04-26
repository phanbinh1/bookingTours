import {
   GET_TOUR_COUNTRY_SUCCESS,
   GET_TOUR_COUNTRY_FAIL,
   GET_CHECK_TOUR_SUCCESS,
   GET_CHECK_TOUR_FAIL
 } from '../constants';
 
 const initialState = {
  tourCountryList: [],
  tourCheckCountry: [],
 };
 
 export default function tourCountryReducer(state = initialState, action) {
   switch (action.type) {
     case GET_TOUR_COUNTRY_SUCCESS: {
       return {
         ...state,
         tourCountryList: [
           ...action.payload,
         ],
       }
     }

     case GET_CHECK_TOUR_SUCCESS: {
      
      return {
        ...state,
        tourCheckCountry: [
          ...action.payload,
        ],
      }
    }

     case GET_TOUR_COUNTRY_FAIL: {
       return state;
     }
     default: {
       return state;
     }
   }
 }

//  export function tourCheckCountryReducer(state = initialState, action) {
//    switch (action.type) {
//      case GET_CHECK_TOUR_SUCCESS: {
//       return {
//         ...state,
//         tourCheckTour: [
//           ...action.payload,
//         ],
//       }
//     }

//      default: {
//        return state;
//      }
//    }
//  }
 