import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Select, Button } from 'antd';
import { connect } from 'react-redux';
import history from '../../util/history';

function CheckComplete({
   
}) {
   
   return(
      <Row>
         <Col span={24} style={{ margin:"0 auto",background:"#f0f0f0", height:"400px"}}>
            <Row>
               <Col span={24} style={{display:"flex", justifyContent:"center", alignItems:"center", paddingTop:"100px"}}>
                  {/* <div >
                     <h1 style={{ color:"003C71"}}>Xem lịch sử Tour</h1>
                  </div> */}
                  <div >
                     <h1 style={{ color:"#003C71", margin:"0px", padding:"0px"}}>Xem lịch sử của bạn!</h1>
                  <div style={{display:"flex", justifyContent:"center"}}
                  onClick={()=>{history.push('/checkout/check-history')}}
                  >
                  <img style={{margin:"auto", alignItems:"center", cursor:"pointer"}}  src="https://img.icons8.com/dusk/128/000000/payment-history.png"/>
                  </div>
                     {/* <Button type="button" 
                              onClick={()=>{history.push('/checkout/check-history')}}
                     >xem lịch sử</Button> */}
                  </div>
               </Col>
            </Row>
         </Col>
      </Row>
   )
}

export default CheckComplete;
