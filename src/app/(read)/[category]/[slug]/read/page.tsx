import EbookProvider, { EbookContextPageState } from '@/provider/pdf/context';
import Read from './Read';
import { Noto_Serif, Lora, Merriweather, Roboto_Slab, EB_Garamond } from 'next/font/google';
import { cn } from '@/lib/utils';

const noto = Noto_Serif({
    variable: '--font-noto-serif',
    subsets: ['latin']
});
const lora = Lora({
    variable: '--font-lora',
    subsets: ['latin']
});

const merriweather = Merriweather({
    variable: '--font-merriweather',
    subsets: ['latin'],
    weight: ['300', '400', '700', '900']
});

const robotoSlab = Roboto_Slab({
    variable: '--font-roboto-slab',
    subsets: ['latin']
});

const ebGaramond = EB_Garamond({
    variable: '--font-eb-garamond',
    subsets: ['latin']
});

const stateDefault: Partial<EbookContextPageState> = {
    fileUrl: 'http://127.0.0.1:8080/e.epub',
    // fileUrl: '/go-book.pdf',
    typeFile: 'epub',
    // totalPages: 6,
//     pages: [
//         {
//             content:
//                 '<h2 style="text-align:center;">NASA</h2><p>Just a link: <a href="https://www.nasa.gov">www.nasa.gov</a> 1.</p><p>MDX cho phép bạn viết các biểu thức của JavaScript trực tiếp trong tài liệu của bạn, điều này giúp bạn tạo ra các thành phần tương tác và tích hợp chúng vào trang web của bạn.</p><p>MDX cho phép bạn viết các biểu thức của JavaScript trực tiếp trong tài liệu của bạn, điều này giúp bạn tạo ra các thành phần tương tác và tích hợp chúng vào trang web của bạn.</p><p>MDX cho phép bạn viết các biểu thức của JavaScript trực tiếp trong tài liệu của bạn, điều này giúp bạn tạo ra các thành phần tương tác và tích hợp chúng vào trang web của bạn.</p><p>MDX cho phép bạn viết các biểu thức của JavaScript trực tiếp trong tài liệu của bạn, điều này giúp bạn tạo ra các thành phần tương tác và tích hợp chúng vào trang web của bạn.</p><p>MDX cho phép bạn viết các biểu thức của JavaScript trực tiếp trong tài liệu của bạn, điều này giúp bạn tạo ra các thành phần tương tác và tích hợp chúng vào trang web của bạn.</p>',
//             pageNumber: 1
//         },
//         {
//             content: `
//                 <body>
//     <p align="center" class="style28">
//       <strong>Thùy Loan</strong>
//     </p>
//     <p align="center" class="viethead">Bước Chân Kẻ Lãng Du</p>
//     <p align="center" class="viet10 style6 style25">
//     </p>
//     <p align="center" class="style32">
//       <strong>Chương 1</strong>
//     </p>
//     <p align="center" class="style28">
//     </p>
//     <div align="justify" id="fontchu" style="LINE-HEIGHT: 150%">
//       <br clear="none">
//       <br>Khách sạn Thủy Tùng tọa lạc trên khu đất cao giữa rừng Trúc Phương. <br clear="none"><br>Đến nơi đây du khách sẽ có cảm giác sống giữa thiên nhiên thơ mộng. Cảnh đẹp nửa hoang sơ, nửa được xây dựng có sức thu hút rất lớn đối với du khách.<br clear="none"><br>Xung quanh khách sạn là đồi thông thơ mộng. Dưới chân đồi là con đường trải sỏi dẫn vào rừng, nơi có suối nước nóng và rừng nguyên sinh yên tĩnh, mát rượi một màu xanh.<br clear="none"><br>Trời còn hừng sáng mà du khách đã rời khách sạn, tản bộ vào rừng hít thở không khí trong lành.<br clear="none"><br>Tú Mai và Kim Thanh nhởn nhơ đi về phía suối mơ.<br clear="none"><br>Nước suối trong veo. Hai cô bé dắt tay nhau bước xuống. Suối chảy róc rách chớ không đổ ầm ầm. Ở đây có rất mhiều người tắm, họ té nước vào nhau vui vẻ. Tú Mai và Kim Thanh chọn một chỗ vắng khách, hai cô bé muốn tránh cái nhìn hau háu của mấy chàng trai dễ ghét. Họ đi dọc theo bờ suối. Một đoạn rất dài du khách vẫn đùa vui, tấp nập mạnh ai nấy tắm.<br clear="none"><br>Ấy vậy mà trời chưa ngả bóng du khách vội vã trở lại thành phố. Một sự việc hoàn toàn bất thường xảy ra ở đây.<br clear="none"><br>Dân chúng ở trong vùng không dám ra ngoài vào ban đêm.<br clear="none"><br>Khách sạn Thủy Tùng vắng hoe từ đêm đến sáng làm cho ông Tùng lo lắng không yên. Cả vùng đang đồn ầm lên vì cái tin cô gái trẻ thường bị bắt cóc vào ban đêm.<br clear="none"><br>Vĩnh Hưng được phái đến truy tìm thủ phạm, nhưng dù cố gắng hết mình, thủ phạm vẫn bặt vô âm tín chẳng để lại dấu vết gì, sự mất tích bí ẩn đã bao trùm không khí ở đây. Ai nấy cũng thắc mắc chẳng ai giải đáp được bài toán hóc búa ấy, không khí sợ hãi như trùm lấy mọi người, trùm lấy khu rừng Trúc Phương vốn đẹp và nổi tiếng tự bao giờ.<br clear="none"><br>Trong nhiều tháng liền khách sạn Thủy Tùng trở nên đìu hiu. Ông chủ khách sạn sống trong tâm trạng vừa lo sợ, vừa tiếc nuối.<br clear="none"><br>Có những lúc ông Tùng ngồi lặng lẽ nhìn ra trời đêm. Ông Tùng chợt rùng mình, ông sợ cả bóng đêm, nó như con quỷ đang rình mò chực chờ hại ông.<br clear="none"><br>Ông Tùng vội vào phòng đóng chặt cửa lại. Lòng ông rối rắm như tơ vò.
// 							</div>
  
// </body>
//             `,
//             pageNumber: 2
//         },
//         {
//             content: `<body>
//     <p align="center" class="style28">
//       <strong>Thùy Loan</strong>
//     </p>
//     <p align="center" class="viethead">Bước Chân Kẻ Lãng Du</p>
//     <p align="center" class="viet10 style6 style25">
//     </p>
//     <p align="center" class="style32">
//       <strong>Chương 1</strong>
//     </p>
//     <p align="center" class="style28">
//     </p>
//     <div align="justify" id="fontchu" style="LINE-HEIGHT: 150%">
//       <br clear="none">
//       <br>Khách sạn Thủy Tùng tọa lạc trên khu đất cao giữa rừng Trúc Phương. <br clear="none"><br>Đến nơi đây du khách sẽ có cảm giác sống giữa thiên nhiên thơ mộng. Cảnh đẹp nửa hoang sơ, nửa được xây dựng có sức thu hút rất lớn đối với du khách.<br clear="none"><br>Xung quanh khách sạn là đồi thông thơ mộng. Dưới chân đồi là con đường trải sỏi dẫn vào rừng, nơi có suối nước nóng và rừng nguyên sinh yên tĩnh, mát rượi một màu xanh.<br clear="none"><br>Trời còn hừng sáng mà du khách đã rời khách sạn, tản bộ vào rừng hít thở không khí trong lành.<br clear="none"><br>Tú Mai và Kim Thanh nhởn nhơ đi về phía suối mơ.<br clear="none"><br>Nước suối trong veo. Hai cô bé dắt tay nhau bước xuống. Suối chảy róc rách chớ không đổ ầm ầm. Ở đây có rất mhiều người tắm, họ té nước vào nhau vui vẻ. Tú Mai và Kim Thanh chọn một chỗ vắng khách, hai cô bé muốn tránh cái nhìn hau háu của mấy chàng trai dễ ghét. Họ đi dọc theo bờ suối. Một đoạn rất dài du khách vẫn đùa vui, tấp nập mạnh ai nấy tắm.<br clear="none"><br>Ấy vậy mà trời chưa ngả bóng du khách vội vã trở lại thành phố. Một sự việc hoàn toàn bất thường xảy ra ở đây.<br clear="none"><br>Dân chúng ở trong vùng không dám ra ngoài vào ban đêm.<br clear="none"><br>Khách sạn Thủy Tùng vắng hoe từ đêm đến sáng làm cho ông Tùng lo lắng không yên. Cả vùng đang đồn ầm lên vì cái tin cô gái trẻ thường bị bắt cóc vào ban đêm.<br clear="none"><br>Vĩnh Hưng được phái đến truy tìm thủ phạm, nhưng dù cố gắng hết mình, thủ phạm vẫn bặt vô âm tín chẳng để lại dấu vết gì, sự mất tích bí ẩn đã bao trùm không khí ở đây. Ai nấy cũng thắc mắc chẳng ai giải đáp được bài toán hóc búa ấy, không khí sợ hãi như trùm lấy mọi người, trùm lấy khu rừng Trúc Phương vốn đẹp và nổi tiếng tự bao giờ.<br clear="none"><br>Trong nhiều tháng liền khách sạn Thủy Tùng trở nên đìu hiu. Ông chủ khách sạn sống trong tâm trạng vừa lo sợ, vừa tiếc nuối.<br clear="none"><br>Có những lúc ông Tùng ngồi lặng lẽ nhìn ra trời đêm. Ông Tùng chợt rùng mình, ông sợ cả bóng đêm, nó như con quỷ đang rình mò chực chờ hại ông.<br clear="none"><br>Ông Tùng vội vào phòng đóng chặt cửa lại. Lòng ông rối rắm như tơ vò.
// 							</div>
  
// </body>
//             `,
//             pageNumber: 3
//         },
//         {
//             content: '## NASA\nJust a link: www.nasa.gov 4.',
//             pageNumber: 4
//         },
//         {
//             content: '## NASA\nJust a link: www.nasa.gov 5.',
//             pageNumber: 5
//         },
//         {
//             content: '## NASA\nJust a link: www.nasa.gov 6.',
//             pageNumber: 6
//         }
//     ]
    // images: [
    //     {
    //         alt: 'image 1',
    //         id: '1',
    //         pageNumber: 1,
    //         url: '/page-1.jpg'
    //     },
    //     {
    //         alt: 'image 2',
    //         id: '2',
    //         pageNumber: 2,
    //         url: '/page-1.png'
    //     }
    // ]
};
const EbookPage = () => {
    return (
        <div
            className={cn(
                noto.variable,
                lora.variable,
                merriweather.variable,
                robotoSlab.variable,
                ebGaramond.variable
            )}
        >
            <EbookProvider init={stateDefault}>
                <Read />
            </EbookProvider>
        </div>
    );
};

export default EbookPage;
