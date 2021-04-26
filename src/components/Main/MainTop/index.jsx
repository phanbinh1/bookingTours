import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Carousel, Row, Col, Select } from 'antd';
import {
   getSearchTourList,
   createSearchTour,
} from '../../../redux/actions';
import history from '../../../util/history';

function MainTop({
   searchTourData,
   getSearchTourList,
}) {
   
   const handleSearchTour = (value) => {
      getSearchTourList({ searchKey: value });
   }

   const renderSearchOption = () => {
      return searchTourData.map((searchItem, searchIndex) => (
         <Select.Option
            key={`search-item-${searchIndex}`}
            value={searchItem.id}
         >
            {searchItem.name}
         </Select.Option>
      ))
   }
   return (
      <Row>
         <Col span={24} className="main-top">
            <Row>
               <Col span={24}>
                  <Carousel autoplay>
                     <div className="contentStyle-one main-top__contentStyle-one">
                     </div>
                     <div className="contentStyle-two main-top__contentStyle-two">
                     </div>
                     <div className="contentStyle-three main-top__contentStyle-three">
                     </div>
                     <div className="contentStyle-four main-top__contentStyle-four">
                     </div>
                  </Carousel>
               </Col>
            </Row>
            <Row className="search-tour-row main-top__search">
               <Col span={24}>
                  <div className="search-tour-content main-top__search-tour">
                     <div className="search-tours-title main-top__search-tour-content">
                        <div>
                           <h1 className="set-top-tours main-top__search-tour-content-title">Đặt tours du lịch!</h1>
                           <h2 className="amount-top-tours main-top__search-tour-content-amount">Hơn 300 tour du lịch Việt Nam Quốc tế</h2>
                        </div>
                        <div className="address-tours main-top__search-tour-content-address">
                           <img src="https://img.icons8.com/ios/24/000000/marker.png" />
                           <Select
                           // className='ant-select-focused'
                              showSearch
                              style={{ width: "697px", border:"none", outline: 'none' }}
                              placeholder="Bạn muốn đi đâu"
                              defaultActiveFirstOption={false}
                              showArrow={false}
                              filterOption={false}
                              onSearch={(value) => handleSearchTour(value)}
                              onSelect={(id) => history.push(`/tour-travel/${id}`)}
                              notFoundContent={null}
                           >
                              {renderSearchOption()}
                           </Select>
                        </div>
                     </div>
                  </div>
               </Col>
            </Row>

         </Col>
      </Row>
   );
}
const mapStateToProps = (state) => {
   const { searchTourData } = state.searchTourReducer;
   return {
      searchTourData,
   }
};

const mapDispatchToProps = (dispatch) => {
   return {
      getSearchTourList: (params) => dispatch(getSearchTourList(params)),
      createSearchTour: (params) => dispatch(createSearchTour(params)),
   };
}
export default connect(mapStateToProps, mapDispatchToProps)(MainTop);

