// ==========================================
// 1. ระบบจัดการสลับแท็บเกม (Game Tabs Management)
// ==========================================
function switchGameTab(gameId) {
    // เอาคลาส active ออกจากปุ่มแท็บทั้งหมดในหน้าจอ
    document.querySelectorAll('.game-tab-btn').forEach(btn => btn.classList.remove('active'));
    // ซ่อนเนื้อหาแท็บทั้งหมดที่มีอยู่
    document.querySelectorAll('.game-tab-content').forEach(content => content.classList.remove('active'));

    // ค้นหาปุ่มที่กด และเปิดการแสดงผลเนื้อหาของแท็บนั้นๆ
    if (window.event && window.event.currentTarget) {
        window.event.currentTarget.classList.add('active');
    }
    const targetContent = document.getElementById('content-' + gameId);
    if (targetContent) targetContent.classList.add('active');
}

// ฟังก์ชันช่วยสแกนตรวจสอบว่าหน้าเว็บกำลังเปิดภาษาอะไรอยู่ ณ ปัจจุบัน
function getCurrentLanguage() {
    if (document.getElementById('btn-en')?.classList.contains('active')) return 'en';
    if (document.getElementById('btn-zh')?.classList.contains('active')) return 'zh';
    return 'th';
}

// ==========================================
// 2. ระบบคำนวณราคาสำหรับ LoL PC
// ==========================================
function calculateLolPrice() {
    const prices = { iron: 100, bronze: 100, silver: 150, gold: 250, platinum: 300, emerald: 350, diamond: 800};
    const rankOrder = ['iron', 'bronze', 'silver', 'gold', 'platinum', 'emerald', 'diamond'];
    
    let currentRank = document.getElementById('lolCurrentRank').value;
    let currentDiv = parseInt(document.getElementById('lolCurrentDiv').value);
    let desiredRank = document.getElementById('lolDesiredRank').value;
    let desiredDiv = parseInt(document.getElementById('lolDesiredDiv').value);

    let currentIndex = rankOrder.indexOf(currentRank);
    let desiredIndex = rankOrder.indexOf(desiredRank);

    // ตรวจสอบภาษาปัจจุบัน เพื่อแสดงคำเตือนและหน่วยเงินให้ถูกต้องไดนามิกทั้ง 3 ภาษา
    const currentLang = getCurrentLanguage();
    const messages = {
        th: { alert: "กรุณาเลือกแรงค์เป้าหมายที่สูงกว่าแรงค์ปัจจุบัน", prefix: "ราคาสุทธิ: ", currency: " บาท" },
        en: { alert: "Please select a target rank higher than current rank.", prefix: "Total Price: ", currency: " THB" },
        zh: { alert: "请选择高于当前段位的目标段位。", prefix: "总价: ", currency: " THB" }
    };
    
    const msg = messages[currentLang];

    if (currentIndex > desiredIndex || (currentIndex === desiredIndex && currentDiv <= desiredDiv)) {
        document.getElementById('lol-result-text').innerText = msg.alert;
        return;
    }

    let total = 0;
    let tempIndex = currentIndex;
    let tempDiv = currentDiv;

    while (tempIndex < desiredIndex || (tempIndex === desiredIndex && tempDiv > desiredDiv)) {
        total += prices[rankOrder[tempIndex]];
        tempDiv--;
        if (tempDiv < 1) {
            tempDiv = 4;
            tempIndex++;
        }
    }
    document.getElementById('lol-result-text').innerText = `${msg.prefix}${total.toLocaleString()}${msg.currency}`;
}

