import React, { useEffect } from 'react';
import { Row, Col, Button, Card } from 'antd';

import history from '../../util/history';

import { connect } from 'react-redux';
import { getTourForeignList} from '../../redux/actions'

import GroupToursForeign  from '../ToursListForeign/GroupToursForeign';
import { useState } from 'react';
// import './styles.scss';
function ToursListForeign({tourForeignList,getTourForeignList}) {
   useEffect(() => {
      getTourForeignList(
         {
            page: 1,
            limit: 5,
         }
      );

   }, []);
   const [placeActive, setPlaceActive] = useState(100);
   const [searchKeyTour, setSearchKeyTour] = useState('');
   const placeHot = ["Canada", "New York", "Los Angeles", "Singapore","indonesia", "Hàn Quốc", "Nhật Bản"];
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
      
               const filterGroupTourData = tourForeignList.filter((item) => {
                  return (item.place.toLowerCase()).indexOf(searchKeyTour.toLowerCase()) !== -1;
               });
      return filterGroupTourData.map((searchTourItem, searchTourIndex) => {
         return(
            <GroupToursForeign
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
                           <Card title="Tour nước ngoài" bordered={false} style={{ width: "100%" }} className="hover-cart list__col-row-card-hover">
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
   const {  tourForeignList } = state.tourForeignReducer;
   return {
      tourForeignList,
   }
   };
   
   const mapDispatchToProps = (dispatch) => {
      return {
         getTourForeignList: (params) => dispatch(getTourForeignList(params)),
      };
      }
   export default connect(mapStateToProps, mapDispatchToProps)(ToursListForeign);
