import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const posts = [
  {
    slug: "kinh-nghiem-di-xe-limousine-hai-phong-mong-cai",
    title: "Kinh nghiệm đi xe Limousine từ Hải Phòng đến Móng Cái",
    excerpt:
      "Một vài lưu ý nhỏ giúp hành trình Hải Phòng - Móng Cái của bạn thoải mái và chủ động hơn, từ việc chọn giờ xe đến chuẩn bị trước khi lên đường.",
    coverImage: "/images/hero-thuy-duong.jpg",
    contentHtml: `
<p>Tuyến Hải Phòng - Móng Cái là một trong những cung đường được nhiều người lựa chọn đi lại thường xuyên, từ khách du lịch, người đi công tác cho tới bà con buôn bán qua lại biên giới. Dưới đây là vài kinh nghiệm nhỏ giúp chuyến đi của bạn thuận tiện hơn.</p>
<h2>Chọn khung giờ phù hợp</h2>
<p>Xe chạy liên tục từ 4h30 sáng đến 19h tối, trung bình một tiếng một chuyến. Nếu đi vào cuối tuần hoặc dịp lễ, nên gọi đặt chỗ trước để chắc chắn có chỗ ngồi, đặc biệt các khung giờ sáng sớm và chiều muộn thường đông khách hơn.</p>
<h2>Chủ động báo điểm đón</h2>
<p>Nếu điểm đón nằm ngoài khu vực trung tâm, nên gọi trước cho tài xế hoặc tổng đài ít nhất 30 phút để được sắp xếp hợp lý, tránh trường hợp xe đã chạy qua điểm hẹn.</p>
<h2>Chuẩn bị giấy tờ nếu đi công việc biên giới</h2>
<p>Với khách đi Móng Cái vì mục đích công việc liên quan khu vực cửa khẩu, nên chuẩn bị sẵn giấy tờ tùy thân để thuận tiện khi cần xuất trình.</p>
<h2>Một vài lưu ý khác</h2>
<ul>
<li>Hành lý cồng kềnh nên báo trước để tài xế sắp xếp chỗ để phù hợp.</li>
<li>Trẻ nhỏ đi cùng nên chuẩn bị đồ ăn nhẹ vì hành trình khoảng 2 giờ 30 phút đến 3 giờ.</li>
<li>Lưu sẵn số hotline 0912 415 045 để tiện liên hệ khi cần đổi lịch hoặc hỏi thông tin.</li>
</ul>
<p>Hy vọng những lưu ý trên giúp ích cho chuyến đi của bạn. Mọi thắc mắc về lịch trình, cứ gọi trực tiếp hotline hoặc nhắn Zalo để được hỗ trợ nhanh nhất.</p>
`.trim(),
  },
  {
    slug: "diem-dung-chan-hai-phong-ha-long-mong-cai",
    title: "5 điểm dừng chân đáng chú ý trên cung đường Hải Phòng - Hạ Long - Móng Cái",
    excerpt:
      "Cung đường ven biển từ Hải Phòng qua Hạ Long tới Móng Cái đi ngang qua khá nhiều điểm dừng chân thú vị, phù hợp cho ai muốn kết hợp di chuyển với tham quan dọc đường.",
    coverImage: "",
    contentHtml: `
<p>Nếu có thời gian rộng rãi, hành trình từ Hải Phòng tới Móng Cái không nhất thiết phải đi một mạch. Dưới đây là vài điểm đáng ghé qua dọc tuyến.</p>
<h2>1. Trung tâm thành phố Hạ Long</h2>
<p>Điểm dừng phổ biến nhất, phù hợp cho khách muốn tham quan vịnh Hạ Long hoặc nghỉ ngơi giữa chặng trước khi tiếp tục hành trình ra Móng Cái.</p>
<h2>2. Khu vực Vân Đồn</h2>
<p>Nơi có sân bay Vân Đồn và nhiều bãi biển còn khá hoang sơ, phù hợp cho chuyến dừng chân ngắn ngày.</p>
<h2>3. Tiên Yên</h2>
<p>Điểm trung chuyển trên cung đường ra Móng Cái, được biết đến với một số món ăn địa phương đáng thử khi dừng nghỉ.</p>
<h2>4. Trà Cổ, Bình Ngọc (Móng Cái)</h2>
<p>Khu vực bãi biển gần biên giới, không khí yên tĩnh hơn so với các bãi biển du lịch đông đúc.</p>
<h2>5. Trung tâm thành phố Móng Cái</h2>
<p>Điểm cuối hành trình, khu vực cửa khẩu và chợ biên giới sôi động, phù hợp cho ai kết hợp chuyến đi với việc mua sắm.</p>
<p>Nếu muốn dừng chân dọc đường, bạn có thể trao đổi trước với tài xế hoặc gọi hotline 0912 415 045 để được tư vấn lịch trình phù hợp.</p>
`.trim(),
  },
  {
    slug: "vi-sao-nen-chon-xe-limousine",
    title: "Vì sao nên chọn xe Limousine thay vì xe khách thường",
    excerpt:
      "So với xe khách truyền thống, xe Limousine có một số điểm khác biệt đáng cân nhắc nếu bạn thường xuyên di chuyển tuyến Hải Phòng - Hạ Long - Móng Cái.",
    coverImage: "/images/hero-thuy-duong.jpg",
    contentHtml: `
<p>Xe Limousine ngày càng phổ biến trên các tuyến đường ngắn và trung bình như Hải Phòng - Hạ Long - Móng Cái. Dưới đây là một số điểm khác biệt so với xe khách truyền thống.</p>
<h2>Số ghế ít hơn, không gian rộng rãi hơn</h2>
<p>Xe Limousine thường bố trí ít ghế hơn xe khách thông thường, đổi lại mỗi ghế có không gian để chân rộng rãi hơn, phù hợp cho hành trình 2-3 tiếng mà không bị gò bó.</p>
<h2>Đón trả tận nơi</h2>
<p>Thay vì phải ra bến xe, khách đi Limousine thường được đón và trả tận điểm hẹn trong khu vực trung tâm, tiết kiệm thời gian di chuyển hai đầu.</p>
<h2>Tần suất chuyến dày hơn</h2>
<p>Với lịch chạy liên tục khoảng một tiếng một chuyến, khách chủ động hơn về giờ giấc, không phải chờ đợi lâu như xe chạy theo khung giờ cố định thưa hơn.</p>
<h2>Phù hợp cho công việc và du lịch ngắn ngày</h2>
<p>Với người thường xuyên di chuyển vì công việc hoặc đi du lịch ngắn ngày giữa Hải Phòng, Hạ Long, Móng Cái, xe Limousine là lựa chọn cân bằng giữa chi phí và sự thoải mái so với thuê xe riêng.</p>
<p>Thùy Dương Limousine hiện khai thác tuyến Hải Phòng - Hạ Long - Móng Cái với xe đời mới, đón trả tận nơi. Gọi hotline 0912 415 045 để được tư vấn lịch trình phù hợp.</p>
`.trim(),
  },
  {
    slug: "cam-ket-don-tra-dung-gio",
    title: "Thùy Dương Limousine: cam kết đón trả đúng giờ trên mọi chặng",
    excerpt:
      "Đúng giờ là một trong những tiêu chí quan trọng nhất khi lựa chọn xe di chuyển, đặc biệt với khách đi công việc hoặc bắt chuyến bay, chuyến tàu nối tiếp.",
    coverImage: "",
    contentHtml: `
<p>Với những khách hàng di chuyển vì công việc hoặc cần nối chuyến bay, chuyến tàu, việc xe đến đúng giờ hẹn quan trọng không kém gì mức giá.</p>
<h2>Lịch chạy cố định, dễ dự đoán</h2>
<p>Xe xuất bến liên tục từ 4h30 sáng đến 19h tối, trung bình một tiếng một chuyến, giúp khách dễ dàng lên kế hoạch mà không cần chờ đợi bất định.</p>
<h2>Tài xế thông thuộc cung đường</h2>
<p>Đội ngũ lái xe quen thuộc tuyến Hải Phòng - Hạ Long - Móng Cái giúp chủ động hơn trong việc ước lượng thời gian di chuyển, đặc biệt vào khung giờ cao điểm.</p>
<h2>Không phát sinh phụ phí bất ngờ</h2>
<p>Giá vé được báo trước rõ ràng theo từng chặng, khách không phải lo phát sinh thêm chi phí ngoài dự kiến khi lên xe.</p>
<h2>Luôn có thể liên hệ trực tiếp</h2>
<p>Trong trường hợp cần đổi giờ đón hoặc có thay đổi lịch trình đột xuất, khách có thể gọi trực tiếp hotline 0912 415 045 hoặc nhắn Zalo để được hỗ trợ kịp thời.</p>
`.trim(),
  },
];

async function main() {
  for (const post of posts) {
    const existing = await prisma.newsPost.findUnique({ where: { slug: post.slug } });
    if (existing) {
      console.log(`Bỏ qua - đã tồn tại: ${post.slug}`);
      continue;
    }
    await prisma.newsPost.create({
      data: {
        slug: post.slug,
        title: post.title,
        excerpt: post.excerpt,
        contentHtml: post.contentHtml,
        coverImage: post.coverImage || null,
        published: true,
      },
    });
    console.log(`Đã tạo bài: ${post.title}`);
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