// ==========================================
// 3. ระบบคำนวณราคาสำหรับ TFT
// ==========================================
function calculateTftPrice() {
    const prices = { iron: 80, bronze: 80, silver: 100, gold: 180, platinum: 220, emerald: 280, diamond: 600, master:800, grandmaster:1200};
    // 🛠️ ตรวจสอบแก้ไข: เพิ่ม 'master' และ 'grandmaster' เข้าไปในแผนผังลำดับเพื่อให้ระบบวนลูปคำนวณจับดัชนีเจอถูกต้อง
    const rankOrder = ['iron', 'bronze', 'silver', 'gold', 'platinum', 'emerald', 'diamond', 'master', 'grandmaster'];
    
    let currentRank = document.getElementById('tftCurrentRank').value;
    let currentDiv = parseInt(document.getElementById('tftCurrentDiv').value);
    let desiredRank = document.getElementById('tftDesiredRank').value;
    let desiredDiv = parseInt(document.getElementById('tftDesiredDiv').value);

    let currentIndex = rankOrder.indexOf(currentRank);
    let desiredIndex = rankOrder.indexOf(desiredRank);

    const currentLang = getCurrentLanguage();
    const messages = {
        th: { alert: "กรุณาเลือกแรงค์เป้าหมายที่สูงกว่าแรงค์ปัจจุบัน", prefix: "ราคาสุทธิ: ", currency: " บาท" },
        en: { alert: "Please select a target rank higher than current rank.", prefix: "Total Price: ", currency: " THB" },
        zh: { alert: "请选择高于当前段位的目标段位。", prefix: "总价: ", currency: " THB" }
    };
    
    const msg = messages[currentLang];

    if (currentIndex > desiredIndex || (currentIndex === desiredIndex && currentDiv <= desiredDiv)) {
        document.getElementById('tft-result-text').innerText = msg.alert;
        return;
    }

    let total = 0;
    let tempIndex = currentIndex;
    let tempDiv = currentDiv;

    while (tempIndex < desiredIndex || (tempIndex === desiredIndex && tempDiv > desiredDiv)) {
        total += prices[rankOrder[tempIndex]];
        tempDiv--;
        if (tempDiv < 1) {
            tempDiv = 4;
            tempIndex++;
        }
    }
    document.getElementById('tft-result-text').innerText = `${msg.prefix}${total.toLocaleString()}${msg.currency}`;
}

