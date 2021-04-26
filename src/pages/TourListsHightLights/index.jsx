import React, { useEffect } from 'react';
import { Row, Col, Button, Card } from 'antd';

import history from '../../util/history';

import { connect } from 'react-redux';
import { getSearchTourList, createSearchTour, } from '../../redux/actions';
import GroupToursList  from '../TourListsHightLights/GroupToursList';
import { useState } from 'react';
// import Search from 'antd/lib/input/Search';
// import './styles.scss';


function TourListsHightLights({searchTourData, tourTravelList, createSearchTour}) {
   useEffect(() => {
      getSearchTourList(
         {
            page: 1,
            limit: 5,
            
         }

      );
   }, []);
   const [placeActive, setPlaceActive] = useState(100);
   const [searchKeyTour, setSearchKeyTour] = useState('');
   const placeHot = ["Sapa", "Hà Nội", "Hạ Long", "Phú Quốc", "Miền Tây", "Đà Nẵng", "Đà Lạt", "Nha Trang", "Quy Nhơn", "Phú Yên"];
   const hadlePlaceHot =()=>{
      return placeHot.map((placeItem, placeIndex)=>{
         return(
         <p
          className={`"placeHot list__col-row-card-hover--place-hot" ${placeActive===placeIndex?"list__col-row-card-hover--place-active":""}`}
          id="hoverp"
          onClick = {()=>{handleSearchTour(placeItem);setPlaceActive(placeIndex)}}
          >{placeItem}</p>
         );
      })
   }

   const handleSearchTour = (value) => {
      setSearchKeyTour(value);

      
   }
   const groupSearchTour = ()=> {
      const filterGroupTourData = tourTravelList.filter((item) => {
         return (item.place.toLowerCase()).indexOf(searchKeyTour.toLowerCase()) !== -1;
      });
      console.log("filterGroupTourData-filterGroupTourData: ",filterGroupTourData);
      return filterGroupTourData.map((searchTourItem, searchTourIndex) => {
         return(
            <GroupToursList 
               key = {`search-tour-item-${searchTourIndex}`}
               searchTourItem = {searchTourItem}
            />
         );
      });
   }

  return (
     <Row>
        <Col span={24} className="list">
            <Row >
               <Col span={18} className="list__col">
               <Row gutter={30} className="list__col-row">
                  <Col span={6}>
                     <Row>
                        <Col span={24} className="list__col-row-card">
                           <Card title="Tours Nổi Bật" bordered={false} style={{ width: "100%" }} className="hover-cart list__col-row-card-hover">
                              {hadlePlaceHot()}
                           </Card>
                        </Col>
                     </Row>
                  </Col>
                  <Col span={18}>
                     {groupSearchTour()}
                  </Col>
               </Row>

               </Col>
            </Row>
        </Col>
     </Row>
  );
}

const mapStateToProps = (state) => {
   const { searchTourData } = state.searchTourReducer;
   const { tourTravelList } = state.tourTravelReducer;
   return {
      searchTourData,
      tourTravelList,
   }
   };
   
   const mapDispatchToProps = (dispatch) => {
      return {
         getSearchTourList: (params) => dispatch(getSearchTourList(params)),
         createSearchTour: (params) => dispatch(createSearchTour(params)),
      };
      }
   export default connect(mapStateToProps, mapDispatchToProps)(TourListsHightLights);