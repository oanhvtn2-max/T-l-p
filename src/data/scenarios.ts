import { Scenario } from '../types/gdcd';

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: 'Sáng thức dậy',
    category: 'Sinh hoạt cá nhân',
    characterName: 'Minh An',
    storyContext:
      '6 giờ sáng, tiếng chuông đồng hồ báo thức vang lên đều đặn bên cạnh giường. Ngoài phòng khách, mẹ vẫn đang bận chuẩn bị đồ ăn sáng nên chưa vào gọi bạn dậy như mọi ngày.',
    question: 'Chuông báo thức kêu nhưng mẹ chưa gọi dậy. Bạn sẽ làm gì?',
    options: [
      'Tắt chuông báo thức rồi nằm ngủ thêm 15 phút nữa chờ mẹ gọi.',
      'Tự tắt báo thức, gấp chăn màn và chuẩn bị cá nhân.',
      'Gọi to nhờ mẹ vào đánh thức và lấy giúp đồng phục đi học.',
      'Mặc kệ tiếng chuông reo, trùm chăn kín đầu để ngủ tiếp.',
    ],
    correctIndex: 1,
    explanation:
      'Tự lập bắt đầu từ việc chủ động trong sinh hoạt cá nhân. Khi biết tự giác thức dậy đúng giờ, dọn dẹp giường ngủ và vệ sinh cá nhân, bạn không chỉ giảm bớt gánh nặng cho bố mẹ mà còn rèn luyện tác phong nhanh nhẹn, trách nhiệm với bản thân.',
    lessonCore: 'Chủ động trong sinh hoạt cá nhân hằng ngày',
    icon: 'alarm',
  },
  {
    id: 2,
    title: 'Việc nhà',
    category: 'Trách nhiệm gia đình',
    characterName: 'Minh An',
    storyContext:
      'Chiều đi học về, trời bắt đầu nổi gió se lạnh. Bạn thấy giàn quần áo ngoài ban công đã khô ráo nhưng mẹ đi làm vẫn chưa kịp về thu dọn.',
    question: 'Quần áo đã khô nhưng mẹ đi vắng chưa thu. Bạn xử lý ra sao?',
    options: [
      'Để nguyên ngoài ban công vì nghĩ đó là việc của người lớn.',
      'Chỉ lấy riêng bộ đồ của mình vào, còn lại để mẹ tự thu.',
      'Tự giác thu quần áo vào gấp gọn gàng.',
      'Chơi điện tử trước, đợi khi nào mẹ về thì nhắc mẹ thu.',
    ],
    correctIndex: 2,
    explanation:
      'Chia sẻ công việc gia đình là biểu hiện của người tự lập. Những việc vừa sức như thu dọn, gấp quần áo giúp bạn biết quan tâm đến gia đình, sống có trách nhiệm và không ỷ lại vào cha mẹ.',
    lessonCore: 'Tự giác chia sẻ việc nhà phù hợp lứa tuổi',
    icon: 'shirt',
  },
  {
    id: 3,
    title: 'Học tập',
    category: 'Tự lập trong học tập',
    characterName: 'Minh An',
    storyContext:
      'Buổi tối, khi làm bài tập Toán nâng cao, bạn gặp một bài toán khá hóc búa. Nghĩ mãi vài phút vẫn chưa ra hướng giải ngay lập tức.',
    question: 'Bài tập về nhà khó, bạn chưa tìm ra lời giải. Bạn quyết định thế nào?',
    options: [
      'Mở điện thoại tìm bài giải mẫu trên mạng rồi chép nguyên văn vào vở.',
      'Đọc lại sách giáo khoa, suy nghĩ tìm cách giải quyết trước khi nhờ trợ giúp.',
      'Bỏ trống bài tập đó và sang lớp mượn vở bạn để chép lại.',
      'Nhờ bố mẹ hoặc anh chị làm giúp toàn bộ để nộp cho nhanh.',
    ],
    correctIndex: 1,
    explanation:
      'Tự lập trong học tập giúp phát triển tư duy sáng tạo. Việc tự đọc lại kiến thức nền tảng, thử nhiều cách tiếp cận trước khi hỏi thầy cô hay bạn bè sẽ giúp bạn hiểu sâu bản chất và ghi nhớ kiến thức lâu bền.',
    lessonCore: 'Tự tìm tòi, suy nghĩ trước khi tìm sự hỗ trợ',
    icon: 'book',
  },
  {
    id: 4,
    title: 'Quản lý thời gian',
    category: 'Kỷ luật bản thân',
    characterName: 'Minh An',
    storyContext:
      'Đúng 19 giờ 30 phút theo thời gian biểu tự học hằng ngày, nhưng trên ti vi lại đang phát tập phim hoạt hình mà bạn chờ đón suốt cả tuần.',
    question: 'Đến giờ học bài nhưng ti vi đang chiếu phim hoạt hình yêu thích. Bạn sẽ làm gì?',
    options: [
      'Ngồi xem hết tập phim rồi mới học, dù muộn giờ đi ngủ.',
      'Vừa bật ti vi xem vừa mở vở làm bài tập cho đỡ chán.',
      'Tắt ti vi, ngồi vào bàn học đúng giờ theo thời gian biểu.',
      'Xin phép bố mẹ cho nghỉ học tối nay để xem phim thoải mái.',
    ],
    correctIndex: 2,
    explanation:
      'Kỷ luật bản thân là cốt lõi của tính tự lập. Biết tự kiểm soát ham muốn tức thời để tuân thủ kế hoạch học tập chứng tỏ bạn làm chủ được thời gian và hành động của chính mình.',
    lessonCore: 'Giữ kỷ luật bản thân theo kế hoạch đã đề ra',
    icon: 'tv',
  },
  {
    id: 5,
    title: 'Chuẩn bị đồ dùng',
    category: 'Tính chủ động',
    characterName: 'Minh An',
    storyContext:
      'Tối thứ Tư, sau khi học bài xong, bạn nhớ ra sáng thứ Năm có tiết Thực hành Thủ công / Mỹ thuật nhưng vẫn chưa soạn kéo, giấy màu và hồ dán vào cặp.',
    question: 'Sáng mai có tiết thủ công/Mỹ thuật nhưng tối nay bạn chưa chuẩn bị dụng cụ. Bạn chọn cách nào?',
    options: [
      'Tự kiểm tra lại thời khóa biểu và chuẩn bị đầy đủ đồ dùng từ tối hôm trước.',
      'Đi ngủ sớm, sáng mai thức dậy rồi tìm vội sau.',
      'Nghĩ rằng sáng mai sang lớp mượn tạm đồ dùng của bạn ngồi cùng bàn.',
      'Nhờ mẹ chuẩn bị giúp cặp sách trong khi mình đi ngủ trước.',
    ],
    correctIndex: 0,
    explanation:
      'Chủ động chuẩn bị giúp không bị động, bối rối. Thói quen sắp xếp sách vở, dụng cụ học tập từ tối hôm trước giúp buổi sáng đi học nhẹ nhàng, tự tin và không làm phiền bạn bè xung quanh.',
    lessonCore: 'Chủ động chuẩn bị chu đáo cho công việc ngày mới',
    icon: 'palette',
  },
  {
    id: 6,
    title: 'Giải quyết mâu thuẫn',
    category: 'Ứng xử với bạn bè',
    characterName: 'Minh An',
    storyContext:
      'Trong buổi thảo luận nhóm môn Khoa học tự nhiên, bạn và người bạn thân bất đồng quan điểm về cách trình bày sản phẩm nên cả hai nói lời giận dỗi nhau.',
    question: 'Cãi nhau với bạn thân về bài tập nhóm. Bạn sẽ ứng xử như thế nào?',
    options: [
      'Cắt đứt liên lạc, nói xấu bạn với các bạn khác trong lớp.',
      'Giữ im lặng chờ bạn kia phải chủ động xin lỗi trước.',
      'Chủ động nhắn tin hoặc gặp trực tiếp để trò chuyện, tháo gỡ hiểu lầm thay vì chờ người khác xin lỗi.',
      'Xin cô giáo chuyển sang nhóm khác ngay lập tức để không phải gặp mặt.',
    ],
    correctIndex: 2,
    explanation:
      'Tự lập trong quan hệ xã hội thể hiện sự trưởng thành. Khi biết lắng nghe, bình tĩnh đối thoại và tự giải quyết bất đồng một cách văn minh, bạn sẽ giữ được tình bạn bền chặt và giải quyết tốt công việc chung.',
    lessonCore: 'Bình tĩnh, chủ động giải quyết mâu thuẫn bằng đối thoại',
    icon: 'message',
  },
  {
    id: 7,
    title: 'Tiền bạc & Chi tiêu',
    category: 'Quản lý tài chính',
    characterName: 'Minh An',
    storyContext:
      'Đầu tuần, bố mẹ tin tưởng giao cho bạn một khoản tiền tiêu vặt cố định để tự chủ động chi tiêu cho ăn sáng nhẹ, đồ dùng học tập nhỏ hoặc tiết kiệm.',
    question: 'Được bố mẹ cho tiền tiêu vặt tuần này. Bạn quyết định thế nào?',
    options: [
      'Tiêu hết ngay trong hai ngày đầu để mua đồ ăn vặt và đồ chơi.',
      'Lập kế hoạch chi tiêu hợp lý, để dành mua sách vở cần thiết.',
      'Cho bạn bè vay hết mà không ghi chép hay tính toán.',
      'Mua đồ theo sở thích nhất thời rồi giữa tuần xin thêm bố mẹ.',
    ],
    correctIndex: 1,
    explanation:
      'Quản lý tài chính cá nhân là kỹ năng sống quan trọng của người tự lập. Biết phân biệt giữa "cái mình cần" và "cái mình thích", biết tiết kiệm giúp bạn sử dụng đồng tiền có ý nghĩa và trân trọng công sức lao động của cha mẹ.',
    lessonCore: 'Lập kế hoạch chi tiêu và tiết kiệm hợp lý',
    icon: 'wallet',
  },
  {
    id: 8,
    title: 'Đi học ngày mưa',
    category: 'Ý thức tự giác',
    characterName: 'Minh An',
    storyContext:
      'Sáng sớm chuẩn bị dắt xe đi học thì ngoài trời bất ngờ đổ cơn mưa rào. Chiếc áo mưa của bạn đang được phơi ở khu vực để đồ tầng dưới.',
    question: 'Trời đổ mưa to đúng giờ đi học nhưng áo mưa để ở tầng dưới. Bạn sẽ làm gì?',
    options: [
      'Đứng ở cửa chờ xem mẹ có đi lấy giúp hay chở đi học không.',
      'Xin nghỉ học buổi sáng hôm nay vì ngại đi trời mưa.',
      'Cứ đội mưa đi đầu trần đến trường cho nhanh.',
      'Tự xuống lấy áo mưa và mặc gọn gàng để đi học đúng giờ, không chờ người lớn nhắc.',
    ],
    correctIndex: 3,
    explanation:
      'Không ỷ lại vào thời tiết hay sự nhắc nhở của người khác. Chủ động ứng phó với tình huống thời tiết bất ngờ bằng cách tự chuẩn bị áo mưa và bảo vệ sức khỏe thể hiện tinh thần tự chủ và đúng giờ.',
    lessonCore: 'Không ỷ lại, chủ động ứng phó trước tình huống bất ngờ',
    icon: 'rain',
  },
  {
    id: 9,
    title: 'Khám phá kỹ năng mới',
    category: 'Kỹ năng sinh tồn',
    characterName: 'Minh An',
    storyContext:
      'Hôm nay bố mẹ có việc đột xuất nên về nhà muộn hơn thường lệ. Bạn muốn tự tay chuẩn bị một bữa tối đơn giản để cả nhà cùng ăn khi bố mẹ về.',
    question: 'Muốn học nấu một món ăn đơn giản cho bữa tối khi bố mẹ về muộn. Bạn chọn cách nào?',
    options: [
      'Ngồi đợi bố mẹ về rồi mới nấu vì sợ mình không làm được.',
      'Tự ý bật bếp chiên rán món phức tạp mà không tìm hiểu cách dùng bếp an toàn.',
      'Xem hướng dẫn an toàn và tự tay nấu món ăn đơn giản dưới sự quan sát an toàn.',
      'Đặt toàn bộ đồ ăn nhanh bên ngoài để đỡ phải vào bếp.',
    ],
    correctIndex: 2,
    explanation:
      'Chủ động trang bị kỹ năng sinh tồn và chăm sóc bản thân. Học nấu ăn từ những món đơn giản kết hợp tuân thủ quy tắc an toàn điện, gas, dao kéo giúp bạn tự tin chăm lo cho bản thân và gia đình.',
    lessonCore: 'Chủ động học hỏi kỹ năng sống đi đôi với an toàn',
    icon: 'chef',
  },
  {
    id: 10,
    title: 'Định hướng tương lai',
    category: 'Bản lĩnh cá nhân',
    characterName: 'Minh An',
    storyContext:
      'Đầu học kỳ mới, nhà trường mở nhiều câu lạc bộ ngoại khóa như Tin học trẻ, Bóng đá, Mỹ thuật và Hùng biện tiếng Anh. Nhóm bạn thân rủ bạn đăng ký theo họ dù bạn không hề thích môn đó.',
    question: 'Khi đứng trước lựa chọn tham gia câu lạc bộ sở thích ở trường, bạn quyết định ra sao?',
    options: [
      'Đăng ký theo số đông bạn bè cho vui dù bản thân không hứng thú.',
      'Tự suy nghĩ về sở thích, năng lực bản thân để đăng ký CLB phù hợp thay vì theo bạn bè bè phái.',
      'Không tham gia bất kỳ câu lạc bộ nào vì ngại thử thách mới.',
      'Đăng ký bừa một câu lạc bộ rồi vài buổi sau bỏ dở giữa chừng.',
    ],
    correctIndex: 1,
    explanation:
      'Tự lập trong quyết định cá nhân giúp khẳng định cái tôi tích cực. Hiểu rõ điểm mạnh, đam mê của bản thân và dám lựa chọn con đường phù hợp là bước chuẩn bị quan trọng cho định hướng nghề nghiệp tương lai.',
    lessonCore: 'Tự tin quyết định dựa trên năng lực và sở thích bản thân',
    icon: 'compass',
  },
];
