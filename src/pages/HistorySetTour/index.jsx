import React, { useEffect } from 'react';
import { Row, Col, Button, Card,Tabs } from 'antd';

import history from '../../util/history';
import { connect } from 'react-redux';
import { getHistoryTour } from '../../redux/actions';
import './styles.css';





function HistorySetTour({getHistoryTour, historyBookTour}) {
   useEffect(() => {
      getHistoryTour(
         {
            userName:JSON.parse(localStorage.getItem("authData")).userName,
         }
      );
   }, []);
   const { TabPane } = Tabs;
   const renderTabTours = () => {
      return historyBookTour.map((tabToursItem, tabTourIndex) => {
         const dataObject = new Date(tabToursItem.selectDay);
         const dateMonthYear = [dataObject.getDate(), dataObject.getMonth() + 1, dataObject.getFullYear()];
         return(
            <tr>
               <td>{tabToursItem.name}</td>
               <td>{dateMonthYear.join('-')}</td>
               <td>{tabToursItem.countUsers}</td>
               <td>{((tabToursItem.price)*(tabToursItem.countUsers)).toLocaleString('vi-VN', {
                                                                                 style: 'currency',
                                                                                 currency: 'VND'
                                                                              })}</td>
            </tr>
         )
      })
   }

  return (
     <Row>
        <Col span={24} className="surround-history-set-tour">
            <Row style={{marginTop:"40px"}}>
               <Col span={20} style={{margin:"0 auto", background:"white", borderRadius:'6px'}}>
               <Row gutter={20}>
                  <Col span={7}>
                     <Row>
                        <Col span={24} className="surround-history-user">
                           <div className="surround-history-user-male-circle">
                           <img src="https://img.icons8.com/fluent/200/000000/user-male-circle.png"/>
                           </div>
                           
                           <div className="surround-history-information">
                           <div>
                              Họ tên: <span>{JSON.parse(localStorage.getItem("authData")).userName}</span>
                           </div>
                           <div>
                              Email: <span>{JSON.parse(localStorage.getItem("authData")).email}</span>
                           </div>
                           </div>
                           <div className="surround-history-button-comfirm">
       
                              <Button type="primary" className="surround-history-comfirm-password" onClick={()=>{history.push('/checkout/check-edit-password');}}>Đổi mật khẩu</Button>
                              <Button type="primary"
                                 onClick={()=>{localStorage.removeItem("authData");history.push('/')}}
                              >Đăng xuất</Button>
                           </div>
                        </Col>
                     </Row>
                  </Col>
                  <Col span={17}>
                     <div><h1 className="surround-history-set-tours">LỊCH SỬ ĐẶT TOURS:</h1></div>
                     <div className="surround-history-table">
                              <table>
                                 <tr>
                                    <th>Tên tour</th>
                                    <th>Ngày khởi hành</th>
                                    <th>Số khách</th>
                                    <th>Tổng tiền</th>
                                 </tr>
                                 {renderTabTours()}
                              </table>
                     </div>
                  </Col>
               </Row>

               </Col>
            </Row>
        </Col>
     </Row>
  );
}

const mapStateToProps = (state) => {
   const { historyBookTour } = state.historyTourReducer;

   return {
      historyBookTour,
   }
   };
   
   const mapDispatchToProps = (dispatch) => {
      return {
         getHistoryTour: (params) => dispatch(getHistoryTour(params)),
      };
      }
   export default connect(mapStateToProps, mapDispatchToProps)(HistorySetTour);
