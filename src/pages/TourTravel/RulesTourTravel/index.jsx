import React, { useEffect, useState } from 'react';
import { Row, Col, Tabs, Select } from 'antd';
function RulesTourTravel(props){
   const { TabPane } = Tabs;
   return(
      <>
         <div className="rules__policy">
                           <h2>Chính sách phụ thu</h2>
                           <p>- Trẻ em dưới 5 tuổi, ăn uống và ngủ chung giường với bố mẹ. Bố mẹ tự thanh toán các chi phí phát sinh ( nếu có) của bé. Vé máy bay theo quy định của hãng.</p>
                           <p>- Phụ thu phòng đơn: 250.000VNĐ/khách/tour</p>
                           <p>- Trẻ em từ 6 -10 tuổi, tính 75% chi phí người lớn. </p>
                           <p>- Trẻ từ 11 tuổi trở lên, tính bằng chi phí người lớn.</p>
                        </div>

                        <div className="rules__regulation">
                           <h2 className="rules__regulation-1" id="rules"
                           ><u>ĐIỀU KHOẢN VÀ QUY ĐỊNH </u> </h2>
                           <Tabs defaultActiveKey="1">
                              <TabPane tab="Giá Bao Gồm" key="1" >
                                 <div className="rules__regulation-2">
                                    <h3>VẬN CHUYỂN: </h3>
                                    <p>- Xe du lịch máy lạnh đưa đón theo lịch trình. Lái xe am hiểu cung đường.</p>
                                    <h3>LƯU TRÚ: </h3>
                                    <p>- Khách sạn tiêu chuẩn 3 sao: sạch sẽ, tiện nghi: 2 khách/phòng. nếu lẻ nam, nữ sẽ ngủ 3 khách/phòng. </p>
                                    <h3>KHÁC: </h3>
                                    <p>- Các bữa ăn theo chương trình (01 bữa sáng,02 bữa chính suất 100.000 vnđ/người, 01 bữa tối BBQ 150,000 vnđ/người- nếu trời mưa sẽ chuyển sang thực đơn Lẩu).</p>
                                    <p>- Chi phí tổ chức giã bánh dày truyền thống.</p>
                                    <p>- Vé thắng cảnh tại các điểm thăm quan.</p>
                                    <p>- Hướng dẫn viên vui vẻ nhiệt tình. Lái xe am hiểu cung đường.</p>
                                    <p>- Nước uống 1 chai/ khách/ ngày.</p>
                                    <p>- Bảo hiểm du lịch mức 20.000.000VNĐ/ người/ vụ.</p>

                                 </div>


                              </TabPane>
                              <TabPane tab="Giá Không Bao Gồm" key="2">
                                 <p>- Thuế VAT.</p>
                                 <p>- Phụ thu phòng đơn.</p>
                                 <p>- Các chi phí cá nhân ngoài chương trình: điện thoại, đồ uống, giặt là...</p>
                                 <p>- Tip cho lái xe và HDV</p>
                              </TabPane>
                              <TabPane tab="Hủy Đổi" key="3">
                                 <p>- Hủy tour ngay sau khi đăng ký đến 10 ngày trước ngày khởi hành, phạt 30% trên giá tour.</p>
                                 <p>- Hủy tour trong vòng từ 5 – 10 ngày trước ngày khởi hành, phạt 50% trên giá tour.</p>
                                 <p>- Hủy tour trong vòng từ 3 – 5 ngày trước ngày khởi hành, phạt 75% trên giá tour.</p>
                                 <p>- Hủy tour trong vòng từ 0 – 3 ngày trước ngày khởi hành, phạt 100% giá trị tour.</p>
                                 <p>Ngày lễ tết không hoàn, không hủy, không đổi, không áp dụng chính sách hủy trên.</p>
                                 <p>Vé máy bay không hoàn, không hủy.</p>
                              </TabPane>
                              <TabPane tab="Lưu ý" key="4">
                                 <p>- Quý khách phải mang theo: giấy tờ tùy thân hợp pháp (CMTND hoặc Passport)</p>
                                 <p>- Quý khách nên mang theo: thuốc chống côn trùng, bàn chải đánh răng, kem đánh răng và khăn tắm riêng nếu thấy cần thiết vì điều kiện sinh hoạt ở miền núi còn nhiều hạn chế so với các thành phố lớn.</p>
                                 <p>- Lịch trình có thể được sắp xếp lại cho phù hợp từng ngày khởi hành cụ thể nhưng vẫn đảm bảo tất cả các điểm thăm quan trong chương trình.</p>
                                 <p>- Trường hợp ngày khởi hành có dưới 6 khách, lái xe có thể kiêm hướng dẫn viên. Đây là những lái xe có rất nhiều kinh nghiệm, am hiểu văn hóa địa phương.</p>
                                 <p>- Quý khách là người ăn chay vui lòng mang thêm đồ ăn chay theo để đảm bảo khẩu vị của mình.</p>
                                 <p>- Quý khách đăng ký đi tour vào các dịp từ tháng 4 đến tháng 11 hàng năm thì nên mang theo quần áo thoáng mát gọn nhẹ.</p>
                                 <p>- Trong mọi trường hợp, tốt nhất khách hàng nên mang ba lô đựng đồ hoặc vali cỡ nhỏ. Đặc biệt không được mang theo những vali quá khổ vì đi tour miền núi cỡ xe lớn nhất chúng tôi hay sử dụng là xe Hyundai County 29 chỗ không có khoang để hành lý cỡ lớn</p>
                              </TabPane>
                           </Tabs>
                        </div>
      </>
   )
}
export default RulesTourTravel;