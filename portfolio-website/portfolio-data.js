/**
 * ==========================================================================
 *                     CƠ SỞ DỮ LIỆU PORTFOLIO CỦA BẠN
 * ==========================================================================
 * Tệp này chứa toàn bộ văn bản, hình ảnh, chỉ số (metrics) và liên kết.
 * Bạn chỉ cần sửa thông tin trong tệp này, trang web sẽ tự động cập nhật
 * trên trang chính và trong các cửa sổ chi tiết (modal).
 * 
 * HƯỚNG DẪN THAY ẢNH MINH CHỨNG (PROOF IMAGES):
 * 1. Copy các file ảnh của bạn vào thư mục: assets/images/
 * 2. Thay đường dẫn trong mảng `proofImages` bằng tên file tương ứng.
 *    Ví dụ: "assets/images/ten_file_anh_cua_ban.jpg"
 * 3. Nếu ảnh bị lỗi đường dẫn hoặc chưa có ảnh, hệ thống sẽ tự động hiển thị 
 *    khung nét đứt màu xám đẹp mắt ghi chữ "Ảnh minh chứng".
 * 
 * HƯỚNG DẪN THAY LINK CHIẾN DỊCH:
 * - Thay thế dấu "#" trong `proofLinkHref` bằng đường dẫn thật (ví dụ: "https://facebook.com/...")
 */