// ==========================================
// 4. ระบบแปลภาษาสลับ 3 ภาษา (TH / EN / ZH)
// ==========================================
const translations = {
    th: {
        navPrice: "ราคา", navSteps: "ขั้นตอน", navWhy: "ทำไมต้องเรา", navContact: "ติดต่อ", navOrderBtn: "สั่งซื้อทันที",
        navBuyId: "สั่งซื้อไอดี", btnOrderBoost: "สั่งซื้อบริการนี้",
        heroTitle: 'ปั๊มแรงค์ <span class="text-cyan">League of Legends</span> โดยผู้เล่น <span class="text-gold">Challenger</span>',
        heroSub: "บริการดันแรงค์ทุกระดับ ทั้ง LoL PC, TFT และ Wild Rift ปลอดภัย 100% ส่งงานตรงเวลา รับประกันผลงานทุกออเดอร์",
        btnPriceText: "ดูราคาทั้งหมด", btnAdminText: "ติดต่อแอดมิน",
        pricingMainTitle: 'ตารางราคา <span class="text-cyan">ปั๊มแรงค์</span>',
        perDiv: "/ ดิวิชั่น", perLP: "/ 100 LP", checkChat: "ทักแชทเพื่อเช็คราคา",
        priceNote: "* ราคาคิดต่อดิวิชั่น สำหรับ Master/Grandmaster คิดต่อ 100 LP — Challenger ทักแชทเช็คราคา",
        calcTitleLoL: "ระบบคำนวณราคา LoL PC", calcTitleTFT: "ระบบคำนวณราคา TFT (Teamfight Tactics)",
        labelCurrent: "แรงค์ปัจจุบันของคุณ:", labelDiv: "ดิวิชั่น:", labelDesired: "แรงค์ที่ต้องการ:", btnCalcText: "คำนวณราคา",
        wrTitle: "บริการปั๊มแรงค์ Wild Rift", wrSub1: "เนื่องจากระบบแรงค์และโหมดจัดอันดับของเกมมือถือมีการอัปเดตระบบคะแนนบ่อยครั้ง",
        wrSub2: "กรุณาติดต่อแอดมินโดยตรงเพื่อรับใบเสนอราคาลดพิเศษตามจำนวนดาวจริงของคุณ!",
        stepsMainTitle: 'ขั้นตอน <span class="text-cyan">การสั่งซื้อ</span>',
        step1Title: "ติดต่อแอดมิน", step1Sub: "ทักแชททาง WeChat หรือ Discord เพื่อแจ้งแรงค์ปัจจุบันและเป้าหมาย",
        step2Title: "ยืนยันราคา", step2Sub: "แอดมินคำนวณราคาตามตารางและส่งใบเสนอราคาให้คุณ",
        step3Title: "ชำระเงิน", step3Sub: "โอนเงินผ่านช่องทางที่สะดวก พร้อมส่งข้อมูลล็อกอิน",
        step4Title: "รับแรงค์ใหม่", step4Sub: "บูสเตอร์เริ่มงานทันที อัปเดตความคืบหน้าจนถึงเป้าหมาย",
        whyMainTitle: 'ทำไมต้อง <span class="text-gold">Elo Boost SEA</span>',
        why1Title: "ปลอดภัย 100%", why1Sub: "ใช้ VPN ของเซิร์ฟเวอร์ SEA ไม่มีประวัติแบนตลอด 5 ปี",
        why2Title: "รวดเร็ว", why2Sub: "เริ่มงานภายใน 30 นาทีหลังชำระเงิน",
        why3Title: "ทีม Challenger", why3Sub: "บูสเตอร์ทุกคนผ่านการคัดเลือก ระดับ Master ขึ้นไป",
        why4Title: "ซัพพอร์ต 24/7", why4Sub: "แอดมินพร้อมตอบทุกข้อสงสัยตลอดเวลา",
        why5Title: "รับประกันผล", why5Sub: "ถ้างานไม่เสร็จตามเป้า คืนเงินทันที",
        why6Title: "เก็บข้อมูลเป็นความลับ", why6Sub: "บัญชีของคุณจะไม่ถูกแชร์ให้บุคคลที่สาม",
        contactMainTitle: 'พร้อมจะ <span class="text-cyan">ดันแรงค์</span> หรือยัง?',
        contactSub: "ติดต่อเราผ่านช่องทางด้านล่างได้ตลอด 24 ชั่วโมง",
        wechatLinkText: "คลิกเพื่อสแกน QR Code", discordLinkText: "[ ใส่ลิงก์ Discord ที่นี่ ]", facebookLinkText: "ทักแชทเพื่อเช็คราคา",
        creditsMainTitle: "เครดิตและ <span class=\"text-cyan\">ผลงานล่าสุด</span>",
        creditsSub: "ภาพส่วนหนึ่งจากการปิดงานจริง การันตีปลอดภัย ไร้โปร ไร้แบน 100%",
        creditTitle1: "Review #1", creditDesc1: "งานดันแรงค์สำเร็จเรียบร้อย",
        creditTitle2: "Review #2", creditDesc2: "เสร็จไว ได้งานจริง เชื่อถือได้ร้อยเปอร์เซ็นต์",
        creditTitle3: "Review #3", creditDesc3: "ปิดออเดอร์ด้วยอัตราการชนะสูงลิ่ว",
        qrTitle: "QR Code", qrLinkText: "คลิกเพื่อเปิดสแกนคิวอาร์โค้ด",
        qrModalTitle: "สแกน QR Code เพื่อติดต่อเรา",
        qrModalSub: "เปิดแอป WeChat แล้วสแกนเพื่อดันแรงค์ได้ทันที",
        fastworkLinkText: "จ้างงานผ่าน Fastwork ปลอดภัย 100%",
    },
    en: {
        navPrice: "Pricing", navSteps: "Steps", navWhy: "Why Us", navContact: "Contact", navOrderBtn: "Order Now",
        navBuyId: "Buy Game ID", btnOrderBoost: "Order This Service",
        heroTitle: 'LoL Boosting <span class="text-cyan">Service SEA</span> by <span class="text-gold">Challenger</span> Players',
        heroSub: "Professional rank boosting for LoL PC, TFT, and Wild Rift. 100% Secure, Express Delivery, and Satisfaction Guaranteed.",
        btnPriceText: "View Pricing", btnAdminText: "Contact Admin",
        pricingMainTitle: 'Our <span class="text-cyan">Boosting Prices</span>',
        perDiv: "/ Division", perLP: "/ 100 LP", checkChat: "Inquire via Chat",
        priceNote: "* Prices are calculated per division. Master/Grandmaster per 100 LP. Challenger please contact us directly.",
        calcTitleLoL: "LoL PC Price Calculator", calcTitleTFT: "TFT Price Calculator",
        labelCurrent: "Your Current Rank:", labelDiv: "Division:", labelDesired: "Desired Rank:", btnCalcText: "Calculate Price",
        wrTitle: "Wild Rift Boosting Service", wrSub1: "Since mobile rank systems alter points and marks frequently between updates.",
        wrSub2: "Please chat with our support to receive an exclusive custom quote tailored to your current marks!",
        stepsMainTitle: 'How to <span class="text-cyan">Order</span>',
        step1Title: "Contact Support", step1Sub: "Message us on WeChat or Discord with your current rank and desired target.",
        step2Title: "Price Quote", step2Sub: "Our team will calculate the estimate and provide a final transparent offer.",
        step3Title: "Secure Payment", step3Sub: "Complete transaction via preferred gateways and securely share account login info.",
        step4Title: "Enjoy New Rank", step4Sub: "A assigned booster starts instantly. Track progress until your goal is achieved.",
        whyMainTitle: 'Why Choose <span class="text-gold">Elo Boost SEA</span>',
        why1Title: "100% Safe & Secure", why1Sub: "Premium VPN integrated matching your country's server. 0% ban rate over 5 years.",
        why2Title: "Express Start", why2Sub: "Order initialized within 30 minutes post payment verification.",
        why3Title: "Challenger Pool", why3Sub: "All boosters strictly vetted, holding an active minimum Master+ tier status.",
        why4Title: "24/7 Live Support", why4Sub: "Support admins available round-the-clock to manage queries instantly.",
        why5Title: "Guaranteed Completion", why5Sub: "Full refund provided immediately if milestones fail to meet guidelines.",
        why6Title: "Confidentiality Policy", why6Sub: "Credentials and matching logs strictly encrypted. Third-party exposure forbidden.",
        contactMainTitle: 'Ready to <span class="text-cyan">Boost Your Rank</span>?',
        contactSub: "Get in touch with us across platforms available 24 hours a day.",
        wechatLinkText: "Click to scan QR Code", discordLinkText: "[ Insert Discord Invite here ]", facebookLinkText: "DM for pricing",
        creditsMainTitle: "Recent <span class=\"text-cyan\">Credits</span>",
        creditsSub: "A glimpse of our completed jobs. 100% safe, no third-party programs, 100% ban-free.",
        creditTitle1: "Review #1", creditDesc1: "Finished Challenger Order",
        creditTitle2: "Review #2", creditDesc2: "Fast and reliable Elo Boost SEA service",
        creditTitle3: "Review #3", creditDesc3: "High winrate completion",
        qrTitle: "QR Code", qrLinkText: "Click to open QR Code",
        qrModalTitle: "Scan QR Code to Contact Us",
        qrModalSub: "Open your WeChat app and scan to start boosting",
        fastworkLinkText: "Hire us via Fastwork (100% Secure)",
    },
    // 🇨🇳 หมวดภาษาจีน (ปรับแต่งแก้ไขคีย์ซ้ำและแก้จุดพิมพ์ตกหล่นแล้ว)
    zh: {
        navPrice: "价格", navSteps: "步骤", navWhy: "为什么选择我们", navContact: "联系我们", navOrderBtn: "立即下单",
        navBuyId: "购买账号", btnOrderBoost: "立即代练 / 购买服务",
        heroTitle: '由 <span class="text-gold">Challenger</span> 玩家提供的 <span class="text-cyan">League of Legends</span> 代练服务',
        heroSub: "提供 LoL PC、TFT 和 Wild Rift 全段位代练服务，100% 安全保障，准时完成订单，所有订单均提供成果保证",
        btnPriceText: "查看全部价格", btnAdminText: "联系管理员",
        pricingMainTitle: '<span class="text-cyan">代练价格表</span>',
        perDiv: "/ 段位", perLP: "/ 100 LP", checkChat: "私聊咨询价格",
        priceNote: "* 价格按段位计算，Master/Grandmaster 按每 100 LP 计算 — Challenger 请私聊咨询价格",
        calcTitleLoL: "LoL PC 价格计算系统", calcTitleTFT: "TFT（云顶之弈）价格计算系统",
        labelCurrent: "当前段位：", labelDiv: "分段：", labelDesired: "目标段位：", btnCalcText: "计算价格",
        wrTitle: "Wild Rift 代练服务", wrSub1: "由于手游排位系统和排名模式经常更新积分机制",
        wrSub2: "请直接联系管理员，根据您的实际星数获取专属优惠报价！",
        stepsMainTitle: '<span class="text-cyan">下单流程</span>',
        step1Title: "联系管理员", step1Sub: "通过 WeChat 或 Discord 联系我们，并告知当前段位和目标段位",
        step2Title: "确认价格", step2Sub: "管理员将根据价格表计算费用并发送报价",
        step3Title: "付款", step3Sub: "通过您方便的方式付款，并提供账号登录信息",
        step4Title: "获得新段位", step4Sub: "代练员立即开始工作，并持续更新进度直到完成目标",
        whyMainTitle: '为什么选择 <span class="text-gold">Elo Boost SEA</span>',
        why1Title: "100% 安全", why1Sub: "使用 SEA 服务器 VPN，5 年以来从未有封号记录",
        why2Title: "快速高效", why2Sub: "付款后 30 分钟内开始服务",
        why3Title: "Challenger 团队", why3Sub: "所有代练员均经过严格筛选，最低 Master 段位以上",
        why4Title: "24/7 客服支持", why4Sub: "管理员全天候解答您的任何问题",
        why5Title: "结果保障", why5Sub: "若未达成目标段位，立即退款",
        why6Title: "严格保密", why6Sub: "您的账号信息绝不会 with 第三方共享",
        contactMainTitle: '准备好<span class="text-cyan">提升段位</span>了吗？',
        contactSub: "欢迎通过以下方式 24 小时联系我们",
        wechatLinkText: "点击扫描二维码", discordLinkText: "[ 在此填写 Discord 链接 ]", facebookLinkText: "私聊咨询价格",
        creditsMainTitle: '评价与<span class="text-cyan">最新案例</span>',
        creditsSub: "部分真实完成订单截图，保证无外挂、无封号、100% 安全",
        creditTitle1: "Review #1", creditDesc1: "完成 Challenger 订单",
        creditTitle2: "Review #2", creditDesc2: "快速完成，高效可靠，值得信赖的 Elo Boost SEA",
        creditTitle3: "Review #3", creditDesc3: "高胜率完成订单",
        qrTitle: "二维码", qrLinkText: "点击打开二维码",
        qrModalTitle: "扫描二维码联系我们",
        qrModalSub: "打开 WeChat 扫描，即可立即开始代练服务",
        fastworkLinkText: "通过 Fastwork 下单，100% 安全保障"
    }
};

