import React from 'react';
import { Route } from 'react-router-dom';
import history from '../util/history';
import { Select, Row, Col } from 'antd';
import Header from '../pages/Header';
import Footer from '../pages/Footer';
import SidebarAdmin from "../pages/Admin/SidebarAdmin";
import './styles.css';

function DefaultLayout({ component: Component, ...props }) {
  return (
    <Route 
    {...props}
      render={(routerProps) => (
      <>
         <Header {...routerProps}/>
         <Row className="main">
            <Col span={4} style={{backgroundColor:"#ccc"}}>
               <SidebarAdmin {...routerProps}/>
            </Col>
            <Col span={20}>
            <Component {...routerProps}/>
            </Col>
         </Row>
         <Footer {...routerProps}/>         
      </>
      )}
    />
  );
}
export default DefaultLayout;
