import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Row, Col } from 'antd';
import './styles.css';
import {
   editTour,
   deleteTour,
} from '../../../redux/actions';
function GroupCheckTour({
   id,
   image,
   place,
   name,
   price,
   transports,
   selectDay,
   countUsers,
   editTour,
   deleteTour,
   startDays,
   day,
   userName,
   starRating
}) {
   const [indexUsers, setIndexUsers] = useState(countUsers);
   const [startSelectDate, setStartSelectDate] = useState(new Date(selectDay));
   useEffect(() => {
      editTour({
         id: id,
         image: image,
         place: place,
         name: name,
         transports: transports,
         selectDay: startSelectDate,
         countUsers: indexUsers,
         price: price,
         startDays: startDays,
         day: day,
         userName: userName,
         starRating:starRating
      });
   });
   useEffect(() => {
      setStartSelectDate(new Date(selectDay))
   }, [selectDay]);

   useEffect(() => {
      setIndexUsers(countUsers)
   }, [countUsers]);
   

   //vận chuyển
   const renderTransports = () => {
      return transports.map((item, index) => {
         return (
            <img src={item} style={{ marginRight: '8px' }} />
         );
      })
   }
   //xóa tour
   const handleDeleteTour = () => {
      deleteTour({ id: id });
   }
   //datePickerTour
   const customDay = startDays[0].split("-");
   const arrayDayMonthYear = [customDay[1], customDay[0], customDay[2]];
   const dayMonthYear = arrayDayMonthYear.join("-");
   const displays = startDays.map((startDayItem)=>{
      return parseInt(startDayItem.slice(0,2));
   })
   function addDays(date, days) {
      var result = new Date(date);
      result.setDate(result.getDate() + days);
      return result;
    }
   const displaysDay = (day) =>{
         return displays.every((display, item)=>{
            return display !== day;
         })
      }
   const datePickerTour = () => { 
          
      const isWeekday = date => {
         const days = new Date(date);
         const day = days.getDate();
         return !displaysDay(day)
      };
      return (
         <DatePicker
            selected={startSelectDate}
            onChange={date => {setStartSelectDate(date)
               editTour({
                  id: id,
                  image: image,
                  place: place,
                  name: name,
                  transports: transports,
                  selectDay: date,
                  countUsers: indexUsers,
                  price: price*indexUsers,
                  startDays: startDays,
                  day: day,
                  userName: userName,
                  starRating:starRating
               });
            }} 
            filterDate={isWeekday}
            dateFormat = 'dd/MM/yyyy'
            maxDate={addDays(new Date(dayMonthYear), 12)}
            minDate={addDays(new Date(dayMonthYear), 0)}
            dayClassName={date =>(new Date(date)).getDate() > 0 ? `${!displays.every((display, item)=>{
               return ((new Date(date)).getDate()!==display);
               }) ?"color-blue":"random"}` : undefined
            }
         />
      );
   }

   return (
      <Row>
         <Col span={24} className="check-box-tour check-box">
            <Row>
               <Col span={24} >
                  <Row className="check-row-tour check-box-row">
                     <Col span={6}>
                        <img className="check-img-tour check-box-rowimg" src={image} alt="" />

                     </Col>
                     <Col span={12} >
                        <div className="check-content-tour check-box-row">
                           <h2>{name}</h2>
                           <div>
                              <img src="https://img.icons8.com/material-rounded/14/000000/time-machine.png" />
                              <span className="group-check-day">{day}</span>
                              <span className="group-check-transports">Phương tiện:</span><span>{renderTransports()}</span>
                           </div>
                           <div className="group-check-place">
                              <span>Địa điểm : {place}</span>
                           </div>
                        </div>
                     </Col>
                     <Col span={6}>
                        <div >
                           <span className="group-check-number-users">Số Người: {indexUsers} </span>
                        </div>
                        <img className="group-check-delete-tour"
                           src="https://img.icons8.com/material-sharp/18/000000/delete-sign.png"
                           onClick={() => { handleDeleteTour() }}
                        />
                        <div className="group-check-index-users">

                           <div className="group-check-index">
                              <span
                                 onClick={() => {
                                    setIndexUsers(indexUsers + 1);
                                    editTour({
                                       id:id,
                                       image:image,
                                       place:place,
                                       name:name,
                                       transports:transports,
                                       selectDay:startSelectDate,
                                       countUsers: indexUsers + 1,
                                       price:price*(indexUsers + 1),
                                       startDays:startDays,
                                       day: day,
                                       userName: userName,
                                       starRating:starRating
                                     });
                                 }}
                              >
                                 <img src="https://img.icons8.com/ios-filled/20/000000/plus-math.png" />
                              </span>
                           </div>
                           <div className="group-check-index">
                              <span onClick={() => { if (indexUsers > 1) { 
                                 setIndexUsers(indexUsers - 1);
                                 editTour({
                                    id:id,
                                    image:image,
                                    place:place,
                                    name:name,
                                    transports:transports,
                                    selectDay:startSelectDate,
                                    countUsers: indexUsers - 1,
                                    price:price*(indexUsers - 1),
                                    startDays:startDays,
                                    day: day,
                                    userName: userName,
                                    starRating:starRating
                                  });
                                 } }} 
                              >
                                 <img src="https://img.icons8.com/android/20/000000/minus-math.png" />
                              </span>
                           </div>
                        </div>
                        <div className="group-check-start-day">
                           <span className="group-check-start">Khởi hành: </span>
                           <div>
                              {datePickerTour()}
                           </div>
                        </div>
                        <div className="group-check-price-tour">
                           <span>
                              {(price*indexUsers).toLocaleString('vi-VN', {
                                                                                 style: 'currency',
                                                                                 currency: 'VND'
                                                                              })}
                           </span>
                        </div>
                     </Col>
                  </Row>
               </Col>
            </Row>
         </Col>
      </Row>
   )
}
const mapStateToProps = (state) => {

};

const mapDispatchToProps = (dispatch) => {
   return {

      editTour: (params) => dispatch(editTour(params)),
      deleteTour: (params) => dispatch(deleteTour(params)),

   };
}
export default connect(mapStateToProps, mapDispatchToProps)(GroupCheckTour);


