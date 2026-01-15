import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "core_security_test_progress";
const TEST_TIME = 10 * 60;
const PASS_SCORE = 7;

/* ================= QUESTIONS SAME ================= */

export const CORE_CSE_BEGINNER = [
{ question: "What is an Operating System?", options: ["Compiler","System software","Application","Hardware"], answer: "System software" },
{ question: "Which OS is open source?", options: ["Windows","Linux","macOS","DOS"], answer: "Linux" },
{ question: "What is CPU?", options: ["Memory","Processor","Storage","Software"], answer: "Processor" },
{ question: "Which memory is volatile?", options: ["ROM","HDD","RAM","SSD"], answer: "RAM" },
{ question: "What does DBMS stand for?", options: ["Data Base Management System","Data Backup System","Database Machine System","None"], answer: "Data Base Management System" },
{ question: "Which is a primary key?", options: ["Duplicate key","Unique identifier","Foreign key","Null key"], answer: "Unique identifier" },
{ question: "Which language is OOP?", options: ["C","Java","Assembly","HTML"], answer: "Java" },
{ question: "What is class?", options: ["Object","Blueprint","Function","Variable"], answer: "Blueprint" },
{ question: "What is object?", options: ["Instance of class","Blueprint","Method","Variable"], answer: "Instance of class" },
{ question: "What is inheritance?", options: ["Reusability","Hiding data","Binding","Overloading"], answer: "Reusability" },

{ question: "Which protocol is used for web?", options: ["FTP","SMTP","HTTP","SNMP"], answer: "HTTP" },
{ question: "What is IP address?", options: ["Device identifier","Username","Password","Protocol"], answer: "Device identifier" },
{ question: "Which is NOT OS?", options: ["Linux","Windows","Oracle","macOS"], answer: "Oracle" },
{ question: "What is software?", options: ["Programs","Hardware","CPU","RAM"], answer: "Programs" },
{ question: "Which memory is permanent?", options: ["RAM","Cache","ROM","Register"], answer: "ROM" },
{ question: "What is a compiler?", options: ["Translates code","Stores data","Manages memory","Handles CPU"], answer: "Translates code" },
{ question: "What is a database?", options: ["Collection of data","Computer","Software","Network"], answer: "Collection of data" },
{ question: "Which SQL command retrieves data?", options: ["SELECT","UPDATE","DELETE","DROP"], answer: "SELECT" },
{ question: "What is a network?", options: ["Connected devices","Software","Processor","Memory"], answer: "Connected devices" },
{ question: "Which device connects networks?", options: ["Switch","Router","Hub","Printer"], answer: "Router" },

{ question: "What is HTTP?", options: ["Protocol","Software","Hardware","Database"], answer: "Protocol" },
{ question: "Which layer is responsible for IP addressing?", options: ["Network","Transport","Application","Data Link"], answer: "Network" },
{ question: "What is DNS?", options: ["Domain Name System","Database","Data Network System","None"], answer: "Domain Name System" },
{ question: "Which protocol is secure?", options: ["HTTP","HTTPS","FTP","SMTP"], answer: "HTTPS" },
{ question: "Which is input device?", options: ["Keyboard","Monitor","Printer","Speaker"], answer: "Keyboard" },
{ question: "Which is output device?", options: ["Keyboard","Monitor","Mouse","Scanner"], answer: "Monitor" },
{ question: "What is RAM?", options: ["Volatile memory","Non-volatile memory","Processor","Hard disk"], answer: "Volatile memory" },
{ question: "What is ROM?", options: ["Read only memory","Random access memory","Processor","Cache"], answer: "Read only memory" },
{ question: "Which is storage device?", options: ["HDD","RAM","CPU","Cache"], answer: "HDD" },
{ question: "Which is programming language?", options: ["Python","Linux","Windows","HTML only"], answer: "Python" },

{ question: "Which is markup language?", options: ["HTML","Python","Java","C"], answer: "HTML" },
{ question: "Which is style sheet language?", options: ["CSS","HTML","Python","Java"], answer: "CSS" },
{ question: "Which is scripting language?", options: ["JavaScript","Java","C","C++"], answer: "JavaScript" },
{ question: "Which is compiled language?", options: ["C","Python","JavaScript","HTML"], answer: "C" },
{ question: "What is function?", options: ["Block of code","Variable","Object","Class"], answer: "Block of code" },
{ question: "What is variable?", options: ["Storage for data","Function","Object","Class"], answer: "Storage for data" },
{ question: "Which operator adds two numbers?", options: ["+","-","*","/"], answer: "+" },
{ question: "Which operator multiplies numbers?", options: ["+","-","*","/"], answer: "*" },
{ question: "Which loop repeats code?", options: ["for","if","switch","break"], answer: "for" },
{ question: "Which decision statement checks condition?", options: ["if","for","while","switch"], answer: "if" },

{ question: "Which is keyword for function?", options: ["def","var","class","object"], answer: "def" },
{ question: "Which is logical operator AND?", options: ["&&","||","!","%"], answer: "&&" },
{ question: "Which is logical operator OR?", options: ["&&","||","!","%"], answer: "||" },
{ question: "Which is logical operator NOT?", options: ["!","&&","||","%"], answer: "!" },
{ question: "Which is looping statement?", options: ["for","if","switch","break"], answer: "for" },
{ question: "Which statement exits loop?", options: ["break","continue","for","if"], answer: "break" },
{ question: "Which statement skips iteration?", options: ["continue","break","exit","return"], answer: "continue" },
{ question: "Which is object oriented concept?", options: ["Encapsulation","Protocol","HTTP","SQL"], answer: "Encapsulation" },
{ question: "Which is polymorphism example?", options: ["Method overloading","Method call","Variable","Function"], answer: "Method overloading" },
{ question: "Which is abstraction?", options: ["Hiding implementation","Calling function","Variable","Object"], answer: "Hiding implementation" },

{ question: "Which is OS function?", options: ["Memory management","Writing code","Drawing graphics","Typing"], answer: "Memory management" },
{ question: "Which is file system type?", options: ["NTFS","C++","Python","HTTP"], answer: "NTFS" },
{ question: "Which is network topology?", options: ["Star","Bus","Ring","All of these"], answer: "All of these" },
{ question: "Which is IP version?", options: ["IPv4","HTML","CSS","Java"], answer: "IPv4" },
{ question: "Which is database type?", options: ["Relational","Non-relational","Both","None"], answer: "Both" },
{ question: "Which is SQL command?", options: ["SELECT","UPDATE","DELETE","All of these"], answer: "All of these" },
{ question: "Which is DDL command?", options: ["CREATE","INSERT","UPDATE","DELETE"], answer: "CREATE" },
{ question: "Which is DML command?", options: ["INSERT","UPDATE","DELETE","All of these"], answer: "All of these" },
{ question: "Which is primary database key?", options: ["Unique","Duplicate","Null","Foreign"], answer: "Unique" },

{ question: "Which is foreign key?", options: ["Links tables","Stores data","Deletes table","Updates record"], answer: "Links tables" },
{ question: "Which is TCP/IP protocol?", options: ["TCP","UDP","ICMP","All of these"], answer: "All of these" },
{ question: "Which is UDP?", options: ["Connectionless protocol","Connection-oriented","IP address","Firewall"], answer: "Connectionless protocol" },
{ question: "Which is router function?", options: ["Forward packets","Compile code","Encrypt data","Design page"], answer: "Forward packets" },
{ question: "Which is switch function?", options: ["Forward frames","Store data","Encrypt data","Compile code"], answer: "Forward frames" },
{ question: "Which is hub function?", options: ["Broadcast data","Route packets","Store tables","Encrypt"], answer: "Broadcast data" },
{ question: "Which is MAC address?", options: ["Hardware address","IP address","Software","Variable"], answer: "Hardware address" },
{ question: "Which is DNS function?", options: ["Maps domain to IP","Compiles code","Stores data","Encrypts"], answer: "Maps domain to IP" },
{ question: "Which is HTTP function?", options: ["Transfer web pages","Encrypt data","Store data","Compile"], answer: "Transfer web pages" },

{ question: "Which is SMTP?", options: ["Send emails","Send SMS","Store files","Transfer pages"], answer: "Send emails" },
{ question: "Which is POP3?", options: ["Receive emails","Send emails","Store files","Transfer pages"], answer: "Receive emails" },
{ question: "Which is IMAP?", options: ["Email protocol","Database","OS","Firewall"], answer: "Email protocol" },
{ question: "Which is SSL?", options: ["Secure communication","Database","Hardware","Software"], answer: "Secure communication" },
{ question: "Which is TLS?", options: ["Transport layer security","Database","Hardware","Software"], answer: "Transport layer security" },
{ question: "Which is hashing?", options: ["Data fingerprint","Store file","Transfer page","Compile"], answer: "Data fingerprint" },
{ question: "Which is firewall?", options: ["Network security","Database","OS","Software"], answer: "Network security" },
{ question: "Which is malware?", options: ["Malicious software","OS","Database","Network device"], answer: "Malicious software" },
{ question: "Which is virus?", options: ["Malware type","Database","OS","Network"], answer: "Malware type" },
{ question: "Which is trojan?", options: ["Malware type","OS","Hardware","Software"], answer: "Malware type" },
{ question: "Which is worm?", options: ["Malware type","OS","Database","Network"], answer: "Malware type" },
{ question: "Which is spyware?", options: ["Malware type","OS","Network","Database"], answer: "Malware type" },
{ question: "Which is phishing?", options: ["Social engineering","Database","OS","Network"], answer: "Social engineering" },
{ question: "Which is DoS attack?", options: ["Denial of Service","Database","OS","Network"], answer: "Denial of Service" },
{ question: "Which is DDoS attack?", options: ["Distributed Denial of Service","Database","OS","Network"], answer: "Distributed Denial of Service" },
{ question: "Which is SQL injection?", options: ["Database attack","OS","Network","Software"], answer: "Database attack" },
{ question: "Which is XSS attack?", options: ["Cross site scripting","OS","Database","Network"], answer: "Cross site scripting" },
{ question: "Which is CSRF attack?", options: ["Cross site request forgery","OS","Database","Network"], answer: "Cross site request forgery" },
{ question: "Which is authentication?", options: ["Verify identity","Database","OS","Network"], answer: "Verify identity" },
{ question: "Which is authorization?", options: ["Access permission","OS","Database","Network"], answer: "Access permission" },
{ question: "Which is session?", options: ["Temporary user data","OS","Database","Network"], answer: "Temporary user data" },
{ question: "Which is cookie?", options: ["Stores client data","Database","OS","Network"], answer: "Stores client data" },
{ question: "Which is cache?", options: ["Temporary fast memory","Database","OS","Network"], answer: "Temporary fast memory" },
{ question: "Which is buffer?", options: ["Temporary storage","Database","OS","Network"], answer: "Temporary storage" },
{ question: "Which is interrupt?", options: ["Signal to CPU","Database","OS","Network"], answer: "Signal to CPU" },
{ question: "Which is deadlock?", options: ["Resource wait","OS crash","Database error","Network block"], answer: "Resource wait" },
{ question: "Which is race condition?", options: ["Concurrent access issue","OS crash","Database error","Network block"], answer: "Concurrent access issue" },
{ question: "Which is semaphore?", options: ["Sync tool","Database","OS","Network"], answer: "Sync tool" },
{ question: "Which is thread?", options: ["Lightweight process","Database","OS","Network"], answer: "Lightweight process" },
{ question: "Which is process?", options: ["Program in execution","Database","OS","Network"], answer: "Program in execution" },
{ question: "Which is kernel?", options: ["Core OS","Database","Hardware","Network"], answer: "Core OS" },
{ question: "Which is shell?", options: ["Command interpreter","Database","Hardware","Network"], answer: "Command interpreter" },
{ question: "Which is file?", options: ["Data container","Database","OS","Network"], answer: "Data container" },
{ question: "Which is directory?", options: ["Folder","Database","OS","Network"], answer: "Folder" }
];


