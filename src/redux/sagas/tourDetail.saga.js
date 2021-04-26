import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import React from 'react';

import {
   GET_TOUR_DETAIL,
   GET_TOUR_DETAIL_SUCCESS,
   GET_TOUR_DETAIL_FAIL,
   GET_TOUR_RELATE,
   GET_TOUR_RELATE_SUCCESS,
   GET_TOUR_RELATE_FAIL
} from '../constants';

function* getTourDetailSaga(action){
   
   // const productId = props.match.params.id;
  

  try {
    const { id } = action.payload;
    const response = yield axios.get(`http://localhost:3001/toursTravel/${id}`);
    const data = response.data;
    yield put({
      type: GET_TOUR_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_TOUR_DETAIL_FAIL,
      payload: error,
    });
  }
}

function* getTourRelateSaga(action){
   
   // const productId = props.match.params.id;
  

  try {
    const { id, place } = action.payload;
    const response = yield axios.get(`http://localhost:3001/toursTravel?q=${place}`);
    const data = response.data;
    yield put({
      type: GET_TOUR_RELATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_TOUR_RELATE_FAIL,
      payload: error,
    });
  }
}

export default function* tourDetailSaga(){
  yield takeEvery(GET_TOUR_DETAIL, getTourDetailSaga);
  yield takeEvery(GET_TOUR_RELATE, getTourRelateSaga);
}