function switchLanguage(lang) {
    // สลับคลาส active ของปุ่มภาษาให้ตรงช่อง ครอบคลุมปุ่มภาษาจีนที่เพิ่มเข้ามาใหม่
    ['th', 'en', 'zh'].forEach(l => {
        const btn = document.getElementById('btn-' + l);
        if (btn) btn.classList.remove('active');
    });
    const activeBtn = document.getElementById('btn-' + lang);
    if (activeBtn) activeBtn.classList.add('active');

    // ลูปค้นหาอิลิเมนต์ทั้งหมดที่มี Attribute data-key แล้วเปลี่ยนข้อความตามคีย์นั้นๆ
    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (translations[lang] && translations[lang][key]) {
            elem.innerHTML = translations[lang][key];
        }
    });

    // รีเซ็ตข้อความในกล่องผลลัพธ์คำนวณราคาให้เป็นศูนย์ใหม่ตามโครงสร้างทั้ง 3 ภาษา
    const resetTexts = {
        th: "ราคาสุทธิ: 0 บาท",
        en: "Total Price: 0 THB",
        zh: "总价: 0 THB"
    };
    
    const defaultReset = resetTexts[lang] || resetTexts['th'];
    document.getElementById('lol-result-text').innerText = defaultReset;
    document.getElementById('tft-result-text').innerText = defaultReset;
}

// ฟังก์ชัน เปิด-ปิด หน้าต่าง QR Code
function toggleQRModal(show) {
    const modal = document.getElementById('qrModal');
    if (modal) {
        modal.style.display = show ? 'flex' : 'none';
    }
}