export default function CoreCSETest() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TEST_TIME);
  const [user, setUser] = useState({ name: "User" });

  /* ================= EXIT TEST ================= */
  const exitTest = () => {
    localStorage.removeItem(STORAGE_KEY);
    navigate("/core-cse-task", { replace: true });
  };

  /* ================= ON MOUNT ================= */
  useEffect(() => {
    // ❌ always start fresh
    localStorage.removeItem(STORAGE_KEY);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    startNewTest();
  }, []);

  /* ================= BLOCK REFRESH / BACK ================= */
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

  /* ================= START NEW TEST ================= */
  const startNewTest = () => {
    const picked = [];
    const used = new Set();

    while (picked.length < 20) {
      const i = Math.floor(Math.random() * CORE_CSE_BEGINNER.length);
      if (!used.has(i)) {
        picked.push(CORE_CSE_BEGINNER[i]);
        used.add(i);
      }
    }

    setQuestions(picked);
    setCurrent(0);
    setScore(0);
    setSelected("");
    setFinished(false);
    setTimeLeft(TEST_TIME);
  };

  /* ================= TIMER ================= */
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

  /* ================= NEXT ================= */
  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore((p) => p + 1);
    }

    setSelected("");

    if (current + 1 < questions.length) {
      setCurrent((p) => p + 1);
    } else {
      handleFinish();
    }
  };

  /* ================= FINISH ================= */
  const handleFinish = () => {
    if (finished) return;

    if (selected === questions[current]?.answer) {
      setScore((p) => p + 1);
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
                  {current + 1 === questions.length
                    ? "Submit Test"
                    : "Next"}
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
            <div className="text-center py-10">
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
                    navigate("/certificate", {
                      state: { type: "core" , level : "beginner" },
                    })
                  }
                  className="px-6 py-3 bg-green-500 text-black rounded-lg"
                >
                  Check Certificate
                </button>
              ) : (
                <>
                  <p className="text-red-500 mb-4">
                    {user.name}, You failed 😞
                  </p>
                  <button
                    onClick={() => navigate("/core-cse-task")}
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
