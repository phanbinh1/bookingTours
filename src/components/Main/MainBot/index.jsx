import React, { useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import Group from './GroupTour';
import { connect } from 'react-redux';
import history from '../../../util/history';
import { getTourTravelList, getTourForeignList, getTourCountryList,getCheckTour } from '../../../redux/actions';
// import './styles.scss';
import { useState } from 'react';
function MainBot({
   cartTourIndexData,
   setCartTourIndexData,
   tourTravelList,
   tourCountryList,
   tourForeignList,
   getList,
   getTourCountryList,
   getForeignList,
   searchKey,
   getCheckTour,
   tourCheckCountry
}) {
   // index hiển thị
   const [indexCheckCountry, setIndexCheckCountry] =useState(0);
   const [indexMoreCountry, setIndexMoreCountry] =useState(0);

   useEffect(() => {
      getForeignList(
         {
            page: 1,
            limit: 6,
         }
      );

      getTourCountryList(
         {
            page: 1,
            limit: 6,
         }
      )
      // getCheckTour(
      //    {
      //       page: 2,
      //       limit: 2
      //    })
      }, []);
   //page 2
   useEffect(() => {
      
      getTourCountryList(
         {
            page: 1,
            limit: 6 + indexMoreCountry,
         }
      )
      }, [indexMoreCountry]);
   //page 3
   useEffect(() => {
      getCheckTour(
         {
            page: 2 + indexCheckCountry,
            limit: 6
         }
      )
   }, [indexCheckCountry]);
   
   const handleShowMoreCountry = () =>{
      setIndexCheckCountry(indexCheckCountry + 1);
      setIndexMoreCountry(indexMoreCountry + 6);
      
   }
   //box tour trong nước
   const renderTourInCountry=() => {
      return tourCountryList.map((group, index) => {
         return(
            <Group key={`tour-in-country-${index}`}
            groupIndex={index}
            id={group.id}
            image={group.image}
            place={group.place}
            name={group.name}
            day={group.day}
            transports={group.transports}
            descriptions={group.descriptions}
            price={group.price}
            cartTourIndexData={cartTourIndexData}
            setCartTourIndexData={setCartTourIndexData}
            />
         )
      })
   }
   //box tour nước ngoài
   const renderTourForeign=() => {
      return tourForeignList.map((group, index) => {
         return(
            <Group key={`tour-foreign-${index}`}
            groupIndex={index}
            id={group.id}
            image={group.image}
            place={group.place}
            name={group.name}
            day={group.day}
            transports={group.transports}
            descriptions={group.descriptions}
            price={group.price}
            cartTourIndexData={cartTourIndexData}
            setCartTourIndexData={setCartTourIndexData}
            />
         )
      })
   }

   return(
      <>
         <Row className="tours-fluid-container tours">
            <Col className="tours__media" span={18} style={{margin:"0 auto"}}>
               <Row>
                  <Col span={24}>
                     <Row>
                        <Col span={24} className="show-tours tours__title">
                        <h3>Tour trong nước</h3>
                           <span onClick={()=>{history.push("/tours-list-country")}} >XEM THÊM TOURS </span>
                        
                        </Col>
                     </Row>
                  </Col>
               </Row>
               <Row gutter={30} className="tour-bottom tours__box">
                  {renderTourInCountry()}
               </Row>
            </Col>
            {(tourCheckCountry.length >1) && (
               <Col span={24} className="see-more tours__box--more">
                  <div 
                     className="hover-see-more tours__box--more-hover"
                     onClick={()=>{handleShowMoreCountry()}}
                  >
                     Xem thêm..
                  </div>
               </Col>
            )}
         </Row>

         <Row className="tours-fluid-container tours">
            <Col className="tours__media" span={18} style={{margin:"0 auto"}}>
               <Row>
                  <Col span={24}>
                     <Row>
                        <Col span={24} className="show-tours tours__title">
                        <h3>Tour Nước Ngoài</h3>
                        <span onClick={()=>{history.push("/tours-list-foreign")}} >XEM THÊM TOURS </span>
                        </Col>
                     </Row>
                  </Col>
               </Row>
               <Row gutter={30} className="tour-bottom tours__box">
                  {renderTourForeign()}
               </Row>
            </Col>
         </Row>
      </>
   );
}

const mapStateToProps = (state) => {
   const { tourTravelList } = state.tourTravelReducer;
   const { tourForeignList } = state.tourForeignReducer;
   const { tourCountryList,tourCheckCountry } = state.tourCountryReducer;
   return {
      tourTravelList,
      tourForeignList,
      tourCountryList,
      tourCheckCountry
   }
};

const mapDispatchToProps = (dispatch) => {
   return {
      getList: (params) => dispatch(getTourTravelList(params)),
      getForeignList: (params) => dispatch(getTourForeignList(params)),
      getTourCountryList: (params) => dispatch(getTourCountryList(params)),
      getCheckTour: (params) => dispatch(getCheckTour(params)),

   };
}
export default connect(mapStateToProps, mapDispatchToProps)(MainBot);
