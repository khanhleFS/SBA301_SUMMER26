export interface MockChapter {
  id: number
  slug: string
  chapterNum: string
  title: string
  views: string
  time: string
  words: string
  readTime: string
  paragraphs: string[]
  prevChapter: string | null
  nextChapter: string | null
}

export interface MockStory {
  id: number
  slug: string
  title: string
  author: string
  status: 'Ongoing' | 'Completed'
  genres: string[]
  imgUrl?: string
  reads: string
  publishTime: string
  rating: number
  synopsis: string[]
  chaptersCount: number
  chapters: MockChapter[]
}

export const MOCK_STORIES: MockStory[] = [
  {
    id: 1,
    slug: 'vong-am-toa-thap-neon-walker-1',
    title: 'Vọng Âm Tòa Tháp Neon: Walker',
    reads: '1.2k lượt đọc',
    publishTime: '1 giờ trước',
    author: 'Jaxon Vance',
    genres: ['Khoa học viễn tưởng', 'Cyberpunk', 'Bí ẩn'],
    status: 'Ongoing',
    rating: 4.8,
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARPl9d0G0SRjIezhhzn6eHcYJZ_mc7Jly9j8r3kCqHwh-W32H6J9P-dye66YGTVaqcHCNZBaQzKDLEXkjKZ8WJhL2Pz3k_dLNgQhFgNCwkKSZJ5F_X1x7E_uYX8GhNxJB8h31ul-kzoE0qI0qFFDN8NEIA7ODRxjUypCDVtxO0-L9xlo-NLJG0s0Dg0dQ-kKcHqxWhJAZGj5gKTWj7KDx0OJF-qUKKPxp0TR61UsORSK2S05WQAuBzWtXkjDmb9oiO5hlyCygwHw',
    synopsis: [
      "Trong những con phố ngập ánh đèn neon của Neo-Tokyo, nơi các nâng cấp điều khiển sinh học phổ biến như nước mưa, một tiếng vọng mới đang vang lên qua các tòa tháp cao vút.",
      "Walker, một AI nổi loạn với những mảnh ký ức vụn vỡ về quá khứ con người, phải tìm cách định hướng trong mạng lưới gián điệp tập đoàn đầy nguy hiểm để tìm ra sự thật về sự tồn tại của mình."
    ],
    chaptersCount: 5,
    chapters: [
      {
        id: 1,
        slug: 'chuong-1-tia-lua-dau-tien-1',
        chapterNum: 'Chương 1',
        title: 'Tia lửa đầu tiên (The First Spark)',
        views: '12k',
        time: '5 ngày trước',
        words: '2.1k từ',
        readTime: '10 phút đọc',
        paragraphs: [
          "Không khí trong kho lưu trữ của Lunaris mang mùi giấy da cũ và mùi ngọt ngào, thoang thoảng của ma thuật đang ngủ yên. Elara miết ngón tay dọc theo gáy sách của một cuốn thư tịch không tên, cảm giác tê rần chạy khắp đầu ngón tay khi đi qua các cổ tự khắc nổi. Bên ngoài, vầng trăng kép tỏa ra ánh sáng xanh bạc lạnh lẽo lên các ngọn tháp của thành phố, nhưng ở đây, dưới đáy Thư viện lớn, chỉ có ánh lửa từ ma thạch chập chờn bầu bạn.",
          "Đó là một sự im lặng nặng nề, gần như đầy mong đợi. Suốt ba chu kỳ trăng, cô đã tìm kiếm bất kỳ ghi chép nào về khe nứt màn sương. Sách lịch sử chỉ nhắc đến nó qua những lời thì thầm e ngại, coi đó là một huyền thoại sinh ra từ sự sụp đổ của Cựu Đế quốc. Nhưng những giấc mơ ám ảnh giấc ngủ của Elara—những tia chớp tím rực trời và âm thanh kính vỡ vang vọng chân trời—lại gợi ý điều ngược lại.",
          "\"Tìm thấy ngươi rồi,\" cô thì thầm, giọng nói nhẹ như hơi thở.",
          "Cuốn sách không chỉ có cảm giác lạnh; nó mang lại cảm giác trống rỗng hoàn toàn của hơi ấm. Bìa sách được bọc bằng một chất liệu trông như đá vỏ chai nhưng sờ vào lại mịn như lụa. Không có tựa đề, chỉ có một viên đá pha lê lấp lánh đính ngay giữa gáy sách. Khi ngón cái của cô chạm nhẹ vào viên ngọc, một tia sáng tím lóe lên đột ngột, soi sáng toàn bộ dãy hành lang tối tăm.",
          "Bóng tối trên tường không chỉ kéo dài ra; chúng nhảy múa, tạo nên những hình thù răng cưa kỳ lạ. Elara rụt tay lại, nhưng sự liên kết đã được thiết lập. Sự im lặng của thư viện biến mất, replace bằng tiếng vo ve trầm ấm, rung động tận xương tủy. Đây không chỉ là một cuốn sách. Đây là một chiếc chìa khóa.",
          "Cô kinh ngạc nhìn những ký tự trên trang giấy bắt đầu tự sắp xếp lại, rũ bỏ lớp mực cũ để trở thành những dòng năng lượng trắng rực rỡ. Tia lửa đầu tiên không chỉ được thắp sáng trong căn phòng—nó đã được thắp sáng ngay bên trong tâm hồn cô. Thế giới Lunaris sắp sửa khám phá ra rằng huyền thoại chỉ là những sự thật đang chờ đợi một người đủ dũng cảm mở ra trang sách.",
          "Elara cảm nhận được sức nặng của thành phố trên cao, hàng ngàn linh hồn đang ngủ say trong sự vô thức về vết nứt đang dần hình thành trong nền móng thực tại của họ. Cô ôm chặt cuốn sách vào ngực, cái lạnh giờ đây lại là một điểm tựa ấm áp đối với luồng nhiệt đang dâng trào trong huyết quản. Không thể quay đầu lại nữa rồi."
        ],
        prevChapter: null,
        nextChapter: 'chuong-2-tieng-vong-cua-nhung-nguoi-det-anh-sao-2'
      },
      {
        id: 2,
        slug: 'chuong-2-tieng-vong-cua-nhung-nguoi-det-anh-sao-2',
        chapterNum: 'Chương 2',
        title: 'Tiếng vọng của những người dệt ánh sao (The Echo of Star-Light Weavers)',
        views: '10k',
        time: '4 ngày trước',
        words: '2.4k từ',
        readTime: '12 phút đọc',
        paragraphs: [
          "Không khí bên trong Void Spire đặc quánh mùi ozone và những cuộn giấy cổ xưa. Kaelen điều chỉnh lại thế cầm bút Obsidian, bề mặt lạnh ngắt của nó cắm sâu vào lòng bàn tay anh. Anh đã hành trình qua ba kỳ trăng vượt qua Shattered Reach vì khoảnh khắc này—sự hội tụ của Bảy Mặt Trời.",
          "\"Vấn đề không chỉ đơn giản là sức mạnh,\" Liora thì thầm từ trong bóng tối, giọng nói của cô như một sợi tơ lụa giữa khoảng không im lặng. Cô bước vào vùng sáng của những viên đá phát quang lơ lửng, đôi mắt bạc phản chiếu một tương lai mà anh không chắc mình muốn chứng kiến. \"Những người dệt ánh sao không xây dựng nơi này để giấu đi bí mật của họ. Họ xây dựng nó để chôn vùi chúng.\"",
          "Kaelen ngước nhìn lên trần nhà, nơi một bản đồ ba chiều của đa vũ trụ đang nhấp nháy theo nhịp tim của anh. Mỗi nút thắt là một thế giới, và mỗi đường nối giữa chúng là một sinh mệnh đang bị Bóng tối xâm lấn hút cạn sinh lực.",
          "Sàn đá bên dưới rên rỉ. Đó không phải âm thanh dịch chuyển của đá thông thường, mà là rung động của hàng ngàn tiếng nói bị giam cầm ngay trong cấu trúc kiến trúc này. Kaelen cảm nhận được sự cộng hưởng mạnh mẽ. Cây bút Obsidian bắt đầu phát ra ánh sáng tím oải hương dịu nhẹ, phản chiếu các biểu tượng được khắc sâu vào bức tường hắc thạch.",
          "Anh bước lên một bước, và bản đồ holographic lập tức chập chờn. Một con đường mới xuất hiện—a bridge of pure light connecting the Spire to the heart of the First Sun. Đây là một nhiệm vụ cảm tử, nhưng lựa chọn thay thế chỉ là một cái chết thầm lặng cho tất cả những gì họ biết.",
          "Liora vươn tay, những ngón tay cô lướt nhẹ qua tay áo anh. \"If you do this, you won't just be Kaelen of the Reach anymore. You'll be the anchor. You'll be the one who never leaves.\"",
          "Kaelen không quay đầu lại. Anh nhìn những ngôi sao bắt đầu xếp thẳng hàng, ánh sáng rực rỡ của chúng làm lóa mắt cả những ai sinh ra từ ánh sáng. \"Dù sao thì tôi cũng chưa từng giỏi việc ở yên một chỗ,\" anh nói, và với một động tác dứt khoát duy nhất, anh cắm mạnh cây bút Obsidian vào tâm bệ đá."
        ],
        prevChapter: 'chuong-1-tia-lua-dau-tien-1',
        nextChapter: 'chuong-3-vet-nut-thoi-khong-3'
      },
      {
        id: 3,
        slug: 'chuong-3-vet-nut-thoi-khong-3',
        chapterNum: 'Chương 3',
        title: 'Vết Nứt Thời Không',
        views: '8k',
        time: '3 ngày trước',
        words: '1.8k từ',
        readTime: '9 phút đọc',
        paragraphs: [
          "Dòng thời gian bắt đầu vặn xoắn khi cây bút Obsidian kích hoạt bệ đá cổ xưa. Kaelen thấy mình lơ lửng giữa các khoảng không vô định, nơi quá khứ và tương lai giao thoa.",
          "Liora hét lên phía sau, nhưng giọng cô bị kéo giãn thành một âm điệu kỳ lạ, vô nghĩa trước khi tan biến vào khoảng không neon rộng lớn...",
          "Mọi thực tại dường như chỉ là các mảnh ghép rời rạc trong một bức tranh khổng lồ."
        ],
        prevChapter: 'chuong-2-tieng-vong-cua-nhung-nguoi-det-anh-sao-2',
        nextChapter: 'chuong-4-tan-du-hac-am-4'
      },
      {
        id: 4,
        slug: 'chuong-4-tan-du-hac-am-4',
        chapterNum: 'Chương 4',
        title: 'Tàn Dư Hắc Ám',
        views: '6k',
        time: '2 ngày trước',
        words: '2.0k từ',
        readTime: '10 phút đọc',
        paragraphs: [
          "Bóng tối trỗi dậy từ những mảnh vỡ của đa vũ trụ. Khi cây bút Obsidian phát nổ, năng lượng hắc ám tràn ra khắp nơi.",
          "Kaelen và Liora phải hợp lực để chống lại những quái thú bóng đêm đang tìm cách nuốt chửng năng lượng tinh tú còn sót lại..."
        ],
        prevChapter: 'chuong-3-vet-nut-thoi-khong-3',
        nextChapter: 'chuong-5-tien-vao-hu-vo-5'
      },
      {
        id: 5,
        slug: 'chuong-5-tien-vao-hu-vo-5',
        chapterNum: 'Chương 5',
        title: 'Tiến Vào Hư Vô',
        views: '5k',
        time: '1 ngày trước',
        words: '2.5k từ',
        readTime: '13 phút đọc',
        paragraphs: [
          "Không còn đường lùi. Cả hai quyết định bước chân qua khe nứt để tiến vào lõi của Hư Vô.",
          "Đây có thể là điểm kết thúc, hoặc là một khởi đầu hoàn toàn mới cho tất cả các thế giới liên kết."
        ],
        prevChapter: 'chuong-4-tan-du-hac-am-4',
        nextChapter: null
      }
    ]
  },
  {
    id: 2,
    slug: 'vong-am-thuy-trieu-hu-khong-petals-2',
    title: 'Vọng Âm Thủy Triều Hư Không: Petals',
    reads: '840 lượt đọc',
    publishTime: '4 giờ trước',
    author: 'Lyra Thorn',
    genres: ['Kỳ ảo', 'Hành động', 'Lãng mạn'],
    status: 'Ongoing',
    rating: 4.6,
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkcPy_iq4yX-8hoMmL0T6MvLCuFvV5DV_M3X3ebn72NoDn5Ijw5KvDgEgoxG15jRfcruLt6CozvvmrKR96_Agbj1MxPlWpLRvFCjYC64bOipc63GQDn-A5sv5kIGbirFvPXe2Y4FSa6uylXzksygob8MV7VUaalNeLfSB-ApDQrwH2oUPzR2Ljh3bS4AGSU7p2ks-cPdBgrjUJkED0RHWM197Rfq48Aq06tkwDMggqI-fHsNE3iUQjKx7ZVRwj4CrMQDwT9-rI1A',
    synopsis: [
      "Tại biên giới nơi thế giới loài người giao thoa với đại dương Hư Không, những bông hoa cánh bạc kỳ lạ bắt đầu nở rộ.",
      "Lyra Thorn, một nữ chiến binh có khả năng điều khiển thủy triều, phải hợp tác với hoàng tử bị trục xuất của vương quốc Hư Không để ngăn chặn thảm họa diệt thế."
    ],
    chaptersCount: 2,
    chapters: [
      {
        id: 1,
        slug: 'chuong-1-canh-hoa-bac-tren-song-du-1',
        chapterNum: 'Chương 1',
        title: 'Cánh hoa bạc trên sóng dữ',
        views: '5k',
        time: '2 ngày trước',
        words: '1.9k từ',
        readTime: '9 phút đọc',
        paragraphs: [
          "Sóng biển Hư Không cuộn trào sắc đen óng ánh, cuốn theo hàng triệu cánh hoa màu bạc lấp lánh..."
        ],
        prevChapter: null,
        nextChapter: 'chuong-2-loi-the-bien-ca-2'
      },
      {
        id: 2,
        slug: 'chuong-2-loi-the-bien-ca-2',
        chapterNum: 'Chương 2',
        title: 'Lời thề biển cả',
        views: '4k',
        time: '1 ngày trước',
        words: '2.1k từ',
        readTime: '10 phút đọc',
        paragraphs: [
          "Dưới sự chứng kiến của Bảy Mặt Trăng, họ trao nhau lời thề giữa lòng đại dương sóng gió..."
        ],
        prevChapter: 'chuong-1-canh-hoa-bac-tren-song-du-1',
        nextChapter: null
      }
    ]
  },
  {
    id: 3,
    slug: 'tieng-vong-trong-dem-silence-3',
    title: 'Tiếng Vọng Trong Đêm: Silence',
    reads: '450 lượt đọc',
    publishTime: '1 ngày trước',
    author: 'Sarah Blackwood',
    genres: ['Kinh dị', 'Bí ẩn'],
    status: 'Completed',
    rating: 4.5,
    imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkYAjy7SxJfyj1NOYr36ajYRP7VzxBKJ6hUGmKPv8jMjljUJTTzZho9GTB4xbsNa-Ui7ALTYVXCLORCtBGqeXnyJTgHDWQu_MzC3FGyYS13Mh7lwPGJtdIE2CZpoao-hHtT9Oe-x_lQrHTUW8z2bATQ-uLrEPyuyKeGmQD6EtiQ3aE4PRM2zh1YLnPd82J6NzPsWSPY3vvQQTgdV0BUdEr7PQTQXuie-ihTdfuYo1FIkWkfKiGtUXNGhxeH3piLjfTqe-MJDaEEA',
    synopsis: [
      "Một thị trấn hẻo lánh bỗng rơi vào trạng thái tĩnh lặng hoàn toàn vào mỗi đêm trăng khuyết.",
      "Bất kỳ ai phát ra tiếng động đều sẽ biến mất không một dấu vết. Sarah Blackwood, một phóng viên điều tra, quyết định đi tìm lời giải đáp."
    ],
    chaptersCount: 1,
    chapters: [
      {
        id: 1,
        slug: 'chuong-1-thi-tran-khong-am-thanh-1',
        chapterNum: 'Chương 1',
        title: 'Thị trấn không âm thanh',
        views: '3k',
        time: '3 ngày trước',
        words: '2.2k từ',
        readTime: '11 phút đọc',
        paragraphs: [
          "Màn đêm buông xuống và mang đi mọi thanh âm sinh hoạt bình thường. Sự tĩnh lặng đáng sợ bao trùm lấy từng căn nhà..."
        ],
        prevChapter: null,
        nextChapter: null
      }
    ]
  }
]
