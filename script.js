// ==========================================
// 1. ระบบจัดการสลับแท็บเกม (Game Tabs Management)
// ==========================================
function switchGameTab(gameId) {
    // เอาคลาส active ออกจากปุ่มแท็บทั้งหมดในหน้าจอ
    document.querySelectorAll('.game-tab-btn').forEach(btn => btn.classList.remove('active'));
    // ซ่อนเนื้อหาแท็บทั้งหมดที่มีอยู่
    document.querySelectorAll('.game-tab-content').forEach(content => content.classList.remove('active'));

    // ค้นหาปุ่มที่กด และเปิดการแสดงผลเนื้อหาของแท็บนั้นๆ
    event.currentTarget.classList.add('active');
    document.getElementById('content-' + gameId).classList.add('active');
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

    // ตรวจสอบภาษาปัจจุบัน เพื่อแสดงคำเตือนให้ถูกต้อง
    const isEn = document.getElementById('btn-en').classList.contains('active');
    const alertMsg = isEn ? "Please select a target rank higher than current rank." : "กรุณาเลือกแรงค์เป้าหมายที่สูงกว่าแรงค์ปัจจุบัน";
    const prefixMsg = isEn ? "Total Price: " : "ราคาสุทธิ: ";
    const currencyMsg = isEn ? " THB" : " บาท";

    if (currentIndex > desiredIndex || (currentIndex === desiredIndex && currentDiv <= desiredDiv)) {
        document.getElementById('lol-result-text').innerText = alertMsg;
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
    document.getElementById('lol-result-text').innerText = `${prefixMsg}${total.toLocaleString()}${currencyMsg}`;
}

// ==========================================
// 3. ระบบคำนวณราคาสำหรับ TFT
// ==========================================
function calculateTftPrice() {
    const prices = { iron: 80, bronze: 80, silver: 100, gold: 180, platinum: 220, emerald: 280, diamond: 600, master:800, grandmaster:1200};
    const rankOrder = ['iron', 'bronze', 'silver', 'gold', 'platinum', 'emerald', 'diamond'];
    
    let currentRank = document.getElementById('tftCurrentRank').value;
    let currentDiv = parseInt(document.getElementById('tftCurrentDiv').value);
    let desiredRank = document.getElementById('tftDesiredRank').value;
    let desiredDiv = parseInt(document.getElementById('tftDesiredDiv').value);

    let currentIndex = rankOrder.indexOf(currentRank);
    let desiredIndex = rankOrder.indexOf(desiredRank);

    const isEn = document.getElementById('btn-en').classList.contains('active');
    const alertMsg = isEn ? "Please select a target rank higher than current rank." : "กรุณาเลือกแรงค์เป้าหมายที่สูงกว่าแรงค์ปัจจุบัน";
    const prefixMsg = isEn ? "Total Price: " : "ราคาสุทธิ: ";
    const currencyMsg = isEn ? " THB" : " บาท";

    if (currentIndex > desiredIndex || (currentIndex === desiredIndex && currentDiv <= desiredDiv)) {
        document.getElementById('tft-result-text').innerText = alertMsg;
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
    document.getElementById('tft-result-text').innerText = `${prefixMsg}${total.toLocaleString()}${currencyMsg}`;
}

// ==========================================
// 4. ระบบแปลภาษาสลับ 2 ภาษา (TH / EN)
// ==========================================
const translations = {
    th: {
        navPrice: "ราคา", navSteps: "ขั้นตอน", navWhy: "ทำไมต้องเรา", navContact: "ติดต่อ", navOrderBtn: "สั่งซื้อทันที",
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
        wechatLinkText: "[ ใส่ลิงก์ WeChat ที่นี่ ]", discordLinkText: "[ ใส่ลิงก์ Discord ที่นี่ ]",
        facebookLinkText: "ทักแชทเพื่อเช็คราคา",
        creditsMainTitle: "เครดิตและ <span class=\"text-cyan\">ผลงานล่าสุด</span>",
        creditsSub: "ภาพส่วนหนึ่งจากการปิดงานจริง การันตีปลอดภัย ไร้โปร ไร้แบน 100%",
        qrTitle: "QR Code",
        qrLinkText: "คลิกเพื่อเปิดสแกนคิวอาร์โค้ด",
        qrModalTitle: "สแกนคิวอาร์โค้ด",
        qrModalSub: "เปิดแอปสแกนเพื่อติดต่อเราได้ทันที",
        wechatLinkText: "คลิกเพื่อสแกน QR Code",
        qrModalTitle: "สแกน QR Code เพื่อติดต่อเรา",
        qrModalSub: "เปิดแอป WeChat แล้วสแกนเพื่อดันแรงค์ได้ทันที",
        fastworkLinkText: "จ้างงานผ่าน Fastwork ปลอดภัย 100%",
    },
    en: {
        navPrice: "Pricing", navSteps: "Steps", navWhy: "Why Us", navContact: "Contact", navOrderBtn: "Order Now",
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
        wechatLinkText: "[ Insert WeChat URL here ]", discordLinkText: "[ Insert Discord Invite here ]",
        facebookLinkText: "DM for pricing",
        creditsMainTitle: "Recent <span class=\"text-cyan\">Credits</span>",
        creditsSub: "A glimpse of our completed jobs. 100% safe, no third-party programs, 100% ban-free.",
        qrTitle: "QR Code",
        wechatLinkText: "Click to scan QR Code",
        qrModalTitle: "Scan QR Code to Contact Us",
        qrModalSub: "Open your WeChat app and scan to start boosting",
        fastworkLinkText: "Hire us via Fastwork (100% Secure)",
    }
};

function switchLanguage(lang) {
    // สลับคลาส active ของปุ่มภาษาให้ตรงช่อง
    document.getElementById('btn-th').classList.remove('active');
    document.getElementById('btn-en').classList.remove('active');
    document.getElementById('btn-' + lang).classList.add('active');

    // ลูปค้นหาอิลิเมนต์ทั้งหมดที่มี Attribute data-key แล้วเปลี่ยนข้อความตามคีย์นั้นๆ
    document.querySelectorAll('[data-key]').forEach(elem => {
        const key = elem.getAttribute('data-key');
        if (translations[lang][key]) {
            elem.innerHTML = translations[lang][key];
        }
    });

    // รีเซ็ตข้อความในกล่องผลลัพธ์คำนวณราคาให้เป็นศูนย์ใหม่
    document.getElementById('lol-result-text').innerText = lang === 'en' ? "Total Price: 0 THB" : "ราคาสุทธิ: 0 บาท";
    document.getElementById('tft-result-text').innerText = lang === 'en' ? "Total Price: 0 THB" : "ราคาสุทธิ: 0 บาท";
}

// ฟังก์ชัน เปิด-ปิด หน้าต่าง QR Code
function toggleQRModal(show) {
    const modal = document.getElementById('qrModal');
    if (show) {
        modal.style.display = 'flex';
    } else {
        modal.style.display = 'none';
    }
}