import React,{useState} from 'react';
import {withRouter} from 'react-router';
import { Row, Col } from 'antd';
function GroupTour({
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
      <Col lg={{span:8}}  md={{span:12}} sm={{span:24}}
         className="box"
         onClick={()=>{handleSelectGroup(); history.push(`/tour-travel/${id}`)}}>
         <Row 
         className="row box__tour">
            <Col span={24}>
               <Row>
                  <Col span={24}  >
                        <img src={image} alt="logo" className="box__tour-image" />
                  </Col>
                  <Col span={24} className="box__tour-map">
                     <span>
                        <img src="https://img.icons8.com/offices/18/000000/marker.png"/>
                     </span>
                     <div className="box__tour-map-place" >{place}</div>
                  </Col>
               </Row>
            </Col>
            <Col span={24}>
               <Row  className="box-tour-surround__name">
                  <Col span={24} className="name-tour box-tour-surround__name-tour">
                     <span>{name}</span>
                  </Col>
                  <Col span={24} style={{position:"relative", top:"-.9rem"}}>
                     <Row>
                        <Col span={12}>
                           <img src="https://img.icons8.com/material-rounded/14/000000/time-machine.png"/>
                           <span className="box-tour-surround__name-day">{day}</span>
                        </Col>
                        <Col span={12} >
                           <span className="box-tour-surround__name-transports">{renderTransports()}</span>
                        </Col>
                     </Row>
                  </Col>
                  <Col span={24} className="box-tour-surround__name-desription">
                     {renderDesriptions()}
                  </Col>
                  <Col span={24}>
                     <span className="box-tour-surround__name-price">
                        {(price*1).toLocaleString('vi-VN', {
                                                               style: 'currency',
                                                               currency: 'VND'
                                                            })}
                     </span>
                  </Col>
               </Row>
            </Col>
         </Row>
         </Col>
)}
export default withRouter(GroupTour);