window.PORTFOLIO_DATA = {

  // ==========================================================================
  // 1. DỮ LIỆU KINH NGHIỆM LÀM VIỆC (EXPERIENCE)
  // ==========================================================================
  experiences: [
    {
      id: "dehaus-creative", // ID duy nhất viết liền không dấu, dùng để kết nối với popup
      
      // SỬA: Ngày hiển thị trên card chính và trong modal
      date: "08/2025 – 11/2025",

      // SỬA: Tên công ty / tổ chức
      company: "CANG LÊ – STRATEGY DIRECTOR AT DEKOHAUS CREATIVE",

      // SỬA: Vị trí / vai trò
      role: "Marketing Assistant",

      // SỬA: Tên dự án / chương trình
      project: "Branding & Strategic Marketing Training Programs",

      // SỬA: Mô tả ngắn gọn (nếu cần hiển thị ngoài card)
      shortCardText: "Hỗ trợ phát triển nội dung đào tạo thương hiệu chiến dịch IMC đạt 40K+ lượt xem.",

      // SỬA: Nội dung gạch đầu dòng dài trong popup chi tiết (responsibilities)
      responsibilities: [
        "Planned and created 3–4 weekly educational posts for Threads (@cunonmarketing), turning marketing case studies into content on Brand Strategy, IMC, Consumer Behavior, and Marketing Insights, contributing to posts with 200K+ views.",
        "Repurposed content across social platforms while supporting page operations and community engagement to maximize content reach.",
        "Prepared training materials, reports, and schedules while coordinating the delivery of the \"Làm Bạn Với Insight\" branding course."
      ],

      // SỬA: Các thẻ tag kỹ năng (tags)
      tags: ["Content Planning", "Case Study Analysis", "Project Coordination"],

      // SỬA: Ảnh minh chứng (2 ảnh, đặt ảnh của bạn trong assets/images/ rồi sửa đường dẫn ở đây)
      proofImages: [
        "assets/1.png",
        "assets/Screenshot 2026-07-02 113432.png"
      ],

      // SỬA: Link minh chứng / chiến dịch / bài đăng thực tế
      proofLinkHref: "https://www.instagram.com/cunonmarketing/",

      // SỬA: Nhãn chữ hiển thị trên nút liên kết của popup
      proofLinkLabel: "LINK"
    },
    {
      id: "margroup-similac",
      date: "05/2024 – 09/2024",
      company: "MARGROUP × SMAG",
      role: "Marketing Campaign Coordinator",
      project: "Similac Parent Community Campaign",
      shortCardText: "Vận hành chiến dịch Minigame và tối ưu hóa lượt tiếp cận cộng đồng cha mẹ.",
      responsibilities: [
        "Supported end-to-end execution of Similac's social media minigame, coordinating daily campaign operations and participant management.",
        "Researched and shortlisted 90+ Facebook parenting communities to optimize organic reach among parents with young children.",
        "Verified 610+ participant submissions, ensuring transparent winner selection and smooth post-campaign fulfillment.",
        "Monitored campaign performance and maintained real-time tracking reports, contributing to 15M+ total views and 952 participant interactions."
      ],
      tags: ["CAMPAIGN OPERATIONS", "ORGANIC REACH", "TRACKING REPORTS"],
      proofImages: [
        "assets/Screenshot 2026-06-25 165848.png",
        "assets/Screenshot 2026-06-26 013450.png"
      ],
      proofLinkHref: "https://www.facebook.com/share/v/18ut7QNLMM/",
      proofLinkLabel: "LINK"
    },
    {
      id: "margroup-sting",
      date: "10/2024 – 12/2024",
      company: "MARGROUP × SMAG",
      role: "Account Executive",
      project: "STING × HIEUTHUHAI Seeding",
      shortCardText: "Hỗ trợ quản lý vận hành hoạt động Seeding và KOLs cho chiến dịch Sting tại trường học.",
      responsibilities: [
        "Coordinated account operations for the STING campus campaign, serving as the liaison between internal teams and student ambassadors to ensure smooth campaign execution.",
        "Recruited 30+ student KOLs and managed a 100-member seeding network, overseeing onboarding, communication, and execution.",
        "Managed campaign trackers, booking files, and a VND 7M+ seeding budget, ensuring accurate documentation and timely execution.",
        "Coordinated campaign logistics and payment processes, contributing to social content that generated 27.3K+ reactions and 170+ shares."
      ],
      tags: ["Campaign Coordination", "Stakeholder Management", "Project Management"],
      proofImages: [
        "assets/Screenshot 2026-07-02 114816.png",
        "assets/Screenshot 2026-07-02 114859.png"
      ],
      proofLinkHref: "https://www.facebook.com/share/v/1M4YzWJH2j/",
      proofLinkLabel: "LINK"
    }
  ],

  // ==========================================================================
  // 2. DỮ LIỆU CÁC DỰ ÁN NỔI BẬT (PROJECTS)
  // ==========================================================================
  projects: [
    {
      id: "readynest",
      
      // SỬA: số thứ tự dự án
      number: "01",

      // SỬA: tên dự án
      title: "ReadyNest Parenting Platform",

      // SỬA: vai trò chi tiết
      role: "Digital Marketing Project Lead",
      
      // SỬA: khóa học / trường
      course: "Digital Marketing Project | UEH",
      
      // SỬA: thời gian
      time: "Mar – May 2026",

      // SỬA: thời gian / loại dự án trong modal
      category: "Digital Marketing Project | UEH • Mar – May 2026",

      // SỬA: mô tả bối cảnh dự án
      context: "A parent-focused digital marketing concept and integrated marketing campaign developed to solve key parenting challenges.",

      // SỬA: nhiệm vụ đã làm
      whatIDid: "Led the student marketing team, mapped out parent personas, planned strategic content touchpoints, optimized email conversion triggers, and conducted full UX/UI audits.",

      // SỬA: skill tags
      skills: ["SEO Strategy", "Email Automation", "UI/UX Audit"],

      // SỬA: số liệu / kết quả (nếu có)
      metrics: [
        { value: "1.3K+", label: "Visits / Day", theme: "lime" },
        { value: "+45%", label: "Conversion", theme: "purple" },
        { value: "130%+", label: "KPI Achieved", theme: "white" }
      ],

      // SỬA: đường dẫn ảnh minh chứng (đã cập nhật ảnh PNG thật của bạn)
      proofImages: [
        "assets/readynest-1.png", // ReadyNest website/homepage screenshot
        "assets/readynest-2.png"  // ReadyNest Facebook page screenshot
      ],

      // SỬA: link minh chứng
      proofLinkHref: "https://www.readynest.info/"
    },
    {
      id: "mystic-sip",
      
      // SỬA: số thứ tự dự án
      number: "02",

      // SỬA: tên dự án
      title: "Style by PNJ Product Launch",

      // SỬA: vai trò chi tiết
      role: "Project Member",
      
      // SỬA: khóa học / trường
      course: "IMC Project | UEH",
      
      // SỬA: thời gian
      time: "09/2025 – 12/2025",

      // SỬA: thời gian / loại dự án trong modal
      category: "IMC Project | UEH • 09/2025 – 12/2025",

      // SỬA: mô tả bối cảnh dự án
      context: "Mystic Sip is a product launch campaign concept developed for Style by PNJ as part of an IMC project at UEH.",

      // SỬA: nhiệm vụ đã làm
      whatIDid: "Developed a new product launch concept for Style by PNJ. Built an integrated marketing communication campaign including consumer insight, brand positioning, communication strategy, and launch planning. Executed campaign deliverables including TVC concept, key visual, poster design, and social media communication materials. Presented the project with strategic feedback from PNJ’s Brand Manager, connecting academic planning with real business expectations.",

      // SỬA: skill tags
      skills: [
        "IMC",
        "Product Launch",
        "Brand Positioning",
        "Communication Strategy",
        "Key Visual",
        "Social Media Materials"
      ],

      // SỬA: số liệu / kết quả (để trống vì đây là dự án concept/học thuật không có số liệu vận hành thực tế)
      metrics: [],

      // SỬA: đường dẫn ảnh minh chứng (Dùng SVG tạm thời hiển thị chữ 'Add Mystic Sip image'. Khi nào có ảnh, hãy thay thế bằng đường dẫn ảnh thật của bạn)
      proofImages: [
        "assets/mystic-sip-1.png", // Mystic Sip TVC / Key Visual screenshot
        "assets/mystic-sip-2.png"  // Mystic Sip poster / social media materials
      ],

      // SỬA: link minh chứng (Thay dấu '#' bằng liên kết thật của bạn)
      proofLinkHref: "#"
    },
    {
      id: "lifebuoy-herbal-guard",
      
      // SỬA: số thứ tự dự án
      number: "03",

      // SỬA: tên dự án
      title: "Lifebuoy Product Innovation",

      // SỬA: vai trò chi tiết
      role: "Project Member",
      
      // SỬA: khóa học / trường
      course: "Brand Management | UEH",
      
      // SỬA: thời gian
      time: "09/2025 – 12/2025",

      // SỬA: thời gian / loại dự án trong modal
      category: "Brand Management | UEH • 09/2025 – 12/2025",

      // SỬA: mô tả bối cảnh dự án
      context: "A brand management innovation project proposing a horizontal line extension for Lifebuoy in Vietnam’s shower & body wash market.",

      // SỬA: nhiệm vụ đã làm
      whatIDid: "Analyzed Lifebuoy’s brand portfolio role, brand fundamentals, POP/POD, and positioning. Researched Vietnam’s personal care and shower & bath market, including natural product trends, local ingredient demand, scent, and moisturizing priorities. Proposed “Lifebuoy Herbal Guard: Aloe & Betel Leaf” as a natural, gentle antibacterial body wash concept. Connected consumer trends with brand extension strategy, product concept, and testing direction.",

      // SỬA: skill tags
      skills: [
        "Brand Management",
        "Product Extension",
        "Consumer Insight",
        "Market Analysis"
      ],

      // SỬA: số liệu / kết quả
      metrics: [
        { value: "32%", label: "Body care revenue share", theme: "lime" },
        { value: "57.7%", label: "Shower gel & body wash share", theme: "purple" },
        { value: "$245M", label: "Natural personal care market", theme: "white" }
      ],

      // SỬA: đường dẫn ảnh minh chứng
      proofImages: [
        "assets/lifebuoy-1.png", // SỬA: Ảnh chi tiết bao bì
        "assets/lifebuoy-2.png"  // SỬA: Ảnh đề xuất đổi mới
      ],

      // SỬA: link minh chứng
      proofLinkHref: "#"
    }
  ],

  // ==========================================================================
  // 3. DỮ LIỆU THÀNH TÍCH & GIẢI THƯỞNG (ACHIEVEMENTS / AWARDS)
  // ==========================================================================
  awards: [
    {
      id: "marketing-arena",
      year: "2026",
      title: "TOP 16",
      competition: "MARKETING ARENA",
      thumbnail: "assets/marketing-arena-card.jpg", // SỬA: ảnh award ngoài card
      shortDesc: "A long-standing national marketing competition since 2016, with business-oriented case tracks such as Zalopay and Handy Hảo Hảo.", // SỬA: mô tả ngắn ngoài card
      role: "Creative Strategist / Case Team Member",
      caseTopic: "Zalopay Growth Marketing Case",
      desc: "Worked on the Zalopay business-oriented case, focusing on growth marketing opportunities around BNPL behavior and QR payment adoption. The team conducted in-depth research to identify user barriers, growth opportunities, and strategic directions for Zalopay. Based on the research, we proposed a platform-based idea designed to help Zalopay strengthen user acquisition, increase payment usage, and support business growth.", // SỬA: nội dung case trong popup
      
      // SỬA: các gạch đầu dòng những việc đã làm
      whatIDidList: [
        "Researched BNPL behavior and QR payment adoption to understand user motivations and barriers.",
        "Analyzed Zalopay’s growth challenge and identified possible strategic directions.",
        "Helped develop a platform-based campaign idea connected to business growth objectives.",
        "Contributed to the case narrative, strategic rationale, and presentation structure."
      ],
      
      // SỬA: các kỹ năng đã vận dụng
      skills: [
        "Growth Marketing",
        "BNPL Research",
        "QR Payment",
        "Consumer Insight",
        "Platform Idea",
        "Business Strategy"
      ],
      modalImagePlaceholder: "Add Zalopay case image",
      modalImage: "assets/Zalopay-modal.jpg", // SỬA: ảnh Zalopay trong popup
      proofLinkHref: "#" // SỬA: link minh chứng
    },
    {
      id: "cmo-think-action",
      year: "2026",
      title: "TOP 24",
      competition: "CMO THINK & ACTION",
      thumbnail: "assets/cmo-think-action-card.jpg", // SỬA: ảnh award ngoài card
      shortDesc: "A marketing competition launched in 2024, structured around Planning and Creative teams. Worked on the Colorkey case from the Planning side, shaping the relaunch direction for Colorkey’s cushion product.", // SỬA: mô tả ngắn ngoài card
      role: "Planning Team Lead",
      caseTopic: "Colorkey Cushion Relaunch Case",
      desc: "Worked on the Colorkey case as part of the Planning team, leading the overall strategic direction for relaunching Colorkey’s cushion product. The work focused on identifying the brand’s core challenge, understanding consumer barriers, and developing a strategic idea that could guide the Creative team toward a business-oriented relaunch direction.", // SỬA: nội dung case trong popup
      
      // SỬA: các gạch đầu dòng những việc đã làm
      whatIDidList: [
        "Led the planning direction for the Colorkey cushion relaunch case.",
        "Researched the brand challenge, consumer perception, and category context to identify key growth barriers.",
        "Developed the strategic idea and planning rationale for the relaunch direction.",
        "Guided the Creative team with a clear strategic direction to support campaign development.",
        "Connected consumer insight, brand problem, and business objective into a coherent planning proposal."
      ],
      
      // SỬA: các kỹ năng đã vận dụng
      skills: [
        "Strategic Planning",
        "Brand Relaunch",
        "Consumer Insight",
        "Category Research",
        "Creative Direction",
        "Business-Oriented Strategy"
      ],
      modalImagePlaceholder: "Add Colorkey case image",
      modalImage: "assets/colorkey-modal.png", // SỬA: ảnh Colorkey trong popup
      proofLinkHref: "#" // SỬA: link minh chứng
    },
    {
      id: "marketing-hive",
      year: "2025",
      title: "TOP 30",
      competition: "MARKETING HIVE",
      thumbnail: "assets/marketing-hive-card.jpg", // SỬA: ảnh award ngoài card
      shortDesc: "A national marketing summer camp organized by DAV Marketers, bringing together young students from universities across Vietnam. Worked on the Apido fan case with a research and strategy focus.", // SỬA: mô tả ngắn ngoài card
      role: "Research & Strategy Team Member",
      caseTopic: "Apido Fan Market Share Growth Case",
      desc: "Worked on the Apido fan case, focusing on research and strategic direction to help the brand identify opportunities for increasing market share. The work centered on understanding the fan category, consumer decision drivers, competitive context, and possible strategic routes for Apido to strengthen relevance and consideration.", // SỬA: nội dung case trong popup
      
      // SỬA: các gạch đầu dòng những việc đã làm
      whatIDidList: [
        "Researched the fan category, consumer needs, and purchase decision factors.",
        "Analyzed Apido’s brand challenge and competitive position in the fan market.",
        "Identified strategic opportunities to improve brand relevance and market share growth.",
        "Contributed to the research direction and strategic framework for the case solution.",
        "Supported the development of a business-oriented recommendation for Apido."
      ],
      
      // SỬA: các kỹ năng đã vận dụng
      skills: [
        "Market Research",
        "Consumer Insight",
        "Brand Strategy",
        "Competitive Analysis",
        "Growth Strategy",
        "Strategic Direction"
      ],
      modalImagePlaceholder: "Add Apido case image",
      modalImage: "assets/apido-modal.png", // SỬA: ảnh Apido trong popup
      proofLinkHref: "#" // SỬA: link minh chứng
    }
  ]

};
