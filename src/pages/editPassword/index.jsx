import React, {useState, useEffect} from 'react';
import { Row,Col, Select, Input, Button } from 'antd';
import { connect } from 'react-redux';
import history from '../../util/history';

import {
   editPassword,
 } from '../../redux/actions';
function EditPassword({editPassword}) {
   // const { TextArea } = Input;
   const [formValueInfo, setFormValueInfo] = useState({
      password:'',
      changePassword:'',
      comfirmPassword:'',
   });
   const [errors, setErrors]= useState({
      
   });
    
    const handleChangeValue = (e) =>{
     
      const {name, value, type, checked}= e.target;
      setFormValueInfo({
         ...formValueInfo,
         [name]:value
      });
   }
   const handleEditPassword = () =>{
      if(formValueInfo.comfirmPassword !==''&&formValueInfo.changePassword !==''&&formValueInfo.changePassword !==''&&(formValueInfo.comfirmPassword).length>=8){
         if(formValueInfo.comfirmPassword === formValueInfo.changePassword){
            editPassword({
               email: JSON.parse(localStorage.getItem("authData")).email,
               password: formValueInfo.password,
               changePassword: formValueInfo.changePassword,
               id: JSON.parse(localStorage.getItem("authData")).id,
             });
         }else{
            alert("Bạn nhập mật khẩu chưa đúng!");
         }
      }else{
          alert("Bạn phải nhập khẩu trên 8 kí tự!");
      }
      
   }
   

   return(
   <Row>
      <Col span={24} style={{background:"#f0f0f0"}}>
      <Row>
         <Col span={14} style={{margin:"0 auto",background:"#f0f0f0"}}>
         <h1 style={{color:"#003C71"}}>Đổi mật khẩu</h1>
         <div>Họ tên: <span>{JSON.parse(localStorage.getItem("authData")).userName}</span></div>
         <div>
            Email: <span>{JSON.parse(localStorage.getItem("authData")).email}</span>
         </div>
            <form action="">
            <div style={{paddingBottom:"10px"}}>
               <label htmlFor="">Mật khẩu cũ</label>
               <Input placeholder="mật khẩu cũ"
                        type="password"
                        name='password'
                        onChange={(e)=>handleChangeValue(e)}
               />
            </div>

            <div style={{paddingBottom:"10px"}}>
               <label htmlFor="">Nhập mật khẩu mới</label>
               <Input  placeholder="Nhập mật khẩu mới"
                        type="password"
                        name='changePassword'
                        onChange={(e)=>handleChangeValue(e)}
                  />     
            </div>
            <div style={{paddingBottom:"10px"}}>
               <label htmlFor="">Nhập lại mật khẩu mới</label>
               <Input  placeholder="Nhập lại mật khẩu"
                        type="password"
                        name='comfirmPassword'
                        onChange={(e)=>handleChangeValue(e)}
                  />     
            </div>
            <div style={{paddingBottom:"10px"}}>
               <Button type="primary"
               onClick={()=>{handleEditPassword()}}
               >
                  Đổi mật khẩu
               </Button>
                  
            </div>


           
            </form>
            
            
         </Col>
      </Row>
      </Col>
   </Row>
      
   )
}
const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => {
  return {
    
    editPassword: (params) => dispatch(editPassword(params)),
   //  deleteTour: (params) => dispatch(deleteTour(params)),
    
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPassword);


