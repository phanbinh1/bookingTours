import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Select } from 'antd';
import 'react-datepicker/dist/react-datepicker.css';
import { connect } from 'react-redux';
import Group from './GroupTour';
import history from '../../util/history';
import {FaStar} from 'react-icons/fa';
import RulesTourTravel from './RulesTourTravel';
import PaymentTour from './PaymentTour';
import {
   getTourDetail,
   createSelectTour,
   getRelateTour
} from '../../redux/actions';
import './styles.scss';
function TourTravel({
   tourDetail,
   getTourDetail,
   getRelateTour,
   match,
   createSelectTour,
   tourRelateDetail
}) {
   const [countUsers, setCountUser] = useState(2);
   const [startDate, setStartDate] = useState();
   const tourDetailId = match.params.id;
   const [rating, setRating] = useState(null);
   const [hover, setHover] = useState(null);
   useEffect(() => {
      getTourDetail(
         {
            id: tourDetailId
         }
      );
   }, [tourDetailId]);
   const placeTour = ((tourDetail.place).split(','))[0];
   useEffect(()=>{
      getRelateTour(
         {
            place: placeTour
         }
      )
   }, [placeTour]);
    //bảng ngày đi, ngày về
    const renderCalendarDays = () => {
      return tourDetail.calendarDays.map((calendarItem, calendarIndex) => {
         return(
            <tr>
               <td>{calendarItem.startDay}</td>
               <td>{calendarItem.abouttDay}</td>
               <td>Liên hệ</td>
               <td>{((tourDetail.price)*1).toLocaleString('vi-VN', {
                                                                     style: 'currency',
                                                                     currency: 'VND'
                                                                  })}</td>
            </tr>
         )
      })
   }
   const renderTransports = () => {
      return tourDetail.transports.map((item, index) => {
         return (
            <img src={item} style={{ marginRight: '8px' }} />
         );
      })
   }

   const handleSetTour = () => {
      if (localStorage.getItem("authData") !== null) {
         createSelectTour({
            userName: JSON.parse(localStorage.getItem("authData")).userName,
            id: tourDetail.id,
            image: tourDetail.image,
            place: tourDetail.place,
            name: tourDetail.name,
            transports: tourDetail.transports,
            price: tourDetail.price,
            startDays: tourDetail.startDays,
            countUsers: countUsers,
            selectDay: startDate,
            day: tourDetail.day,
            starRating:rating
         })
         
      }else{
         alert("Bạn chưa đăng nhập tài khoản!");
      }
   }
   //box tour lien quan
   const renderGroup=() => {
      return tourRelateDetail.map((group, index) => {
         if (index > 2) {
            return null;
            }
         return(
            <Group key={`tour-group-${index}`}
            groupIndex={index}
            id={group.id}
            image={group.image}
            place={group.place}
            name={group.name}
            day={group.day}
            transports={group.transports}
            descriptions={group.descriptions}
            price={group.price}
            placeTour={placeTour}
            />
         )
      })
   }
   //đánh giá
   const  starRating = () =>{
      return(
         <div>
            {[...Array(5)].map((star,i)=>{
               const ratingValue = i + 1;
               return(
                  <label>
                     <input type="radio" className="start-rating__radio"
                     name = "rating"
                     value={ratingValue}
                     onClick={()=>setRating(ratingValue)}
                     />
                     <FaStar
                     className="star"
                     color = {ratingValue <= (hover || rating)?"#ffc107":"#00abc534"}
                     size={25}
                     onMouseEnter = {()=> setHover(ratingValue)}
                     onMouseLeave = {()=> setHover(null)}
                     />
                     {/* <FaStar
                     color = {(3 >= ratingValue)?"#ffc107":"#e4e5e9"}
                     /> */}
                  </label>
               )
            })}
         </div>
      )
   }
   return (
      <Row className="row-detail">
         <Col span={18} className="col-title">
            <h1>{tourDetail.name}</h1>
         </Col>

         <Col span={18} className="col-detail">
            <Row gutter={30}>
               <Col span={16}>
                  <Row className="tour-detail">
                     <Col span={24} >
                        {/* <div dangerouslySetInnerHTML={{__html:content}}>
                     
                  </div> */}
                        <div><img className="tour-detail__image" src={tourDetail.image} alt=""  /></div>
                        <div>
                           <div>
                              <div className="tour-detail__content" >
                                 <div style={{ display: "flex" }} className="content-1">
                                    <div className="content-1__img-place-day">
                                       <img src="https://img.icons8.com/offices/18/000000/marker.png" />
                                       <span>{tourDetail.place}</span>
                                    </div>
                                    <div className="content-1__img-place-day">
                                       <img src="https://img.icons8.com/material-rounded/14/000000/time-machine.png" />
                                       <span >{tourDetail.day}</span>
                                    </div> 
                                 </div>
                                 <div className="content-2">
                                    <span className="content-2__span-1">Phương tiện: </span>
                                    <span>{renderTransports()}</span>
                                 </div>

                              </div>
                           </div>
                        </div>
                        <div className="tour-detail__title">
                           <h3 id="programme-tour"><u>GIỚI THIỆU</u> </h3>
                           <p>{tourDetail.introduction}</p>
                           <div className="tour-detail__title-img-p"><img src={tourDetail.imageIntroduction} alt={tourDetail.titleImage} /><p>{tourDetail.titleImage}</p></div>
                        </div>

                        <div className="tour-detail__calendar">
                           <h2 id="calendar"> 
                              <u>LỊCH KHỞI HÀNH</u>
                           </h2>
                           <div className="tour-detail__calendar-div">
                              <img src="https://img.icons8.com/dotty/32/000000/plus-1day.png" style={{ paddingRight: "3px", height:"40px", marginTop:"3px" }} />
                              <p>{tourDetail.start}</p>
                           </div>
                        </div>

                        <div className="tour-detail__table">
                           <table>
                              <tr>
                                 <th>Ngày khởi hành</th>
                                 <th>Ngày về</th>
                                 <th>Tình trạng</th>
                                 <th>Giá</th>
                              </tr>
                              {renderCalendarDays()}
                           </table>
                        </div>
                        <RulesTourTravel/>
                     </Col>
                  </Row>
               </Col>
               <PaymentTour tourDetail={tourDetail} handleSetTour={handleSetTour}
                  countUsers={countUsers} setCountUser={setCountUser}
                  startDate={startDate} setStartDate={setStartDate}/>
               <Col span={24} className="rating-relate">
                  <Row>
                     <Col span={24}>
                        <div className="rating-relate__evaluate">
                           <p>Đánh giá bài viết</p>
                           <p>{starRating()}</p>
                        </div>
                     </Col>
                     <Col className="rating-relate__more" span={24} >
                        <span >Tours du lịch Hạ Long liên quan</span>
                        <span
                           onClick={()=>{history.push(`/tours-list-relate/${placeTour}`)}}
                        >Xem tất cả</span>
                     </Col>
                     <Col className="rating-relate__group" span={24}>
                        <Row justify="space-around">
                           {renderGroup()}
                        </Row>
                     </Col>
                  </Row>
               </Col>
            </Row>
         </Col>
      </Row>
   );
}

const mapStateToProps = (state) => {
   const { tourDetail,tourRelateDetail } = state.tourDetailReducer;
   return {
      tourDetail,
      tourRelateDetail
   }
};

const mapDispatchToProps = (dispatch) => {
   return {
      getTourDetail: (params) => dispatch(getTourDetail(params)),
      createSelectTour: (params) => dispatch(createSelectTour(params)),
      getRelateTour: (params) => dispatch(getRelateTour(params))
   };
}
export default connect(mapStateToProps, mapDispatchToProps)(TourTravel);

