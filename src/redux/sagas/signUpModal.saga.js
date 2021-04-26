import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import history from '../../util/history';
import {
  GET_USER,
  GET_USER_SUCCESS,
  GET_USER_FAIL,

  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,

  EDIT_PASSWORD,
  EDIT_PASSWORD_SUCCESS,
  EDIT_PASSWORD_FAIL,
} from '../constants';
import {apiUrl} from "../axios/index.js";
// const apiUrl = 'http://localhost:3001';

function* getUserSaga(action){
  try {
    const response = yield axios.get(`${apiUrl}/createUser`);
    const data = response.data;
    yield put({
      type: GET_USER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    yield put({
      type: GET_USER_FAIL,
      payload: error,
    });
  }
}

function* createUserSaga(action){
  try {
     const {userName, email} = action.payload;
     const responseCheck = yield axios.get(`${apiUrl}/users?email=${email}`);
     const dataCheck = responseCheck.data;
     
     if(dataCheck[0].id){
         yield put({
            type: CREATE_USER_FAIL,
            payload: {failUser: true,
               successUser: false
            },
         });
         // alert("Tên email của bạn đã tồn tại");
      }
    
  }catch (error) {
   yield axios.post(`${apiUrl}/users`, action.payload);
   yield put({
      type: CREATE_USER_SUCCESS,
      payload: {failUser: false,
               successUser: true
      },
   });
  }
}

//đổi password
function* editPasswordSaga(action){
   try {
     const { id, password, email, changePassword} = action.payload;
      const response = yield axios.get(`${apiUrl}/users?email=${email}&password=${password}`);
      const data = response.data;
      if (data[0].id) {
         yield axios.patch(`${apiUrl}/users/${id}`, {password: changePassword});
         localStorage.removeItem("authData");
         yield history.push('/');
         alert("Bạn đã đổi mật khẩu thành công!");
      } else {
         alert("Bạn nhập mật khẩu chưa đúng.")
      }
   } catch (error) {
      alert("Bạn nhập mật khẩu chưa đúng.")
   }
 }

export default function* signUpModalSaga(){
  yield takeEvery(GET_USER, getUserSaga);
  yield takeEvery(CREATE_USER, createUserSaga);
  yield takeEvery( EDIT_PASSWORD, editPasswordSaga);

}
