import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Select } from 'antd';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
function RulesTourTravel({tourDetail,
   handleSetTour,
   countUsers,
   setCountUser,
   startDate,
   setStartDate
}){
   // const [countUsers, setCountUser] = useState(2);
   const [startDay, setStartDay] = useState(tourDetail.start);
   // const [startDate, setStartDate] = useState();
   const [countActive, setCountActive]= useState(0);
   //scrolltoview
   const handleMovies = () => {
      var elmnt = document.getElementById("programme-tour");
      elmnt.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
    }
    const handleMoviesProgramme = () => {
      var calendar = document.getElementById("calendar");
      calendar.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
      
    }
    const handleMoviesRules = () => {
      var rules = document.getElementById("rules");
      rules.scrollIntoView({behavior: "smooth", block: "center", inline: "start"});
      
    }

    //reactdatepicker
   // const customDayMonthYear = (startDay)=>{
      // const date_ = startDay;
      const customDay = startDay.split("-");
      const arrayDayMonthYear = [customDay[1], customDay[0], customDay[2]];
      const dayMonthYear = arrayDayMonthYear.join("-");
      useEffect(() => {
         setStartDay(tourDetail.startDays[0]);
      }, [tourDetail]);
      
         useEffect(()=>{
            if(dayMonthYear !=="--"){
               setDayMonth();
            }  
         }, [startDay]);

      const setDayMonth =()=>{
         setStartDate(new Date(dayMonthYear));
      }
      console.log("startDay- startDay: ", startDay);
      const displays = (tourDetail.startDays).map((startDayItem)=>{
         return parseInt(startDayItem.slice(0,2));
      })
      function addDays(date, days) {
         var result = new Date(date);
         result.setDate(result.getDate() + days);
         console.log("dayMonthYear-dayMonthYear: ", result);
         return result;
      }

      //displayDay
      const displaysDay = (day) =>{
            return displays.every((display, item)=>{
               return display !== day;
            })
         }
      //datePickerTour
      const datePickerTour = () => {
         const isWeekday = date => {
            const days = new Date(date);
            const day = days.getDate();
            return !displaysDay(day)
         };
         return (
            <DatePicker
               selected={startDate}
               onChange={date => setStartDate(date)} 
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
   return(
      <Col span={8} >
                  <div className="box-payment">
                     <Row>
                        <Col span={24} >
                           <img className="box-payment-img" src={tourDetail.image} alt="" />
                        </Col>
                     </Row>
                     <Row className="box-payment__help">
                        <Col className="box-phone" span={24}>
                           <h4 >Đặt ngay, chỉ 2 phút. Hoặc gọi (028) 3933 8002</h4>
                        </Col>

                        <Col className="box-select" span={24}>
                           <Row >
                              <Col className="box-select__preson" span={16}>
                                 <span className="box-select__preson-count">{countUsers}</span>
                                 <span className="box-select__preson-adult">Người lớn</span>
                                 <span className="box-select__preson-price">x  
                                 {(tourDetail.price*1).toLocaleString('vi-VN', {
                                                                                 style: 'currency',
                                                                                 currency: 'VND'
                                                                              })}</span>
                              </Col>
                              <Col className="box-select__calculation" span={8}>
                                 <Row >
                                    <Col className="box-select__calculation-1" span={12}>
                                       <span style={{ position: "relative", top: "4px" }}
                                          onClick={() => { setCountUser(countUsers + 1) }}
                                       >
                                          <img src="https://img.icons8.com/ios-filled/20/000000/plus-math.png" />
                                       </span>
                                    </Col>
                                    <Col className="box-select__calculation-2" span={12}>
                                       <span
                                          onClick={() => { if (countUsers > 1) { setCountUser(countUsers - 1) } }}
                                       >
                                          <img src="https://img.icons8.com/android/20/000000/minus-math.png" />
                                       </span>
                                    </Col>
                                 </Row>
                              </Col>
                           </Row>
                        </Col>

                        <Col className="box-day" span={24}>
                           <Row >
                              <Col span={16}>
                                 <p>Chọn ngày khởi hành:</p>
                              </Col>
                              <Col className="box-day__picker-tour" span={8}>
                                 <div>
                                    {datePickerTour()}
                                 </div>


                              </Col>
                           </Row>
                        </Col>
                        <Col className="total-price" span={24}>
                           <div className="total-price__tour">Tổng giá: {
                              ((tourDetail.price)*parseFloat(countUsers)).toLocaleString('vi-VN', {
                                 style: 'currency',
                                 currency: 'VND'
                              })
                           }<span></span></div>
                        </Col>
                        <Col span={24}>
                           <div onClick={() => { handleSetTour() }}>
                              <button className="hover-set-tour"
                              >ĐẶT TOUR</button>
                           </div>
                           
                           
                        </Col>
                     </Row>

                     <Row >
                        <Col span={24} className="view__hover">
                        <div className={`hover-scroll-to-view view__hover--scroll ${countActive===1?"view-active":""} `}
                        onClick={()=>{handleMovies();setCountActive(1)}}>GIỚI THIỆU TOUR</div>
                        <div className={`hover-scroll-to-view view__hover--scroll ${countActive===2?"view-active":""} `}
                            onClick={()=>{handleMoviesProgramme();setCountActive(2)}} >LỊCH KHỞI HÀNH</div>
                        <div className={`hover-scroll-to-view view__hover--scroll ${countActive===3?"view-active":""} `}
                              onClick={()=>{handleMoviesRules(); setCountActive(3)}}>ĐIỀU KHOẢN VÀ QUY ĐỊNH</div>
                        </Col>
                     </Row>
                  </div>
               </Col>
   )
}
export default RulesTourTravel;