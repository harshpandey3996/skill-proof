import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "cyber_test_progress";
const TEST_TIME = 10 * 60; // 10 min
const PASS_SCORE = 7;

export const ALL_QUESTIONS = [
  /* ================= A = 25 ================= */
  {question:"What is Cyber Security?",options:["Protection of systems and data","Website design","Gaming","Hardware"],answer:"Protection of systems and data"},
  {question:"What is malware?",options:["Malicious software","Firewall","Antivirus","OS"],answer:"Malicious software"},
  {question:"What is phishing?",options:["Stealing user info","Encrypting files","System update","Backup"],answer:"Stealing user info"},
  {question:"What does VPN do?",options:["Secures internet connection","Deletes virus","Boosts RAM","Blocks ads"],answer:"Secures internet connection"},
  {question:"What is encryption?",options:["Converts data to secret form","Deletes data","Copies data","Shares data"],answer:"Converts data to secret form"},
  {question:"What is antivirus?",options:["Removes malware","Creates malware","Designs UI","Controls CPU"],answer:"Removes malware"},
  {question:"What is brute force attack?",options:["Trying passwords","Email spam","Virus","Firewall rule"],answer:"Trying passwords"},
  {question:"What is data breach?",options:["Unauthorized data access","Backup","Update","Scan"],answer:"Unauthorized data access"},
  {question:"What is spyware?",options:["Tracks activity secretly","Protects PC","Boosts speed","Blocks net"],answer:"Tracks activity secretly"},
  {question:"What is ransomware?",options:["Locks data for money","Free antivirus","Backup tool","Email"],answer:"Locks data for money"},
  {question:"What is social engineering?",options:["Manipulating people","Coding","Designing","Hosting"],answer:"Manipulating people"},
  {question:"What does HTTPS provide?",options:["Secure communication","Fast net","Free data","Unlimited access"],answer:"Secure communication"},
  {question:"What is authentication?",options:["Verify identity","Encrypt data","Backup","Block"],answer:"Verify identity"},
  {question:"What is authorization?",options:["Permission access","Login","Encryption","Backup"],answer:"Permission access"},
  {question:"What is OTP?",options:["One Time Password","Online Transfer","Open Text","Only Pin"],answer:"One Time Password"},
  {question:"What is backup?",options:["Copy of data","Delete data","Encrypt","Share"],answer:"Copy of data"},
  {question:"What is cyber crime?",options:["Crime using computer","Road crime","Bank work","Police job"],answer:"Crime using computer"},
  {question:"What is patching?",options:["Fix security bugs","Delete files","Install OS","Scan"],answer:"Fix security bugs"},
  {question:"What is confidentiality?",options:["Keeping data secret","Deleting data","Sharing data","Backing up"],answer:"Keeping data secret"},
  {question:"What is integrity?",options:["Data not altered","Fast data","Shared data","Encrypted"],answer:"Data not altered"},
  {question:"What is availability?",options:["Data accessible","Data hidden","Data deleted","Data encrypted"],answer:"Data accessible"},
  {question:"What is keylogger?",options:["Records keystrokes","Firewall","VPN","Backup"],answer:"Records keystrokes"},
  {question:"What is adware?",options:["Shows unwanted ads","Protects system","Deletes virus","Encrypts"],answer:"Shows unwanted ads"},
  {question:"What is password policy?",options:["Rules for password","Firewall rule","VPN setup","Antivirus scan"],answer:"Rules for password"},
  {question:"Which is weak password?",options:["password123","Ab@12Xy","Zx#9Lp","Strong@99"],answer:"password123"},
  /* ================= B = 25 ================= */
  {question:"Which software removes viruses?",options:["Browser","Antivirus","OS","Router"],answer:"Antivirus"},
  {question:"Which attack floods server?",options:["Phishing","DDoS","Spyware","Trojan"],answer:"DDoS"},
  {question:"Which is secure website sign?",options:["http","https","ftp","file"],answer:"https"},
  {question:"Which malware spreads automatically?",options:["Trojan","Worm","Spyware","Adware"],answer:"Worm"},
  {question:"Which device protects network?",options:["Hub","Firewall","Switch","Repeater"],answer:"Firewall"},
  {question:"Which is authentication factor?",options:["Username","Password","Color","Mouse"],answer:"Password"},
  {question:"Which attack uses fake emails?",options:["Virus","Phishing","DDoS","Firewall"],answer:"Phishing"},
  {question:"Which is strong password?",options:["123456","Ab@12Xy!","password","qwerty"],answer:"Ab@12Xy!"},
  {question:"Which tool monitors intrusion?",options:["Browser","IDS","Game","Editor"],answer:"IDS"},
  {question:"Which malware shows ads?",options:["Virus","Adware","Worm","Trojan"],answer:"Adware"},
  {question:"Which attack steals login data?",options:["DDoS","Phishing","Firewall","VPN"],answer:"Phishing"},
  {question:"Which is security principle CIA?",options:["Control Info Access","Confidentiality Integrity Availability","Cyber Internet Access","None"],answer:"Confidentiality Integrity Availability"},
  {question:"Which is safe practice?",options:["Click unknown links","Use strong passwords","Share OTP","Disable AV"],answer:"Use strong passwords"},
  {question:"Which is network attack?",options:["Spyware","DDoS","Adware","Keylogger"],answer:"DDoS"},
  {question:"Which software encrypts data?",options:["Browser","Encryption tool","Editor","Player"],answer:"Encryption tool"},
  {question:"Which attack guesses passwords?",options:["Virus","Brute force","Phishing","DDoS"],answer:"Brute force"},
  {question:"Which is firewall type?",options:["Application","Packet filtering","Browser","Editor"],answer:"Packet filtering"},
  {question:"Which is authentication method?",options:["OTP","Color","Theme","Wallpaper"],answer:"OTP"},
  {question:"Which is malware?",options:["Browser","Trojan","OS","Firewall"],answer:"Trojan"},
  {question:"Which attack records keys?",options:["Virus","Keylogger","Worm","Adware"],answer:"Keylogger"},
  {question:"Which protects WiFi?",options:["Password","Wallpaper","Theme","Icon"],answer:"Password"},
  {question:"Which cyber attack uses ransom?",options:["Phishing","Ransomware","DDoS","Firewall"],answer:"Ransomware"},
  {question:"Which protects data in transit?",options:["RAM","HTTPS","CPU","Battery"],answer:"HTTPS"},
  {question:"Which is 2FA example?",options:["Username","Password + OTP","Email only","Phone only"],answer:"Password + OTP"},
  {question:"Which is NOT malware?",options:["Virus","Firewall","Trojan","Spyware"],answer:"Firewall"},
  /* ================= C = 20 ================= */
  {question:"Which protocol is secure?",options:["HTTP","FTP","HTTPS","SMTP"],answer:"HTTPS"},
  {question:"Which is OS vulnerability?",options:["Strong password","Unpatched system","Firewall","VPN"],answer:"Unpatched system"},
  {question:"Which attack uses fake website?",options:["DDoS","Virus","Phishing","Firewall"],answer:"Phishing"},
  {question:"Which stores passwords safely?",options:["Notepad","Browser text","Password manager","Excel"],answer:"Password manager"},
  {question:"Which is secure authentication?",options:["Password","OTP","Biometrics","Username"],answer:"Biometrics"},
  {question:"Which protects data at rest?",options:["Firewall","VPN","Encryption","Browser"],answer:"Encryption"},
  {question:"Which is email attack?",options:["DDoS","Phishing","Firewall","Backup"],answer:"Phishing"},
  {question:"Which detects malware?",options:["Editor","Antivirus","Browser","Player"],answer:"Antivirus"},
  {question:"Which is safe browsing?",options:["http","unknown sites","https","pirated"],answer:"https"},
  {question:"Which prevents unauthorized access?",options:["Firewall","Adware","Virus","Worm"],answer:"Firewall"},
  {question:"Which secures login?",options:["Username","Password","2FA","Email"],answer:"2FA"},
  {question:"Which is malware example?",options:["Browser","Editor","Virus","OS"],answer:"Virus"},
  {question:"Which protects privacy?",options:["VPN","Game","Editor","Player"],answer:"VPN"},
  {question:"Which attack monitors activity?",options:["DDoS","Trojan","Spyware","Firewall"],answer:"Spyware"},
  {question:"Which is data protection?",options:["Sharing","Encryption","Deletion","Leak"],answer:"Encryption"},
  {question:"Which is cyber safety rule?",options:["Share OTP","Strong password","Click ads","Disable AV"],answer:"Strong password"},
  {question:"Which tool scans virus?",options:["Editor","Browser","Antivirus","Player"],answer:"Antivirus"},
  {question:"Which is secure payment sign?",options:["Lock icon","Ads","Popup","Banner"],answer:"Lock icon"},
  {question:"Which protects email?",options:["Spam filter","Game","Editor","Player"],answer:"Spam filter"},
  {question:"Which is cyber awareness?",options:["Training","Hacking","Spamming","Piracy"],answer:"Training"},
  /* ================= D = 30 ================= */
  {question:"Which is NOT cyber attack?",options:["Phishing","Malware","DDoS","Firewall"],answer:"Firewall"},
  {question:"Which is NOT malware?",options:["Virus","Trojan","Worm","Antivirus"],answer:"Antivirus"},
  {question:"Which is NOT security tool?",options:["Firewall","VPN","Antivirus","Browser"],answer:"Browser"},
  {question:"Which is NOT safe?",options:["Strong password","2FA","HTTPS","Sharing OTP"],answer:"Sharing OTP"},
  {question:"Which is NOT attack?",options:["Phishing","DDoS","Spyware","Backup"],answer:"Backup"},
  {question:"Which is NOT encryption?",options:["AES","RSA","DES","HTML"],answer:"HTML"},
  {question:"Which is NOT authentication?",options:["Password","OTP","Biometrics","Wallpaper"],answer:"Wallpaper"},
  {question:"Which is NOT cyber crime?",options:["Hacking","Phishing","Identity theft","Software update"],answer:"Software update"},
  {question:"Which is NOT secure?",options:["HTTPS","VPN","Firewall","HTTP"],answer:"HTTP"},
  {question:"Which is NOT password rule?",options:["Uppercase","Numbers","Symbols","Username"],answer:"Username"},
  {question:"Which is NOT malware type?",options:["Virus","Trojan","Worm","Router"],answer:"Router"},
  {question:"Which is NOT network device?",options:["Router","Switch","Firewall","Antivirus"],answer:"Antivirus"},
  {question:"Which is NOT security principle?",options:["Confidentiality","Integrity","Availability","Accessibility"],answer:"Accessibility"},
  {question:"Which is NOT safe browsing?",options:["HTTPS","Trusted site","VPN","Unknown popup"],answer:"Unknown popup"},
  {question:"Which is NOT strong password?",options:["Ab@12","Xy#9","P@55","123456"],answer:"123456"},
  {question:"Which is NOT attack vector?",options:["Email","USB","Website","Monitor"],answer:"Monitor"},
  {question:"Which is NOT cyber threat?",options:["Malware","Phishing","DDoS","Keyboard"],answer:"Keyboard"},
  {question:"Which is NOT protection?",options:["Firewall","Antivirus","VPN","Malware"],answer:"Malware"},
  {question:"Which is NOT security practice?",options:["Update OS","Strong password","Backup","Share password"],answer:"Share password"},
  {question:"Which is NOT authentication factor?",options:["Password","OTP","Biometric","Color"],answer:"Color"},
  {question:"Which is NOT safe email?",options:["Verified sender","HTTPS link","Unknown attachment","Secure domain"],answer:"Unknown attachment"},
  {question:"Which is NOT cyber safety?",options:["Training","Awareness","Strong password","Piracy"],answer:"Piracy"},
  {question:"Which is NOT malware spread?",options:["Email","USB","Website","Firewall"],answer:"Firewall"},
  {question:"Which is NOT security layer?",options:["Network","Application","Physical","Entertainment"],answer:"Entertainment"},
  {question:"Which is NOT cyber law?",options:["IT Act","Data protection","Privacy law","Traffic rule"],answer:"Traffic rule"},
  {question:"Which is NOT secure login?",options:["2FA","Strong password","HTTPS","Guest login"],answer:"Guest login"},
  {question:"Which is NOT security software?",options:["Firewall","Antivirus","VPN","Photoshop"],answer:"Photoshop"},
  {question:"Which is NOT data protection?",options:["Encryption","Backup","Access control","Data leak"],answer:"Data leak"},
  {question:"Which is NOT cyber awareness?",options:["Training","Policy","Guidelines","Hacking"],answer:"Hacking"},
  {question:"Which is NOT threat?",options:["Virus","Malware","Phishing","Antivirus"],answer:"Antivirus"},
];

