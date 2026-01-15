import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "webdev_test_progress";

export const ADVANCED_QUESTIONS = [
  // 1–10 JavaScript Core
  { question: "What is event delegation?", options: ["Multiple listeners","Single listener on parent","Inline events","None"], answer: "Single listener on parent" },
  { question: "What is closure in JavaScript?", options: ["Loop function","Preserved lexical scope","Block scope","Callback"], answer: "Preserved lexical scope" },
  { question: "What is hoisting?", options: ["Runtime moving","Compile-time allocation","Async execution","Error handling"], answer: "Compile-time allocation" },
  { question: "Which is NOT a primitive?", options: ["Symbol","BigInt","Object","Boolean"], answer: "Object" },
  { question: "What does prototype enable?", options: ["Styling","Inheritance","Routing","Async"], answer: "Inheritance" },
  { question: "What is TDZ?", options: ["Async zone","Before declaration access","Memory leak","Scope error"], answer: "Before declaration access" },
  { question: "What is deep copy?", options: ["Reference copy","Recursive value copy","Shallow clone","JSON ref"], answer: "Recursive value copy" },
  { question: "What is memoization?", options: ["Cache result","Clear memory","DOM optimize","Reduce bundle"], answer: "Cache result" },
  { question: "What is currying?", options: ["Function returning function","Loop technique","Promise chain","Array map"], answer: "Function returning function" },
  { question: "What is garbage collection?", options: ["Delete vars","Free unused memory","Reset heap","Clear stack"], answer: "Free unused memory" },

  // 11–20 JS Advanced
  { question: "What does Object.freeze do?", options: ["No modify","No add/remove","Full immutability","Seal only"], answer: "Full immutability" },
  { question: "What does Object.seal do?", options: ["No changes","No add/remove","No modify","Freeze"], answer: "No add/remove" },
  { question: "What is WeakMap?", options: ["Strong ref","Garbage-collectable keys","Array map","JSON store"], answer: "Garbage-collectable keys" },
  { question: "Which loop handles async best?", options: ["for","forEach","for...of","map"], answer: "for...of" },
  { question: "What is debounce?", options: ["Delay execution","Repeat execution","Cancel call","Throttle"], answer: "Delay execution" },
  { question: "What is throttle?", options: ["Limit execution rate","Delay once","Cancel promise","Queue"], answer: "Limit execution rate" },
  { question: "What is call/apply/bind used for?", options: ["Async","Change this","Loop","Prototype"], answer: "Change this" },
  { question: "What is event loop?", options: ["JS engine","Task scheduling","Thread","Promise API"], answer: "Task scheduling" },
  { question: "What runs microtasks?", options: ["setTimeout","Promises","DOM","XHR"], answer: "Promises" },
  { question: "What is stack overflow?", options: ["Memory full","Infinite recursion","Heap error","Async bug"], answer: "Infinite recursion" },

  // 21–30 React Core
  { question: "What is Virtual DOM?", options: ["Browser DOM","JS object tree","Shadow DOM","HTML copy"], answer: "JS object tree" },
  { question: "Why Virtual DOM is fast?", options: ["Less nodes","Batch updates","Direct DOM","Caching"], answer: "Batch updates" },
  { question: "What is reconciliation?", options: ["DOM diffing","Routing","Mounting","Hydration"], answer: "DOM diffing" },
  { question: "What is key prop used for?", options: ["Security","Performance","Styling","State"], answer: "Performance" },
  { question: "What triggers re-render?", options: ["State/props change","CSS","HTML","API"], answer: "State/props change" },
  { question: "What is React Fiber?", options: ["DOM engine","Reconciliation algo","Router","Compiler"], answer: "Reconciliation algo" },
  { question: "What is controlled component?", options: ["DOM controlled","State controlled","API controlled","CSS"], answer: "State controlled" },
  { question: "What is useRef?", options: ["State","DOM reference","Effect","Router"], answer: "DOM reference" },
  { question: "What is useCallback?", options: ["Cache function","Cache value","Side effect","Ref"], answer: "Cache function" },
  { question: "What is useMemo?", options: ["Cache value","Cache DOM","Effect","State"], answer: "Cache value" },

  // 31–40 React Advanced
  { question: "What is HOC?", options: ["Hook","Higher Order Component","API","Router"], answer: "Higher Order Component" },
  { question: "What is lazy loading?", options: ["Load on demand","Slow load","Cache","Preload"], answer: "Load on demand" },
  { question: "What is code splitting?", options: ["Split bundle","Split CSS","Split API","Split state"], answer: "Split bundle" },
  { question: "What is hydration?", options: ["Attach SSR","Fetch API","CSS load","State reset"], answer: "Attach SSR" },
  { question: "What is SSR?", options: ["Server render","Client render","Hybrid","Static"], answer: "Server render" },
  { question: "What is Context API?", options: ["Global state","Routing","API","Styling"], answer: "Global state" },
  { question: "What causes infinite render?", options: ["setState in render","CSS","HTML","Props"], answer: "setState in render" },
  { question: "What is StrictMode?", options: ["Prod tool","Dev warnings","Security","Compiler"], answer: "Dev warnings" },
  { question: "What is forwardRef?", options: ["Pass ref","Pass state","Pass props","Memo"], answer: "Pass ref" },
  { question: "What is portal?", options: ["Render outside DOM tree","Routing","API","Lazy load"], answer: "Render outside DOM tree" },

  // 41–60 Web + Security
  { question: "What is CORS?", options: ["Security policy","API","Auth","Browser bug"], answer: "Security policy" },
  { question: "What causes CORS error?", options: ["Different origin","Timeout","DNS","JSON"], answer: "Different origin" },
  { question: "What is preflight request?", options: ["OPTIONS","GET","POST","HEAD"], answer: "OPTIONS" },
  { question: "What is JWT?", options: ["Session token","Stateless auth","Cookie","API key"], answer: "Stateless auth" },
  { question: "JWT has how many parts?", options: ["2","3","4","5"], answer: "3" },
  { question: "What is OAuth?", options: ["Authorization","Authentication","Encryption","DB"], answer: "Authorization" },
  { question: "What is CSRF?", options: ["Cross-site attack","SQLi","XSS","DDoS"], answer: "Cross-site attack" },
  { question: "What is XSS?", options: ["Script injection","SQL","Auth bug","Server error"], answer: "Script injection" },
  { question: "HTTPS uses?", options: ["RSA + AES","Only RSA","Only AES","None"], answer: "RSA + AES" },
  { question: "What is hashing?", options: ["One-way","Reversible","Encryption","Compression"], answer: "One-way" },

  // 61–80 APIs & Performance
  { question: "What is REST?", options: ["Architecture","Protocol","Framework","Library"], answer: "Architecture" },
  { question: "Which method is idempotent?", options: ["POST","PUT","PATCH","CONNECT"], answer: "PUT" },
  { question: "What is GraphQL?", options: ["Query language","DB","Framework","Server"], answer: "Query language" },
  { question: "GraphQL benefit?", options: ["No overfetch","Fast DB","Secure","Simple"], answer: "No overfetch" },
  { question: "What is WebSocket?", options: ["Persistent connection","HTTP","Polling","API"], answer: "Persistent connection" },
  { question: "What is polling?", options: ["Repeated requests","Push","Socket","Stream"], answer: "Repeated requests" },
  { question: "What is CDN?", options: ["Content Delivery Network","Code Data","Central Dev","None"], answer: "Content Delivery Network" },
  { question: "What is tree shaking?", options: ["Remove unused code","Split CSS","Compress","Cache"], answer: "Remove unused code" },
  { question: "What is bundler?", options: ["Webpack","React","Node","Browser"], answer: "Webpack" },
  { question: "What is transpiler?", options: ["Babel","NPM","ESLint","Jest"], answer: "Babel" },

  // 81–100 PWA & Metrics
  { question: "What is service worker?", options: ["Background script","Thread","API","Server"], answer: "Background script" },
  { question: "What is PWA?", options: ["Progressive Web App","Private","Public","None"], answer: "Progressive Web App" },
  { question: "What is Lighthouse?", options: ["Audit tool","Browser","Framework","Server"], answer: "Audit tool" },
  { question: "What is CRP?", options: ["Rendering steps","JS flow","CSS flow","API"], answer: "Rendering steps" },
  { question: "What causes layout shift?", options: ["Image without size","JS error","CSS reset","API"], answer: "Image without size" },
  { question: "What are Web Vitals?", options: ["Performance metrics","SEO","Security","APIs"], answer: "Performance metrics" },
  { question: "LCP stands for?", options: ["Largest Contentful Paint","Load Process","Layout Paint","None"], answer: "Largest Contentful Paint" },
  { question: "CLS measures?", options: ["Layout stability","Load time","JS speed","Memory"], answer: "Layout stability" },
  { question: "TTFB means?", options: ["Time to First Byte","Total Fetch","Thread Freeze","None"], answer: "Time to First Byte" },
  { question: "HTTP/2 feature?", options: ["Multiplexing","Blocking","No headers","Text"], answer: "Multiplexing" }
];


const TEST_TIME = 10 * 60; // 10 minutes
const PASS_SCORE = 7;

export default function WebDevelopmentTest3() {
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
      const randIndex = Math.floor(Math.random() * ADVANCED_QUESTIONS.length);
      if (!pickedIndexes.has(randIndex)) {
        picked.push(ADVANCED_QUESTIONS[randIndex]);
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
                      state: { type: "webdev" , level : "advanced"},
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
