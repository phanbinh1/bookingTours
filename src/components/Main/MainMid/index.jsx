import React, {useState,useEffect} from 'react';
import GroupCarts from "./GroupCarts";
import {Row, Col} from 'antd';

function MainMid() {
   const [cartFixData, setCartFixData] = useState('');
   const cartTourName = localStorage.getItem('keySelect');

   const renderCartTourData=() => {

      if(localStorage.getItem('keySelect') !== null){
         let cartTourSelect = localStorage.getItem('keySelect').split(',');
         if(cartTourSelect.length > 3){
            for(let i = 0; i < (cartTourSelect.length-3); i++){
               localStorage.removeItem(cartTourSelect[i]);
            }
            cartTourSelect.splice(0, (cartTourSelect.length-3));
            localStorage.setItem("keySelect", cartTourSelect.join());
         }
         return localStorage.getItem('keySelect').split(',').map((cartData, cartIndex) => {
            return(
               <GroupCarts key={`cartData-${cartIndex}`}
               cartData= {JSON.parse(localStorage.getItem(cartData))}
               setCartFixData = {setCartFixData}
               cartFixData = {cartFixData}
                />
            )
         })
      } 
   }
  return (
<>
<Row className="overview-container mid">
        <Col className="tours__media" style={{margin:"0 auto", marginTop:"15px"}}>
            <Row gutter={30}>
               <Col  lg={{span:8}}  md={{span:12}} sm={{span:24}}>
                  <div >
                     <img src="https://img.icons8.com/color/48/000000/check-all.png"/>
                     <span className="selecive-mid-tour mid__selecive">Tour chọn lọc </span><span className="quality-mid-tour mid__selecive--quality">chất lượng nhất</span>
                  </div>
               </Col>
               <Col  lg={{span:8}}  md={{span:12}} sm={{span:24}}>
                  <div >
                     <img src="https://img.icons8.com/color/48/000000/check-all.png"/>
                     <span className="selecive-mid-tour mid__selecive">Bảo đảm </span><span className="quality-mid-tour mid__selecive--quality">giá tốt nhất</span>
                  </div>
               </Col>
               <Col  lg={{span:8}}  md={{span:12}} sm={{span:24}}>
                  <div >
                     <img src="https://img.icons8.com/color/48/000000/check-all.png"/>
                     <span className="selecive-mid-tour mid__selecive">Đội ngũ tư vấn </span><span className="quality-mid-tour mid__selecive--quality">chi tiết và tận tình</span>
                  </div>
               </Col>
            </Row>
         {cartTourName!==null&&<Row>
            <Col span={24}>
               <h2 className="recent-view-mid-tours mid__title-relate-history">Tours du lịch bạn đã xem gần đây</h2>
            </Col>
            <Col span={24} >
               <Row gutter={30}>
                  {renderCartTourData()}
               </Row>
            </Col>
         </Row>
         }
        </Col>
      </Row>
      </>
  );
}
export default MainMid;