export default function CyberSecurityTest() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TEST_TIME);

  /* ======================= EXIT TEST ======================== */
  const exitTest = () => {
    localStorage.removeItem(STORAGE_KEY);
    navigate("/cyber-task", { replace: true });
  };

  /* ======================= LOAD TEST ======================== */
  useEffect(() => {
    // ❌ always clear previous test
    localStorage.removeItem(STORAGE_KEY);
    startNewTest();
  }, []);

  /* ======================= BLOCK REFRESH & BACK ======================== */
  useEffect(() => {
    if (finished) return;

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    const handlePopState = () => {
      const confirmExit = window.confirm(
        "Are you sure you want to exit the test?"
      );
      if (confirmExit) {
        exitTest();
      } else {
        navigate(0);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [finished]);

  /* ======================= START NEW TEST ======================== */
  const startNewTest = () => {
    const picked = [];
    const usedIndexes = new Set();

    while (picked.length < 20) {
      const i = Math.floor(Math.random() * ALL_QUESTIONS.length);
      if (!usedIndexes.has(i)) {
        picked.push(ALL_QUESTIONS[i]);
        usedIndexes.add(i);
      }
    }

    setQuestions(picked);
    setCurrent(0);
    setScore(0);
    setSelected("");
    setFinished(false);
    setTimeLeft(TEST_TIME);
  };

  /* ======================= TIMER ======================== */
  useEffect(() => {
    if (finished) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [finished]);

  /* ======================= NEXT ======================== */
  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore((s) => s + 1);
    }

    setSelected("");

    if (current + 1 < questions.length) {
      setCurrent((c) => c + 1);
    } else {
      handleFinish();
    }
  };

  /* ======================= FINISH ======================== */
  const handleFinish = () => {
    if (finished) return;

    if (selected === questions[current]?.answer) {
      setScore((s) => s + 1);
    }

    setFinished(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  const handleEndTest = () => {
    if (window.confirm("Are you sure you want to end the test?")) {
      handleFinish();
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
        >
          {!finished ? (
            <>
              <div className="flex justify-between mb-4 text-gray-300">
                <span>
                  Question {current + 1}/{questions.length}
                </span>
                <span className="text-green-400">
                  ⏱ {minutes}:{seconds.toString().padStart(2, "0")}
                </span>
              </div>

              <h1 className="text-2xl mb-6">
                {questions[current]?.question}
              </h1>

              <div className="space-y-4">
                {questions[current]?.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(opt)}
                    className={`w-full text-left px-4 py-3 rounded-lg border ${
                      selected === opt
                        ? "border-green-400 bg-green-400/20"
                        : "border-white/20"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <div className="mt-6 flex gap-4">
                <button
                  disabled={!selected}
                  onClick={handleNext}
                  className="flex-1 py-3 bg-green-500 text-black rounded-lg disabled:opacity-40"
                >
                  {current + 1 === questions.length ? "Submit Test" : "Next"}
                </button>

                {current + 1 < questions.length && (
                  <button
                    onClick={handleEndTest}
                    className="py-3 px-6 bg-red-500 text-black rounded-lg"
                  >
                    End Test
                  </button>
                )}
              </div>
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-4">
                Test Completed 🎉
              </h1>

              <p className="mb-4">
                Score:{" "}
                <span className="text-green-400">
                  {score}/{questions.length}
                </span>
              </p>

              {score >= PASS_SCORE ? (
                <button
                  onClick={() =>
                    navigate("/certificate", { state: { type: "cyber" , level : "beginner"} })
                  }
                  className="px-6 py-3 bg-green-500 text-black rounded-lg"
                >
                  Check Certificate
                </button>
              ) : (
                <>
                  <p className="text-red-500 mb-4">
                    You failed 😞
                  </p>
                  <button
                    onClick={() => navigate("/cyber-task")}
                    className="px-6 py-3 bg-red-500 text-black rounded-lg"
                  >
                    Back to Home
                  </button>
                </>
              )}
            </div>
          )}
        </motion.div>
      </div>

      <Footer />
    </>
  );
}






















