import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import React from 'react';

import {
   GET_TOUR_COUNTRY,
   GET_TOUR_COUNTRY_SUCCESS,
   GET_TOUR_COUNTRY_FAIL,
   GET_CHECK_TOUR,
   GET_CHECK_TOUR_SUCCESS,
   GET_CHECK_TOUR_FAIL
} from '../constants';

function* getTourCountryListSaga(action){
  

  try {
    const { page, limit, id } = action.payload;
    const response = yield axios.get(`http://localhost:3001/toursTravel?type=1&_page=1&_limit=${limit}`);
    const data = response.data;
    yield put({
      type: GET_TOUR_COUNTRY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_TOUR_COUNTRY_FAIL,
      payload: error,
    });
  }
}

function* getCheckTourSaga(action){
  

   try {
     const { page, limit, id } = action.payload;
     const response = yield axios.get(`http://localhost:3001/toursTravel?type=1&_page=${page}&_limit=${limit}`);
     
     const data = response.data;
     
     yield put({
       type: GET_CHECK_TOUR_SUCCESS,
       payload: data,
     });
   } catch (error) {
     yield put({
       type: GET_CHECK_TOUR_FAIL,
       payload: error,
     });
   }
 }

export default function* tourCountrySaga(){
  yield takeEvery(GET_TOUR_COUNTRY, getTourCountryListSaga);
  yield takeEvery(GET_CHECK_TOUR, getCheckTourSaga);
}