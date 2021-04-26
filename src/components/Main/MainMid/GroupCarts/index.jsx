import React from 'react';
import history from '../../../../util/history';
import { Row, Col } from 'antd';
function GroupCarts({cartData, setCartFixData}) {
   //xóa card
   const handleDeleteGroup=(id)=>{
      let cartTourName = localStorage.getItem('keySelect');
      let cartTourArrayName = cartTourName.split(',');
      const cartTourIndex = cartTourArrayName.findIndex((cartIndex) => parseInt(cartIndex) === parseInt(id));
      cartTourArrayName.splice(cartTourIndex, 1);
      localStorage.removeItem(id);
      localStorage.setItem("keySelect", cartTourArrayName.join());
      if(localStorage.getItem('keySelect') === ''){
         localStorage.removeItem('keySelect');
      }
      setCartFixData(id);
   }

   return (
      <Col lg={{span:8}}  md={{span:12}} sm={{span:14}} xs={{span:16}}>
         <Row style={{ height:'120px', marginBottom:"20px"}}>
            <Col span={24} className="box-mid-card box-mid"
            >
               <img onClick={()=>history.push(`/tour-travel/${cartData.id}`)}
                src={cartData.image} alt="" className="img-mid-card box-mid__img"/>
               <div onClick={()=>history.push(`/tour-travel/${cartData.id}`)}
                className="card-content box-mid__content">
                  <div className="card-mid-name box-mid__content-div">
                     <p className="card-mid-content-name box-mid__content-div-name">{cartData.name}</p>
                  </div>
                  <div className="card-mid-price box-mid__content--price">
                     <p>{(cartData.price*1).toLocaleString('vi-VN', {
                                                                        style: 'currency',
                                                                        currency: 'VND'
                                                                     })}</p>
                  </div>
               </div>
               <div>
                  <img className="delete-mid-card box-mid__delete-card" src="https://img.icons8.com/fluent-systems-filled/13/000000/delete-sign.png"
                        onClick={() =>handleDeleteGroup(cartData.id)}
                  />
               </div>
            </Col>
         </Row>
   </Col>
   );
}
export default GroupCarts;

