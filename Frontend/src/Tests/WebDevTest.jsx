import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "webdev_test_progress";

export const ALL_QUESTIONS = [
  { question: "What does Web Development mean?", options: ["Only design","Only backend","Building websites & web apps","Mobile apps"], answer: "Building websites & web apps" },
  { question: "Which language is used to structure web pages?", options: ["CSS","HTML","JavaScript","Python"], answer: "HTML" },
  { question: "Which language is used for styling web pages?", options: ["HTML","Java","CSS","PHP"], answer: "CSS" },
  { question: "Which language adds interactivity to websites?", options: ["HTML","CSS","JavaScript","SQL"], answer: "JavaScript" },
  { question: "What is the full form of HTML?", options: ["Hyper Text Markup Language","High Tool ML","Hyperlinks Text ML","None"], answer: "Hyper Text Markup Language" },
  { question: "What is the full form of CSS?", options: ["Creative Style Sheets","Cascading Style Sheets","Color Style Sheets","None"], answer: "Cascading Style Sheets" },
  { question: "What does DOM stand for?", options: ["Document Object Model","Data Object Model","Digital Object Model","None"], answer: "Document Object Model" },
  { question: "Which tag is used for links?", options: ["<link>","<a>","<href>","<url>"], answer: "<a>" },
  { question: "Which tag is used to insert image?", options: ["<img>","<image>","<pic>","<src>"], answer: "<img>" },
  { question: "Which attribute gives image path?", options: ["href","src","alt","path"], answer: "src" },

  { question: "Which CSS property changes text color?", options: ["background","font","color","text"], answer: "color" },
  { question: "Which CSS property controls layout?", options: ["flex","grid","Both flex & grid","None"], answer: "Both flex & grid" },
  { question: "What is responsive design?", options: ["Fast website","Mobile friendly design","Backend logic","Hosting"], answer: "Mobile friendly design" },
  { question: "Which unit is relative in CSS?", options: ["px","cm","%","mm"], answer: "%" },
  { question: "Which display value hides element?", options: ["block","none","inline","flex"], answer: "none" },

  { question: "What is JavaScript?", options: ["Markup language","Styling language","Programming language","Database"], answer: "Programming language" },
  { question: "Which keyword declares variable?", options: ["var","let","const","All"], answer: "All" },
  { question: "Which symbol is used for comments in JS?", options: ["//","<!-- -->","**","##"], answer: "//" },
  { question: "Which function prints output?", options: ["print()","log()","console.log()","write()"], answer: "console.log()" },
  { question: "Which operator compares value & type?", options: ["==","=","===","!="], answer: "===" },

  { question: "What is React?", options: ["Framework","Library","Language","Database"], answer: "Library" },
  { question: "Who developed React?", options: ["Google","Facebook","Microsoft","Amazon"], answer: "Facebook" },
  { question: "What is JSX?", options: ["CSS","HTML-like syntax","JSON","API"], answer: "HTML-like syntax" },
  { question: "What is a component?", options: ["Function/UI block","Database","API","CSS file"], answer: "Function/UI block" },
  { question: "Which hook manages state?", options: ["useEffect","useState","useRef","useMemo"], answer: "useState" },

  { question: "What is useEffect used for?", options: ["State","Side effects","Routing","Design"], answer: "Side effects" },
  { question: "Props are?", options: ["Mutable","Read-only","Optional","State"], answer: "Read-only" },
  { question: "What is React Router?", options: ["Styling","Routing","API","State"], answer: "Routing" },
  { question: "Which hook is used for navigation?", options: ["useMove","usePath","useNavigate","useRouter"], answer: "useNavigate" },
  { question: "What is SPA?", options: ["Single Page Application","Static Page App","Server Page App","None"], answer: "Single Page Application" },

  { question: "What is API?", options: ["UI design","Data bridge","Database","Server"], answer: "Data bridge" },
  { question: "Which method fetches data?", options: ["fetch","axios","Both","None"], answer: "Both" },
  { question: "What is JSON?", options: ["Text format","Image","Language","Framework"], answer: "Text format" },
  { question: "Which method converts JSON to object?", options: ["parse","stringify","convert","map"], answer: "parse" },

  { question: "What is Git?", options: ["Language","Version control","Framework","Database"], answer: "Version control" },
  { question: "What is GitHub?", options: ["IDE","Hosting for code","Compiler","Browser"], answer: "Hosting for code" },
  { question: "What is npm?", options: ["Node Package Manager","New Program Method","None","Network"], answer: "Node Package Manager" },
  { question: "Which command starts React app?", options: ["npm run","npm start","npm build","npm stop"], answer: "npm start" },
  { question: "Which command builds production app?", options: ["npm start","npm install","npm build","npm dev"], answer: "npm build" },

  // ===== EXTRA QUESTIONS (51–100) =====

  { question: "What is backend?", options: ["UI part","Server logic","Design","Animation"], answer: "Server logic" },
  { question: "Node.js is?", options: ["Browser","Runtime","Framework","Database"], answer: "Runtime" },
  { question: "Which database is NoSQL?", options: ["MySQL","MongoDB","PostgreSQL","Oracle"], answer: "MongoDB" },
  { question: "What is hosting?", options: ["Coding","Design","Storing website online","Testing"], answer: "Storing website online" },
  { question: "Which protocol is secure?", options: ["HTTP","FTP","HTTPS","SMTP"], answer: "HTTPS" },

  { question: "What is SEO?", options: ["Design","Security","Search Engine Optimization","Server"], answer: "Search Engine Optimization" },
  { question: "Which tag is semantic?", options: ["div","span","header","b"], answer: "header" },
  { question: "What is viewport?", options: ["Screen area","Database","API","Server"], answer: "Screen area" },
  { question: "CSS framework example?", options: ["React","Bootstrap","Node","Git"], answer: "Bootstrap" },
  { question: "Tailwind CSS is?", options: ["Component CSS","Utility-first CSS","Language","Database"], answer: "Utility-first CSS" },

  { question: "What is debugging?", options: ["Testing","Fixing errors","Deploying","Designing"], answer: "Fixing errors" },
  { question: "What is deployment?", options: ["Coding","Testing","Making site live","Design"], answer: "Making site live" },
  { question: "What is UI?", options: ["User Interface","User Internet","Universal Interface","None"], answer: "User Interface" },
  { question: "What is UX?", options: ["User Experience","User Extension","Extra UI","None"], answer: "User Experience" },
  { question: "What is CDN?", options: ["Code Data Network","Content Delivery Network","Central Dev Node","None"], answer: "Content Delivery Network" },

  { question: "Which tool checks console errors?", options: ["VS Code","Chrome DevTools","Notepad","Git"], answer: "Chrome DevTools" },
  { question: "LocalStorage is stored in?", options: ["Server","Browser","Database","Cloud"], answer: "Browser" },
  { question: "Session ends when?", options: ["Browser closed","Server down","Refresh","Login"], answer: "Browser closed" },
  { question: "Cookie stores?", options: ["Images","Videos","User data","Code"], answer: "User data" },
  { question: "Full stack developer knows?", options: ["Frontend","Backend","Both","None"], answer: "Both" }
];


