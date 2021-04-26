import React, { useEffect } from 'react';
import { Row, Col, Button, Card } from 'antd';

// import history from '../../util/history';

import { connect } from 'react-redux';
import { getSearchTourList, createSearchTour,getTourCountryList } from '../../../../redux/actions';
import GroupToursList  from './ListGroupTour';
import { useState } from 'react';
import Search from 'antd/lib/input/Search';
// import './styles.scss';


function ListRelateTour({searchTourData, tourCountryList, createSearchTour,getTourCountryList, match}) {
   useEffect(() => {
      getTourCountryList(
         {
            page: 1,
            limit: 100,
            
         }

      );
   }, []);
   const placeHot = ["Sapa", "Hà Nội", "Hạ Long", "Phú Quốc", "Miền Tây", "Đà Nẵng", "Đà Lạt", "Nha Trang", "Quy Nhơn", "Phú Yên"];
   const indexPlace = placeHot.findIndex((placeItem, indexItem)=>{
      return placeItem == match.params.placeTour
   });
   console.log("tourCountryList___tourCountryList:: ", match);
   const [placeActive, setPlaceActive] = useState(indexPlace);
   const [searchKeyTour, setSearchKeyTour] = useState(match.params.placeTour);
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
      const filterGroupTourData = tourCountryList.filter((item) => {
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
   const { tourCountryList } = state.tourCountryReducer;
   return {
      searchTourData,
      tourCountryList,
   }
   };
   
   const mapDispatchToProps = (dispatch) => {
      return {
         getTourCountryList: (params) => dispatch(getTourCountryList(params)),
         createSearchTour: (params) => dispatch(createSearchTour(params)),
      };
      }
   export default connect(mapStateToProps, mapDispatchToProps)(ListRelateTour);