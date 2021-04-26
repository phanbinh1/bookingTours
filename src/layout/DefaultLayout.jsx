import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../pages/Header';
import Footer from '../pages/Footer';
import './styles.css';
function DefaultLayout({ component: Component, ...props }) {
  return (
    <Route 
    {...props}
      render={(routerProps) => (
        <>
          
          <Header {...routerProps}/>
          <div className="main">
          <Component {...routerProps} 
          />
          </div>
          <Footer {...routerProps}/>
        </>
      )}
    />
  );
}
export default DefaultLayout;
