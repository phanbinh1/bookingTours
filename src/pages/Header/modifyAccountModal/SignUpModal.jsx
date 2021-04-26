import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Modal, Button, Input, Row, Col } from 'antd';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
  getUser,
  createUser,
} from '../../../redux/actions';
// import './styles.scss';

function SignUpModal({
   handleShowModifyModal,
   isShowSignUpModal,
   handleHideSignUpModal,
   getUser,
   createUser,
   failUser,
   successUser
}) {
   console.log("failUser--failUser: ", failUser.failUser);
   console.log("successUser--successUser: ", successUser);
   const [successSignUp, setSuccessSignUp] = useState(false);
   const [failSignUp, setFailSignUp] = useState(false);
   useEffect(() => {
      getUser();
   },[]);

   useEffect(() => {
      setTimeout(() => {
         setFailSignUp(failUser.failUser);
      }, 2000);
      setTimeout(() => {
         setFailSignUp(false);
      }, 4000);
   },[failUser]);

   useEffect(() => {
         setSuccessSignUp(successUser.successUser);
         setTimeout(() => {
         setSuccessSignUp(false);
         handleHideSignUpModal();
      }, 2000);
      
   },[successUser]);

  const renderCustomInput=(props)=>{
    const {field, meta}=props;
    return(
      <Row>
         <Col span={24} className="field-input form__field-input">
            <Input
               {...field}
               type= {field.type}
            />
            {meta.touched && meta.error ? <div style={{color:"red"}}> {meta.error}</div>: null}
         </Col>
      </Row>
    )
   }
   
   const handleSubmitSignUp = (values)=>{
      createUser({
         userName: values.userName,
         email: values.email,
         password: values.password,
      });
      // if(failSignUp==false){
      //    setSuccessSignUp(true);
      //    setTimeout(() => {
      //    setSuccessSignUp(false);
      //    handleHideSignUpModal();
      // }, 2000);
      // }
      }

  return (
      <Modal
        title="Đăng ký"
        visible={isShowSignUpModal}
        onCancel={handleHideSignUpModal}
        footer={false}
      >
        <Formik
          initialValues={
            {
              userName: '',
              email: '',
              password: '',
              confirmPassword: '',
            }
          }
          validationSchema={Yup.object({
            userName: Yup.string()
              .required('Bạn chưa nhập tên')
              .max(15, 'Nhập 15 kí tự trở xuống'),
            email: Yup.string()
              .required('Bạn chưa nhập email')
              .email('Email có định dạng chưa đúng'),
            password: Yup.string()
              .required('Bạn chưa nhập mật khẩu')
              .min(8, 'Mật khẩu phải có độ dài tối thiểu là 8 kí tự'),
            confirmPassword: Yup.string()
              .oneOf([Yup.ref("password")], "Bạn chưa nhập đúng mật khẩu ở trên")
              .required("Bạn chưa nhập lại mật khẩu"),
          })}
          onSubmit={(values) => handleSubmitSignUp(values)}
        >
          <Form className="form">
            <label htmlFor="title" className="label-sign-in-up form__name-label">Họ và tên</label>
          <Field  
            name='userName'
          >
            {(props)=>renderCustomInput({
            ...props,
            field: {
            ...props.field,
            placeholder:'Họ và tên',
            type:'text',
            },
                    })
            }
            </Field>
            <label htmlFor="title" className="label-sign-in-up form__name-label">Email</label>
            <Field  
              name='email'
            >
              {(props)=>renderCustomInput({
                          ...props,
                          field: {
                          ...props.field,
                          placeholder:'email',
                          type:'email',
                        },
                        })
                  }
              </Field>
            <label htmlFor="title" className="label-sign-in-up form__name-label">Mật khẩu</label>
            <Field  
              name='password'
            >
              {(props)=>renderCustomInput({
                          ...props,
                          field: {
                            ...props.field,
                            placeholder:'Mật khẩu',
                            type:'password',
                          },
                        })
                  }
                    </Field>

            <label htmlFor="title" className="label-sign-in-up form__name-label">Nhập lại mật khẩu</label>
            <Field  
              name='confirmPassword'
            >
              {(props)=>renderCustomInput({
                          ...props,
                          field: {
                            ...props.field,
                            placeholder:'Nhập lại mật khẩu',
                            type:'password',
                          },
                        })
                  }
            </Field>
            {
               (successSignUp==true)&&<Row>
                  <Col span={24}>
                     <div><p style={{color:"#17ffcd"}}>Bạn đã đăng nhập thành công!</p></div>
                  </Col>
               </Row>
            }
            {
               (failSignUp==true)&&<Row>
                  <Col span={24}>
                     <div><p style={{color:"red"}}>Tên email của bạn đã tồn tại!</p></div>
                  </Col>
               </Row>
            }
            
            <Row>
               <Col span={24} className="sign-up-in-up form__box-button">
                  <button type="button" className="form__box-button--green" style={{marginRight:"15px"}} onClick={() => {handleShowModifyModal(); handleHideSignUpModal()
                  }}>
                     Đăng nhập
                  </button>
                  <button type="submit" className="form__box-button--green">
                     Đăng ký
                  </button>
               </Col>
        </Row>   
          </Form>
        </Formik>
      </Modal>
  );
}
const mapStateToProps = (state) => {
  const { failUser, successUser} = state.signUpModalReducer;
  return {
   failUser,
   successUser
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (params) => dispatch(getUser(params)),
    createUser: (params) => dispatch(createUser(params)),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SignUpModal)
