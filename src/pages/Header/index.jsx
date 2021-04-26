import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import history from '../../util/history';
import SignInModal from "./modifyAccountModal/SignInModal";
import SignUpModal from "./modifyAccountModal/SignUpModal";
import b from "../../images/binh.png";
import {Row, Col,Menu, Dropdown, Button } from 'antd';
import {
  getUser,
  signIn,
}from '../../redux/actions';
// import './styles.scss';
function Header({
   signIn,signInAuth,
}){

   const userId = signInAuth.id;
   useEffect(() => {
      handleHideModifyModal()
   },[userId]);
   const [isShowModifyModal, setIsShowModifyModal] = useState(false);
   const [isCofirmUser, setIsCofirmUser] = useState(true);
   const [showSign, setShowSign] = useState(false);
   const [windownShowSign, setWindownShowSign] = useState(false);
   
   const handleShowModifyModal = () => {
      setIsShowModifyModal(true);
      
   }

   const handleHideModifyModal = () => {
      setIsShowModifyModal(false);
   }
   const handleSubmitSignIn = (values)=>{
      signIn(values);
      handleHideModifyModal();
 
   }

   const [isShowSignUpModal, setIsShowSignUpModal] = useState(false);
   const handleShowSignUpModal = () => {
   setIsShowSignUpModal(true);
   handleHideModifyModal();
   
 }

   const handleHideSignUpModal = () => {
   setIsShowSignUpModal(false);
 }

 const handleShowSign = () =>{
   setShowSign(showSign? false:true);
   
 }

 const hanldeSignOut = () =>{
    localStorage.removeItem("authData");
    handleShowSign();
 }
//windown
 window.onclick = function(event) {
    let nameOject = event.target.parentElement;
    if(event.target == document.getElementById("display-in")){
       nameOject = event.target.parentElement.parentElement;
    }
   if (nameOject !== document.getElementById("display-none")) {
      setShowSign(false);
   }
}
   return (
      <Row>
         <Col span={24} className="header-container modal-account">
            <nav className="header-content nav">
               <div className="logo nav__logo">
                  <img style={{width:"60px"}} src={b} alt=""
                         onClick={()=>{history.push('/')}}
                  />
               </div>
               <ul>
                  <li
                     onClick={() => history.push('/Hotel')}>
                     <a 
                        className={`${history.location.pathname === '/Hotel' && 'hover--active a--active'}`}
                     >Khách sạn</a>
                  </li>
                  <li 
                     onClick={() => history.push('/')}>
                     <a  
                        className={`${(history.location.pathname === '/' || history.location.pathname === '/tour-travel') && 'hover--active a--active'}`}
                     >Tours</a>
                  </li>
                  <li onClick={() => history.push('/air-ticket')}>
                     <a 
                        className={`${history.location.pathname === '/air-ticket' && 'hover--active a--active'}`}
                     >Vé máy bay</a> 
                  </li>
                  <li onClick={() => {(localStorage.getItem("authData") !== null)?history.push('/checkout/check-history'):alert("Bạn chưa đăng nhập tài khoản!")}}><a
                     className={`${history.location.pathname === '/checkout/check-history' && 'hover--active a--active'}`}
                   >Lịch sử đặt tour</a></li>
               </ul>
               <div id="display-out"
                 className="account-dropdown nav-dropdown">
               <div id="display-none" className="account-person nav-dropdown__account" onClick={() => handleShowSign()}>
                  <div className="person nav-dropdown__account-person">
                     <img onClick={() => handleShowSign()} id="display-in" src="https://img.icons8.com/office/22/000000/person-male-skin-type-1-2.png"/>
                  </div>
                  <span className="nav-dropdown__account-name">
                     {(localStorage.getItem("authData")===null)?'Tài khoản' : JSON.parse(localStorage.getItem("authData")).userName}
                  </span>
               </div>

               {
                  showSign&&<div className="account-dropdown-display nav-dropdown--display">
                  <Button onClick={() => {if(localStorage.getItem("authData")===null){handleShowModifyModal();handleShowSign()}else{hanldeSignOut()}}}
                   style={{width:"220px",height:"40px", margin: "0 auto"}} className="account-dropdown-button nav-dropdown--display-button" type="primary">{(localStorage.getItem("authData")===null)?"Đăng nhập" : "Đăng xuất"}</Button>
                  <p style={{height:"20px", position:"relative", top:"-10px"}} href="">Chưa có tài khoản?  
                  <span className="span-register nav-dropdown--display-span"
                        onClick={()=>{handleShowSignUpModal();handleShowSign()}}>Đăng ký</span> ngay</p>
               </div>
               }
               
               </div>
               <div className="help-phone nav__help">
                  <a className="a-phone nav__help-phone" >
                     <img style={{height:'34px', }} src="https://img.icons8.com/dusk/64/000000/phone.png"/>
                     <span>(028) 3933 8002</span>
                  </a> 
               </div>
            </nav>
         <SignInModal
         isShowModal={isShowModifyModal}
         handleHideModal={handleHideModifyModal}
         handleSubmitSignIn={handleSubmitSignIn}
         handleShowSignUpModal={handleShowSignUpModal}
         isCofirmUser= {isCofirmUser}
         />
         <SignUpModal 
         isShowSignUpModal={isShowSignUpModal}
         handleHideSignUpModal={handleHideSignUpModal}
         handleShowModifyModal={handleShowModifyModal}
         />
         </Col>
      </Row>
   );
}
const mapStateToProps = (state) => {
   const { createUser} = state.signUpModalReducer;
   const {  signInAuth } = state.authReducer;
   return {
      createUser,
      signInAuth,
   }
};

const mapDispatchToProps = (dispatch) => {
   return {
      signIn: (params) => dispatch(signIn(params)),
   };
}
export default connect(mapStateToProps, mapDispatchToProps)(Header);
