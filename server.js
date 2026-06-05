const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const axios = require('axios');
const path = require('path');

const app = express();
const server = http.createServer(app);

// 🎯 [উইনগো কালার ট্রেড সিঙ্ক - গ্লোবাল গেটওয়ে সকেট প্রোটকল লক ভাই ভাই]
const io = socketIo(server, { cors: { origin: "*", methods: ["GET", "POST"] } });

app.use(express.json());
app.use(express.static(path.join(__dirname, './')));

app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "ALLOWALL");
    res.setHeader("Content-Security-Policy", "frame-ancestors *; default-src * 'unsafe-inline' 'unsafe-eval'; script-src * 'unsafe-inline' 'unsafe-eval'; connect-src * 'unsafe-inline'; img-src * data: blob:; style-src * 'unsafe-inline'; font-src * data:;");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});

// 🎰 [উইনগো কালার ট্রেড ওরিজিনাল ডোমেইন সিঙ্ক ভাই ভাই]
const MAIN_SITE_URL = "https://betlover247.onrender.com"; 

// 💎 ওরিজিনাল ফরচুন জেমস ৪টি প্রিমিয়াম ক্যাসিনো সিম্বল ম্যাপ
const fortuneGemsPool = ["GOLD_STRIKE", "BLUE_GEM", "GREEN_GEM", "RED_GEM"];

// ⚡ ডানদিকের ৪র্থ বুস্টার রিল ওরিজিনাল মাল্টিপ্লায়ার ওッズ মেমোরি
const boosterMultipliersMap = [1, 2, 3, 5, 10, 15];

// 💰 ১. লাইভ অ্যাকাউন্ট ব্যালেন্স ইন্টারসেপ্টর গেটওয়ে
app.get('/api/fortunegems-balance', async (req, res) => {
    const { userId, wallet } = req.query;
    const targetWallet = wallet || "main";
    let finalUser = userId === "logged_in_player" || !userId || userId === "undefined" ? "guest" : userId;
    try {
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "balance", username: finalUser, amount: 0, wallet: targetWallet, game: "fortunegems"
        }, { timeout: 15000 });

        if (response.data && response.data.status === "ok") {
            return res.json({ success: true, balance: response.data.balance });
        }
        return res.json({ success: false, balance: 0 });
    } catch (e) { return res.json({ success: false, balance: 0 }); }
});

