import React,{useState} from 'react';
import {withRouter} from 'react-router';
import { Row, Col } from 'antd';
import history from '../../../util/history';
// import './styles.scss';
function GroupToursList ({
   searchTourItem
            
}){

   //vận chuyển
   const renderTransports = () => {
      return searchTourItem.transports.map((item, index)=>{
         return(
            <img src={item} style={{marginRight:'8px'}}/>
         );
      })
   }

   //thông tin tour
   const renderDesriptions = () => {
      return searchTourItem.descriptions.map((item, index)=>{
         return(
            <span style={{padding:"4px", color:"#00C1DE"}}>- {item}</span>
         );
      })
   }

   return(
      <Row>
         <Col span={24} className="hover-box-detail box-list"
               onClick={()=>{history.push(`/tour-travel/${searchTourItem.id}`)}}
         >
            <Row>
               <Col span={24} >
                  <Row className="row-box-list-tour box-list__row">
                     <Col span={6}>
                     <img className="img-list-tour box-list__row-image" src={searchTourItem.image} alt="" />
                        
                     </Col>
                     <Col span={12}>
                        <div className="box-name-transports-list-tour box-list__row-content">
                           <h2>{searchTourItem.name}</h2>
                           <div>
                              <img src="https://img.icons8.com/material-rounded/14/000000/time-machine.png"/>
                              <span className="box-day-list-tour box-list__row-content-day">{searchTourItem.day}</span>
                              <span className="box-ransports-list-tour box-list__row-content-transports">Phương tiện:</span><span>{renderTransports()}</span>
                           </div>
                           <div style={{padding:"2px"}}>
                           {renderDesriptions()}
                              
                           </div>
                        </div>


                     </Col>
                     <Col span={6}>
                        <div className="box-start-day-list-tour box-list__row-content-day--start">
                           <span>Khởi hành: {searchTourItem.start}</span>
                        </div>
                        
                        
                        <div className="box-apply-list-tour box-list__row-content-apply">
                           <span>* Áp dụng nhóm: {searchTourItem.apply}</span>
                        </div>
                        <div>
                        <span className="box-price-list-tour box-list__row-content-price">
                           {((searchTourItem.price)*1).toLocaleString('vi-VN', {
                                                                                 style: 'currency',
                                                                                 currency: 'VND'
                                                                              })}
                        </span>
                        </div>
                     </Col>
                  </Row>
               </Col>
            </Row>
         </Col>
      </Row>
)}
export default withRouter(GroupToursList);

