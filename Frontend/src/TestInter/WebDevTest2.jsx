import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "webdev_test_progress";

export const INTERMEDIATE_QUESTIONS = [
  // 1–10 HTML / Accessibility
  { question: "What is semantic HTML?", options: ["Design HTML","Meaningful tags","JS HTML","None"], answer: "Meaningful tags" },
  { question: "Which tag improves SEO?", options: ["div","span","article","b"], answer: "article" },
  { question: "alt attribute is used for?", options: ["Design","Accessibility","SEO","All"], answer: "All" },
  { question: "ARIA attributes improve?", options: ["Design","Accessibility","Speed","None"], answer: "Accessibility" },
  { question: "label tag is linked using?", options: ["id","for","name","class"], answer: "for" },
  { question: "Which tag defines navigation?", options: ["header","nav","menu","section"], answer: "nav" },
  { question: "main tag represents?", options: ["Sidebar","Main content","Footer","None"], answer: "Main content" },
  { question: "figure tag is used for?", options: ["Image with caption","Table","Layout","None"], answer: "Image with caption" },
  { question: "figcaption works with?", options: ["img","figure","div","span"], answer: "figure" },
  { question: "HTML forms send data using?", options: ["GET/POST","PUT","DELETE","None"], answer: "GET/POST" },

  // 11–25 CSS
  { question: "CSS Box Model includes?", options: ["Margin","Padding","Border","All"], answer: "All" },
  { question: "position: absolute is relative to?", options: ["Viewport","Parent","Nearest positioned ancestor","None"], answer: "Nearest positioned ancestor" },
  { question: "z-index works only with?", options: ["static","positioned","inline","None"], answer: "positioned" },
  { question: "display:none does?", options: ["Hide","Remove from layout","Opacity","None"], answer: "Remove from layout" },
  { question: "visibility:hidden does?", options: ["Remove","Hide but keep space","Delete DOM","None"], answer: "Hide but keep space" },
  { question: "Flexbox is best for?", options: ["1D layout","2D layout","Animation","None"], answer: "1D layout" },
  { question: "Grid is best for?", options: ["1D","2D","Typography","None"], answer: "2D" },
  { question: "Media queries used for?", options: ["SEO","Responsive design","Security","None"], answer: "Responsive design" },
  { question: "rem unit depends on?", options: ["Parent","Root","Viewport","None"], answer: "Root" },
  { question: "vh stands for?", options: ["View height","Viewport height","Visible height","None"], answer: "Viewport height" },
  { question: "Pseudo-class example?", options: [":hover","::before","::after","None"], answer: ":hover" },
  { question: "Pseudo-element example?", options: ["hover","::before","focus","None"], answer: "::before" },
  { question: "transition is used for?", options: ["Animation","Routing","State","None"], answer: "Animation" },
  { question: "transform affects?", options: ["Layout","Visual","DOM","None"], answer: "Visual" },
  { question: "overflow:hidden does?", options: ["Hide content","Scroll","Resize","None"], answer: "Hide content" },

  // 26–45 JavaScript
  { question: "JS is single-threaded?", options: ["Yes","No","Sometimes","None"], answer: "Yes" },
  { question: "Hoisting applies to?", options: ["Variables","Functions","Both","None"], answer: "Both" },
  { question: "let scope is?", options: ["Global","Block","Function","None"], answer: "Block" },
  { question: "const allows object mutation?", options: ["Yes","No","Sometimes","None"], answer: "Yes" },
  { question: "Closure gives access to?", options: ["Inner","Outer","Global only","None"], answer: "Outer" },
  { question: "Callback hell means?", options: ["Nested callbacks","Error","Promise","None"], answer: "Nested callbacks" },
  { question: "Promise states are?", options: ["2","3","4","5"], answer: "3" },
  { question: "async/await simplifies?", options: ["Loops","Promises","DOM","None"], answer: "Promises" },
  { question: "try-catch handles?", options: ["Loops","Errors","State","None"], answer: "Errors" },
  { question: "map() returns?", options: ["Same array","New array","Object","None"], answer: "New array" },
  { question: "filter() returns?", options: ["Boolean","Array","Object","None"], answer: "Array" },
  { question: "reduce() returns?", options: ["Array","Object","Single value","None"], answer: "Single value" },
  { question: "Spread operator is used to?", options: ["Copy","Merge","Expand","All"], answer: "All" },
  { question: "Destructuring improves?", options: ["Readability","Speed","Memory","None"], answer: "Readability" },
  { question: "Event delegation improves?", options: ["Performance","Design","Security","None"], answer: "Performance" },
  { question: "Debouncing is used for?", options: ["Delay execution","Repeat","Loop","None"], answer: "Delay execution" },
  { question: "Throttling limits?", options: ["Calls","Memory","State","None"], answer: "Calls" },
  { question: "JSON.parse does?", options: ["String to object","Object to string","Copy","None"], answer: "String to object" },
  { question: "JSON.stringify does?", options: ["Object to string","String to object","Delete","None"], answer: "Object to string" },
  { question: "setTimeout is?", options: ["Async","Sync","Blocking","None"], answer: "Async" },

  // 46–70 React
  { question: "React is?", options: ["Framework","Library","Language","DB"], answer: "Library" },
  { question: "Virtual DOM improves?", options: ["Speed","Security","Design","None"], answer: "Speed" },
  { question: "Re-render happens when?", options: ["State change","Props change","Both","None"], answer: "Both" },
  { question: "Controlled component uses?", options: ["DOM","State","Ref","None"], answer: "State" },
  { question: "Uncontrolled component uses?", options: ["State","DOM","Redux","None"], answer: "DOM" },
  { question: "useEffect runs after?", options: ["Render","Unmount","State","None"], answer: "Render" },
  { question: "Empty dependency array means?", options: ["Always","Once","Never","None"], answer: "Once" },
  { question: "Context API solves?", options: ["Routing","Props drilling","Styling","None"], answer: "Props drilling" },
  { question: "useRef persists value?", options: ["Between renders","Once","Never","None"], answer: "Between renders" },
  { question: "Fragment is used to?", options: ["Style","Wrap elements","Route","None"], answer: "Wrap elements" },
  { question: "useMemo optimizes?", options: ["Memory","Performance","State","None"], answer: "Performance" },
  { question: "useCallback is used for?", options: ["Memo function","Routing","State","None"], answer: "Memo function" },
  { question: "Props are?", options: ["Mutable","Read-only","Optional","None"], answer: "Read-only" },
  { question: "Key prop helps React to?", options: ["Render faster","Identify items","Style","None"], answer: "Identify items" },
  { question: "Lifting state up means?", options: ["Move to parent","Delete","Duplicate","None"], answer: "Move to parent" },
  { question: "Conditional rendering uses?", options: ["if/ternary","CSS","Hooks","None"], answer: "if/ternary" },
  { question: "Lazy loading improves?", options: ["Performance","SEO","Design","None"], answer: "Performance" },
  { question: "Suspense is used with?", options: ["Lazy","State","CSS","None"], answer: "Lazy" },
  { question: "SPA means?", options: ["Single Page App","Static App","Server App","None"], answer: "Single Page App" },
  { question: "React Router is used for?", options: ["Routing","Styling","API","None"], answer: "Routing" },

  // 71–100 API / Web / Security
  { question: "REST API uses?", options: ["HTTP","FTP","SMTP","None"], answer: "HTTP" },
  { question: "GET method is for?", options: ["Read","Create","Update","Delete"], answer: "Read" },
  { question: "POST method is for?", options: ["Read","Create","Update","Delete"], answer: "Create" },
  { question: "PUT method is for?", options: ["Read","Create","Update","Delete"], answer: "Update" },
  { question: "DELETE method is for?", options: ["Read","Create","Update","Delete"], answer: "Delete" },
  { question: "HTTP 200 means?", options: ["Success","Error","Redirect","None"], answer: "Success" },
  { question: "HTTP 401 means?", options: ["Unauthorized","Forbidden","Not found","None"], answer: "Unauthorized" },
  { question: "HTTP 404 means?", options: ["Unauthorized","Forbidden","Not found","None"], answer: "Not found" },
  { question: "CORS is related to?", options: ["Security","Design","Routing","None"], answer: "Security" },
  { question: "JWT is used for?", options: ["Auth","Design","SEO","None"], answer: "Auth" },
  { question: "LocalStorage persists until?", options: ["Cleared","Tab close","Refresh","None"], answer: "Cleared" },
  { question: "SessionStorage clears on?", options: ["Tab close","Refresh","Login","None"], answer: "Tab close" },
  { question: "Cookie stores?", options: ["User data","Images","Videos","Code"], answer: "User data" },
  { question: "XSS attack targets?", options: ["Client","Server","DB","None"], answer: "Client" },
  { question: "CSRF attack exploits?", options: ["Auth","Trust","CORS","None"], answer: "Trust" },
  { question: "HTTPS uses?", options: ["SSL/TLS","FTP","SMTP","None"], answer: "SSL/TLS" },
  { question: "DevTools used for?", options: ["Debugging","Design","Deploy","None"], answer: "Debugging" },
  { question: "Build tools example?", options: ["Vite","Webpack","Both","None"], answer: "Both" },
  { question: "CI/CD means?", options: ["Automation","Design","Security","None"], answer: "Automation" },
  { question: "Production build is?", options: ["Optimized","Debug","Slow","None"], answer: "Optimized" }
];


const TEST_TIME = 10 * 60; // 10 minutes
const PASS_SCORE = 7;

export default function WebDevelopmentTest2() {
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
      const randIndex = Math.floor(Math.random() * INTERMEDIATE_QUESTIONS.length);
      if (!pickedIndexes.has(randIndex)) {
        picked.push(INTERMEDIATE_QUESTIONS[randIndex]);
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
                      state: { type: "webdev" , level : "intermediate"},
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