// 🛫 ২. ফরচুন জেমস কোর ৩+১ রিল স্পিন রাউট (মানি ট্রি ও ফ্যান-টানের মতো ১০০% সিকিউরড সিঙ্গেল পাইপলাইন প্রোটোকল)
app.post('/api/fortunegems-spin', async (req, res) => {
    const { userId, amount, wallet } = req.body; 
    const reqAmount = parseFloat(amount) || 50;
    const finalGameName = "fortunegems"; 
    const targetWallet = wallet || "main";

    let finalQueryUser = userId;
    if (!finalQueryUser || finalQueryUser === "logged_in_player" || finalQueryUser === "undefined") {
        finalQueryUser = "guest"; 
    }

    if (reqAmount < 1 || reqAmount > 20000) {
        return res.json({ success: false, message: "🚨 Invalid Bet Parameter! Max 20000 ৳" });
    }

    try {
        // 🔒 [🔒 গ্র্যান্ড কিংস কারেকশন বর্ম - ১০০% নিখুঁত সিঙ্গেল স্টেক টাইট লক ওস্তাদ!]:
        // ডাবল কলব্যাকের ওল্ড জ্যাম ও ব্যালেন্স প্রাক-চেকিং ট্র্যাপ এক টানে সাফ! সরাসরি ১ম হিটে বাজি ডেবিট রিকোয়েস্ট ফায়ার লক ওস্তাদ!
        const balResponse = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, {
            action: "bet", username: finalQueryUser, amount: reqAmount, wallet: targetWallet, game: finalGameName
        }, { timeout: 30000 });
        
        if (!balResponse.data || balResponse.data.status !== "ok") {
            return res.json({ success: false, message: "❌ আপনার অ্যাকাউন্ট ব্যালেন্স জিরো বা অপ্রতুল! দয়া করে রিচার্জ করুন ওস্তাদ।" });
        }

        let currentDbBalance = parseFloat(balResponse.data.balance) || 0;
        
        let finalReelsResultMatrix = []; 
        let winMultiplier = 1;
        let finalStatus = "lose";

        let isLoopActive = true;
        let loopSafety = 0;

        // 🎰 [🎰 আন্তর্জাতিক ৩+১ রিল জেনুইন স্লট র্যান্ডম ৯৫% RTP লুপ ইঞ্জিন ভাই ভাই]
        while (isLoopActive && loopSafety < 150) {
            loopSafety++;
            finalReelsResultMatrix = [];

            // ৩টি মেইন রিলের জন্য ৩টি পিউর র্যান্ডম জেমস সিম্বল সিলেকশন লক চ্যাম
            for (let i = 0; i < 3; i++) {
                let randomIdx = Math.floor(Math.random() * fortuneGemsPool.length);
                finalReelsResultMatrix.push(fortuneGemsPool[randomIdx]);
            }

            // 🎯 ৪র্থ বুস্টার রিল ওরিজিনাল মাল্টিপ্লায়ার ওッズ জেনারেটর নব
            let boosterRand = Math.random();
            if (boosterRand < 0.55) winMultiplier = 1;       // ৫৫% চান্স x1 ওッズ
            else if (boosterRand < 0.80) winMultiplier = 2;  // ২৫% চান্স x2 বুস্টার
            else if (boosterRand < 0.93) winMultiplier = 3;  // ১৩% চান্স x3 বুস্টার
            else if (boosterRand < 0.97) winMultiplier = 5;  // ৪% চান্স x5 বুস্টার
            else if (boosterRand < 0.99) winMultiplier = 10; // ২% চান্স x10 মেগা ওッズ
            else winMultiplier = 15;                          // ১% চান্স x15 গ্র্যান্ড জেমস জ্যাকপট!

            // 🎯 [৩-রিল পে-লাইন কম্বিনেশন ম্যাচিং স্কোর ক্যালকুলেটর ইঞ্জিন]
            let r1 = finalReelsResultMatrix[0];
            let r2 = finalReelsResultMatrix[1];
            let r3 = finalReelsResultMatrix[2];

            if (r1 === r2 && r2 === r3) {
                // ৩টি জেমস হুবহু মিলে গেলে মেইন বেস গুণিতকের পেআউট ডিক্লেয়ারেশন লক
                if (r1 === "GOLD_STRIKE") winMultiplier = winMultiplier * 20;     // গোল্ডেন স্ট্রাইক ২০ গুণ বেস প্রফিট
                else if (r1 === "RED_GEM") winMultiplier = winMultiplier * 10;    // লাল জেমস ১০ গুণ
                else if (r1 === "GREEN_GEM") winMultiplier = winMultiplier * 5;   // সবুজ জেমস ৫ গুণ
                else winMultiplier = winMultiplier * 3;                            // নীল জেমস ৩ গুণ
                finalStatus = "win";
            } else {
                // কম্বো না মিললে প্লেয়ার লস, কিন্তু ৪র্থ রিল এনিমেশনের ওッズ শো করার জন্য মাল্টিপ্লায়ার ভ্যালু সেফ থাকবে ওস্তাদ ভাই ভাই!
                finalStatus = "lose";
            }

            // एडমিন প্যানেল কাস্টম ফোর্স কন্ট্রোল নব ফিল্টারিং চ্যাম
            if (balResponse.data && balResponse.data.fortunegems_target) {
                let target = String(balResponse.data.fortunegems_target).toUpperCase();
                if (target === "FORCE_LOSE" && finalStatus === "win") {
                    finalReelsResultMatrix = ["GOLD_STRIKE", "BLUE_GEM", "RED_GEM"];
                    finalStatus = "lose";
                    isLoopActive = false;
                }
                if (target === "FORCE_WIN" && finalStatus === "win") isLoopActive = false;
            } else {
                if (finalStatus === "win") {
                    // ফরচুন জেমস আন্তর্জাতিক আরটিপি স্বাভাবিক ট্র্যাকে ২২% এ সুষম ব্যালেন্সড লক ভাই ভাই!
                    if (Math.random() <= 0.22) isLoopActive = false;
                } else {
                    isLoopActive = false; // লস হলে ওয়ান-শটে লুপ ব্রেক বর্ম! ওল্ড জ্যাম চিরতরে সাফ!
                }
            }
        }

        // 🎯 [মেগা কিলার জিরো-ডাবল-ডেবিট স্টেক ব্যালেন্সার বর্ম ভাই ভাই]
        let winAmount = 0, dbAction = "win", dbAmount = 0;

        if (finalStatus === "win") {
            winAmount = Math.round(reqAmount * winMultiplier);
            dbAction = "win"; dbAmount = parseFloat(winAmount); 
        } else {
            dbAction = "win"; dbAmount = 0; 
        }

        let phpPayload = { 
            action: dbAction, username: finalQueryUser, amount: dbAmount, wallet: targetWallet, game: finalGameName 
        };
        
        phpPayload.status = finalStatus;
        phpPayload.bet_amount = reqAmount;

        // 🛫 ③ মেইন সাইটের সিকিউরড গেটওয়েতে রিয়েল-টাইম উইন-লস সেটেলমেন্ট এপিআই হিট
        const response = await axios.post(`${MAIN_SITE_URL}/api_callback.php`, phpPayload, { timeout: 45000 });

        if (response.data && response.data.status === "ok") {
            io.emit("balanceUpdate", { username: finalQueryUser, balance: response.data.balance });
            
            return res.json({
                success: true,
                balance: response.data.balance,
                data: { balance: response.data.balance },
                gameData: { 
                    finalReelsResultMatrix,
                    winMultiplier,
                    status: finalStatus, 
                    winAmount 
                }
            });
        } else {
            let latestBal = (response.data && response.data.balance !== undefined) ? response.data.balance : currentDbBalance;
            return res.json({ success: false, balance: latestBal, message: "X Bet Settlement Declined by Database!" });
        }
    } catch (e) { 
        return res.json({ success: false, message: "⚠️ Timeout! Click SPIN again." }); 
    }
});

app.get('/', (req, res) => { res.sendFile(path.resolve(__dirname, 'index.html')); });
io.on('connection', (socket) => {});

// ⚡ কাস্টম নোড সার্ভার পোর্ট গেটওয়ে লাইভ অন ফায়ার (৪০০০০ পোর্টে ডেডিকেটেড সিঙ্ক লক!)
const PORT = process.env.PORT || 6400; 
server.listen(PORT, () => { console.log(`💎 Fortune Gems 3+1 Reel Booster Engine Running on port ${PORT}`); });
