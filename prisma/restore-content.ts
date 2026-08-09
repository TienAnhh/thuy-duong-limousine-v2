import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const content: Record<string, string> = {
  "tuyen-hai-phong-mong-cai": `
<p>Tuyến chủ lực của Thùy Dương Limousine, kết nối trung tâm Hải Phòng với thành phố biên giới Móng Cái, phù hợp cho khách du lịch, buôn bán và đi công tác.</p>
<h2>Lịch trình và điểm dừng</h2>
<p>Xe chạy liên tục từ 4h30 sáng đến 19h tối, trung bình một tiếng một chuyến. Trên chặng Hải Phòng - Móng Cái, xe có thể đón trả tại các điểm trung tâm hoặc mở rộng tới khu vực Trà Cổ, Bình Ngọc nếu khách yêu cầu trước.</p>
<h2>Bảng giá chi tiết</h2>
<ul>
<li><b>Hải Phòng – Hải Hà, Móng Cái (trung tâm):</b> 300.000đ — Đón trả trung tâm</li>
<li><b>Hải Phòng – Móng Cái (Trà Cổ, Bình Ngọc):</b> 350.000đ — Đón trả tận nơi</li>
<li><b>Móng Cái – Trung tâm Hải Phòng:</b> 300.000đ — Đón trả tận nơi</li>
</ul>
<h2>Câu hỏi thường gặp</h2>
<h3>Xe chạy tuyến Hải Phòng - Móng Cái mất bao lâu?</h3>
<p>Trung bình khoảng 2 giờ 30 phút đến 3 giờ tùy điểm đón trả và tình hình giao thông thực tế.</p>
<h3>Có xe chuyến sớm nhất và muộn nhất lúc mấy giờ?</h3>
<p>Xe xuất bến liên tục từ 4h30 sáng đến 19h tối, cách nhau khoảng một tiếng mỗi chuyến.</p>
<h3>Đặt vé bằng cách nào?</h3>
<p>Gọi trực tiếp hotline 0912 415 045 hoặc nhắn Zalo để được tư vấn giờ chạy và điểm đón phù hợp.</p>
`.trim(),

  "dich-vu-dua-don-san-bay": `
<p>Đưa đón tận nơi từ và đến sân bay Cát Bi - Hải Phòng, phù hợp cho khách công tác, du lịch cần di chuyển đúng giờ bay.</p>
<h2>Đưa đón tận sảnh, đúng giờ bay</h2>
<p>Thùy Dương Limousine bố trí xe đón khách tận sảnh sân bay Cát Bi và đưa về các điểm trong khu vực Hải Phòng, Hạ Long, Móng Cái theo lịch trình đặt trước. Xe đời mới, khoang rộng rãi, phù hợp cho khách mang nhiều hành lý.</p>
<p>Với khách bay chuyến sớm hoặc muộn, nên đặt lịch trước ít nhất vài giờ để tài xế sắp xếp điểm đón phù hợp với giờ bay.</p>
<p>Dịch vụ phù hợp với nhiều nhóm khách khác nhau: người đi công tác cần xe chờ sẵn ngay khi hạ cánh, gia đình đi du lịch mang nhiều hành lý, hoặc đoàn khách cần di chuyển cùng lúc từ sân bay về khách sạn, bến tàu tại Hạ Long, Móng Cái.</p>
<h2>Bạn nhận được gì</h2>
<ul>
<li><b>Đón tận sảnh:</b> Tài xế chờ sẵn ngay khu vực ra sân bay, không phải tìm xe hay di chuyển ra bãi đỗ xa.</li>
<li><b>Theo dõi giờ bay:</b> Chủ động điều chỉnh giờ đón khi chuyến bay đến sớm hoặc trễ hơn dự kiến.</li>
<li><b>Hỗ trợ hành lý:</b> Tài xế hỗ trợ khuân vác, sắp xếp hành lý cồng kềnh lên xe.</li>
<li><b>Giá cố định:</b> Giá vé 300.000đ/khách được báo trước, không phát sinh phụ phí khi lên xe.</li>
</ul>
<h2>Câu hỏi thường gặp</h2>
<h3>Đặt xe đón sân bay trước bao lâu?</h3>
<p>Nên gọi hoặc nhắn Zalo trước ít nhất 3-4 giờ để tài xế sắp xếp lịch trình phù hợp.</p>
<h3>Nếu chuyến bay bị trễ giờ thì sao?</h3>
<p>Tài xế sẽ theo dõi và điều chỉnh giờ đón theo giờ hạ cánh thực tế, khách nên báo lại qua hotline khi có thay đổi.</p>
<h3>Xe có đưa khách tới tận khách sạn ở Hạ Long, Móng Cái không?</h3>
<p>Có, sau khi đón tại sân bay Cát Bi, xe đưa khách tận nơi lưu trú dọc tuyến Hải Phòng - Hạ Long - Móng Cái.</p>
`.trim(),

  "dich-vu-thue-xe-limousine": `
<p>Cho thuê nguyên xe Limousine theo chuyến hoặc theo ngày, phù hợp cho đoàn khách đi lễ hội, du lịch, công tác hoặc sự kiện riêng.</p>
<h2>Chủ động lịch trình theo nhu cầu đoàn</h2>
<p>Ngoài các chuyến chạy tuyến cố định, Thùy Dương Limousine nhận cho thuê nguyên xe theo yêu cầu: đi trong ngày, đi nhiều ngày, hoặc thuê trọn chuyến cho đoàn khách riêng. Lịch trình, điểm dừng và giờ khởi hành do khách chủ động sắp xếp.</p>
<p>Phù hợp với các đoàn đi lễ hội, tham quan Hạ Long - Móng Cái, đoàn công ty đi công tác hoặc gia đình đi du lịch nhiều điểm trong ngày.</p>
<h2>Dòng xe Limousine 9 chỗ chạy full cao tốc</h2>
<p>Xe sử dụng ghế bọc da, bố trí khoang rộng rãi, phù hợp cho hành trình dài hoặc di chuyển qua nhiều điểm tham quan trong một ngày mà không cần đổi phương tiện. Tài xế thông thuộc các cung đường cao tốc ven biển nên có thể tư vấn thêm lịch trình, điểm dừng nghỉ hợp lý cho đoàn.</p>
<h2>Bạn nhận được gì</h2>
<ul>
<li><b>Tư vấn lịch trình:</b> Gợi ý điểm dừng, thời gian di chuyển hợp lý cho hành trình riêng của đoàn.</li>
<li><b>Xe đời mới:</b> Ghế bọc da, khoang rộng rãi, phù hợp đi đường dài nhiều điểm trong ngày.</li>
<li><b>Báo giá minh bạch:</b> Giá thuê theo chuyến hoặc theo ngày được báo trước, không phát sinh khi kết thúc hành trình.</li>
<li><b>Phục vụ mọi quy mô:</b> Nhận cả đoàn nhỏ gia đình lẫn đoàn công ty, nhóm lễ hội đông người.</li>
</ul>
<h2>Câu hỏi thường gặp</h2>
<h3>Thuê xe theo ngày tính giá như thế nào?</h3>
<p>Giá được báo cụ thể theo quãng đường và số ngày sử dụng, khách liên hệ hotline để nhận báo giá chi tiết.</p>
<h3>Có thể thuê xe đi ngoài tuyến Hải Phòng - Móng Cái không?</h3>
<p>Có, khách có thể thỏa thuận lịch trình riêng ngoài các tuyến cố định, tùy theo khoảng cách và thời gian sử dụng.</p>
<h3>Xe thuê theo đoàn có giới hạn số điểm dừng không?</h3>
<p>Không giới hạn, lịch trình và số điểm dừng do đoàn khách chủ động sắp xếp cùng tài xế trước chuyến đi.</p>
`.trim(),

  "dich-vu-gui-hang": `
<p>Nhận gửi hàng hóa, bưu kiện, giấy tờ trên tuyến Hải Phòng - Hạ Long - Móng Cái, tận dụng lịch xe chạy liên tục để giao hàng nhanh trong ngày.</p>
<h2>Tận dụng lịch xe liên tục để giao hàng nhanh</h2>
<p>Vì xe chạy liên tục mỗi tiếng một chuyến từ 4h30 đến 19h, Thùy Dương Limousine nhận gửi kèm hàng hóa, bưu kiện, giấy tờ giữa các điểm trên tuyến mà không cần chờ đợi lâu như các đơn vị vận chuyển truyền thống.</p>
<p>Phù hợp cho các mặt hàng cần giao nhanh trong ngày như giấy tờ công việc, hàng mẫu kinh doanh, hoặc đồ gửi cho người thân giữa hai đầu tuyến.</p>
<h2>Quy trình gửi hàng đơn giản</h2>
<p>Khách gọi hotline hoặc nhắn Zalo báo loại hàng, khối lượng và điểm nhận - trả. Hàng được ký gửi lên chuyến xe gần nhất, người nhận ra điểm hẹn để nhận trực tiếp từ tài xế, không cần chờ nhân viên giao tận nhà.</p>
<h2>Bạn nhận được gì</h2>
<ul>
<li><b>Giao trong ngày:</b> Hàng hóa đi theo lịch xe chạy liên tục, thường tới nơi trong cùng ngày gửi.</li>
<li><b>Đúng giờ, đúng hẹn:</b> Tuyến cao tốc cố định giúp hàng đến đúng khung giờ đã báo, hạn chế trễ hẹn.</li>
<li><b>Chi phí hợp lý:</b> Cước tính theo khối lượng và quãng đường, cạnh tranh hơn dịch vụ chuyển phát truyền thống.</li>
<li><b>Hỗ trợ qua hotline:</b> Tư vấn và nhận gửi hàng nhanh chóng qua điện thoại hoặc Zalo.</li>
</ul>
<h2>Câu hỏi thường gặp</h2>
<h3>Gửi hàng mất bao lâu để tới nơi?</h3>
<p>Tùy chuyến khởi hành gần nhất, thông thường hàng được giao trong cùng ngày gửi.</p>
<h3>Cước phí gửi hàng tính như thế nào?</h3>
<p>Cước được tính theo khối lượng, kích thước và quãng đường, khách gọi hotline để được báo giá cụ thể trước khi gửi.</p>
<h3>Người nhận cần làm gì khi hàng tới?</h3>
<p>Người nhận ra điểm hẹn đã thống nhất trước để nhận trực tiếp từ tài xế khi xe tới điểm dừng gần nhất.</p>
`.trim(),
};

async function main() {
  for (const [slug, bodyHtml] of Object.entries(content)) {
    const page = await prisma.page.findUnique({ where: { slug } });
    if (!page) {
      console.log(`Bỏ qua - không tìm thấy trang: ${slug}`);
      continue;
    }
    await prisma.page.update({ where: { slug }, data: { bodyHtml } });
    console.log(`Đã cập nhật nội dung: ${slug}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
