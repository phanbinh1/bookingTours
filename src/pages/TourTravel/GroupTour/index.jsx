import React,{useState} from 'react';
import {withRouter} from 'react-router';
import { Row, Col } from 'antd';
import history from '../../../util/history';
// import './stytes.css';
import './styles.scss';
function GroupTour({
   groupIndex,
   id,
   image,
   place,
   name,
   day,
   transports,
   descriptions,
   price,
   cartTourIndexData,
   setCartTourIndexData,
   history,
   placeTour
            
}){
   //vận chuyển
   const renderTransports = () => {
      return transports.map((item, index)=>{
         return(
            <img src={item} style={{marginRight:'8px'}}/>
         );
      })
   }

   //thông tin tour
   console.log("descriptions__descriptions: ",descriptions)
   const renderDesriptions = () => {
      return descriptions.map((item, index)=>{
         return(
            <p style={{padding:'0', margin:'0'}}>- {item}</p>
         );
      })
   }

   //chọn tour
   const cartTourObject = function(id, image, name, price){
      this.id = id;
      this.image = image;
      this.name = name;
      this.price = price;
   }
   const handleSelectGroup=()=>{
      let keySelect = localStorage.getItem('keySelect');
      const selectName = localStorage.getItem(id);
      if(selectName === null){
         keySelect = (keySelect === null) ? id :  keySelect + ',' + id;
         localStorage.setItem('keySelect', keySelect);

         const cartTour = new cartTourObject(id, image, name, price);
         const json = JSON.stringify(cartTour);
         localStorage.setItem(id,json);
      }
      if(cartTourIndexData.findIndex((data) => data.id === id) === -1){
         setCartTourIndexData([
            ...cartTourIndexData,
               id
               
         ]);
      }
   }

   return(
      <Col span={7}
         className="box-two"
         onClick={()=>{history.push(`/tour-travel/${id}`)}}>
         <Row 
         className="row box-two__tour">
            <Col span={24}>
               <Row>
                  <Col span={24}>
                     <img src={image} className="box-two__tour-image-two" alt="logo" />
                  </Col>
                  <Col span={24} className="box-two__tour-map">
                     <span>
                        <img src="https://img.icons8.com/offices/18/000000/marker.png"/>
                     </span>
                     <div className="box-two__tour-map-place" >{place}</div>
                  </Col>
               </Row>
            </Col>
            <Col span={24}>
               <Row  className="box-two-tour-surround__name">
                  <Col span={24} className="name-tour box-two-tour-surround__name-tour">
                     <span>{name}</span>
                  </Col>
                  <Col span={24}>
                     <Row>
                        <Col span={12}>
                           <img src="https://img.icons8.com/material-rounded/14/000000/time-machine.png"/>
                           <span className="box-two-tour-surround__name-day">{day}</span>
                        </Col>
                        <Col span={12} >
                           <span className="box-two-tour-surround__name-transports">{renderTransports()}</span>
                        </Col>
                     </Row>
                  </Col>
                  <Col span={24} className="box-two-tour-surround__name-desription">
                     {renderDesriptions()}
                  </Col>
                  <Col span={24}>
                     <span className="box-two-tour-surround__name-price">
                        {(price*1).toLocaleString('vi-VN', {
                                                                                 style: 'currency',
                                                                                 currency: 'VND'
                                                                              })}
                        {/* <small className="box-two-tour-surround__name-price--unit">VND</small> */}
                     </span>
                  </Col>
               </Row>
            </Col>
         </Row>
         </Col>
)}
export default withRouter(GroupTour);