const TEST_TIME = 10 * 60; // 10 minutes
const PASS_SCORE = 7;

export default function WebDevelopmentTest() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TEST_TIME);
  const [user, setUser] = useState({ name: "User" });

  const exitTest = () => {
    localStorage.removeItem(STORAGE_KEY);
    navigate("/webdev-task", { replace: true });
  };

  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    startNewTest();
  }, []);

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

  const startNewTest = () => {
    const picked = [];
    const pickedIndexes = new Set();

    while (picked.length < 20) {
      const randIndex = Math.floor(Math.random() * ALL_QUESTIONS.length);
      if (!pickedIndexes.has(randIndex)) {
        picked.push(ALL_QUESTIONS[randIndex]);
        pickedIndexes.add(randIndex);
      }
    }

    setQuestions(picked);
    setCurrent(0);
    setScore(0);
    setSelected("");
    setFinished(false);
    setTimeLeft(TEST_TIME);

    localStorage.removeItem(STORAGE_KEY);
  };

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

  const handleNext = () => {
    if (selected === questions[current].answer) {
      setScore((prev) => prev + 1);
    }

    setSelected("");

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    if (finished) return;

    if (selected === questions[current]?.answer) {
      setScore((prev) => prev + 1);
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

              <h1 className="text-2xl mb-6">{questions[current]?.question}</h1>

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
              <h1 className="text-3xl font-bold mb-4">Test Completed 🎉</h1>

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
                      state: { type: "webdev" , level : "beginner"},
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
                    onClick={() => navigate("/webdev-task")}
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
