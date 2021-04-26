import React, { useEffect } from 'react';
import { Row, Col, Button, Card } from 'antd';
import { connect } from 'react-redux';
import { getTourCountryList} from '../../redux/actions';
import GroupToursCountry  from '../ToursListCountry/GroupToursCountry';
import { useState } from 'react';
// import './styles.scss';
function ToursListCountry({tourCountryList,getTourCountryList}) {
   useEffect(() => {
      getTourCountryList(
         {
            page: 1,
            limit: 20,
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
               onClick = {()=>{handleSearchTour(placeItem);setPlaceActive(placeIndex)}}
               id="hoverp"
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
      return filterGroupTourData.map((searchTourItem, searchTourIndex) => {
         return(
            <GroupToursCountry
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
                           <Card title="Tour trong nước" bordered={false} style={{ width: "100%" }}
                           className="hover-cart list__col-row-card-hover"
                           >
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
   const {  tourCountryList } = state.tourCountryReducer;
   return {
      tourCountryList,
   }
   };
   
const mapDispatchToProps = (dispatch) => {
   return {
      getTourCountryList: (params) => dispatch(getTourCountryList(params)),
   };
}
export default connect(mapStateToProps, mapDispatchToProps)(ToursListCountry);
