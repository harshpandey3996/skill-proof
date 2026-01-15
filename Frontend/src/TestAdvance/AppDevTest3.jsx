import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "appdev_test_progress";
const TEST_TIME = 10 * 60;
const PASS_SCORE = 7;


export const ADVANCED_QUESTIONS = [
  // 1–10 Architecture
  { question: "What is Clean Architecture?", options: ["UI design","Layered separation","Database pattern","API style"], answer: "Layered separation" },
  { question: "Which layer contains business logic?", options: ["UI","Domain","Data","Framework"], answer: "Domain" },
  { question: "MVVM stands for?", options: ["Model View ViewModel","Model View VirtualModel","Main View VM","None"], answer: "Model View ViewModel" },
  { question: "What is dependency inversion?", options: ["High → low","Low → high","UI → DB","None"], answer: "High → low" },
  { question: "Which pattern decouples UI & logic?", options: ["BLoC","Singleton","Factory","Adapter"], answer: "BLoC" },
  { question: "What is repository pattern?", options: ["Data abstraction","UI logic","Routing","State"], answer: "Data abstraction" },
  { question: "Which RN architecture improves performance?", options: ["New Architecture","Bridge","Legacy","MVC"], answer: "New Architecture" },
  { question: "Which Android lib supports DI?", options: ["Hilt","Room","Retrofit","Glide"], answer: "Hilt" },
  { question: "What is service locator?", options: ["DI pattern","API tool","Routing","Testing"], answer: "DI pattern" },
  { question: "Which Flutter pattern handles streams?", options: ["BLoC","Provider","MVC","Redux"], answer: "BLoC" },

  // 11–20 Performance
  { question: "What causes UI jank?", options: ["Main thread work","Async calls","Isolates","Caching"], answer: "Main thread work" },
  { question: "Which Flutter isolates heavy work?", options: ["Isolate","Future","Stream","Async"], answer: "Isolate" },
  { question: "Which Android thread handles UI?", options: ["Main","Worker","IO","Background"], answer: "Main" },
  { question: "Which RN component optimizes lists?", options: ["FlatList","ScrollView","View","Text"], answer: "FlatList" },
  { question: "What is frame budget?", options: ["16ms","60ms","1s","100ms"], answer: "16ms" },
  { question: "Which Flutter widget avoids rebuild?", options: ["const","key","ref","memo"], answer: "const" },
  { question: "What is memoization?", options: ["Cache results","Delete cache","Thread","State"], answer: "Cache results" },
  { question: "Which Android tool finds memory leaks?", options: ["LeakCanary","Logcat","ADB","Profiler"], answer: "LeakCanary" },
  { question: "Which RN hook memoizes values?", options: ["useMemo","useEffect","useRef","useState"], answer: "useMemo" },
  { question: "Which Flutter widget repaints only child?", options: ["RepaintBoundary","Container","Stack","Clip"], answer: "RepaintBoundary" },

  // 21–30 State Management
  { question: "Which Flutter state is immutable?", options: ["State","Widget","BuildContext","Element"], answer: "Widget" },
  { question: "Which RN lib manages global state?", options: ["Redux","Axios","Formik","Jest"], answer: "Redux" },
  { question: "What is unidirectional data flow?", options: ["One-way state","Two-way","Async","Parallel"], answer: "One-way state" },
  { question: "Which Flutter lib uses providers?", options: ["Riverpod","Bloc","MobX","Redux"], answer: "Riverpod" },
  { question: "Which Android component holds UI state?", options: ["ViewModel","Activity","Fragment","Service"], answer: "ViewModel" },
  { question: "What is state hoisting?", options: ["Move state up","Delete state","Freeze","Copy"], answer: "Move state up" },
  { question: "Which RN hook avoids re-render?", options: ["useCallback","useEffect","useState","useLayout"], answer: "useCallback" },
  { question: "What is reactive programming?", options: ["Stream-based","UI design","API","Database"], answer: "Stream-based" },
  { question: "Which Flutter uses reactive streams?", options: ["RxDart","Dart IO","HTTP","Isolate"], answer: "RxDart" },
  { question: "Which Android lib uses reactive streams?", options: ["LiveData","Room","Glide","Paging"], answer: "LiveData" },

  // 31–40 Networking
  { question: "What is idempotent API?", options: ["Same result","Secure","Cached","Fast"], answer: "Same result" },
  { question: "Which HTTP method is idempotent?", options: ["PUT","POST","PATCH","CONNECT"], answer: "PUT" },
  { question: "What is API throttling?", options: ["Rate limit","Auth","Cache","Encrypt"], answer: "Rate limit" },
  { question: "Which Flutter lib intercepts requests?", options: ["Dio","http","Fetch","Socket"], answer: "Dio" },
  { question: "What is exponential backoff?", options: ["Retry strategy","Cache","Encrypt","Compress"], answer: "Retry strategy" },
  { question: "Which RN handles sockets?", options: ["WebSocket","Axios","Fetch","REST"], answer: "WebSocket" },
  { question: "Which HTTP status is client error?", options: ["4xx","2xx","3xx","5xx"], answer: "4xx" },
  { question: "What is GraphQL advantage?", options: ["Exact data","More calls","Less secure","Slower"], answer: "Exact data" },
  { question: "Which Android lib handles REST?", options: ["Retrofit","Volley","Both","None"], answer: "Both" },
  { question: "What is request serialization?", options: ["Object → JSON","JSON → Object","Encrypt","Cache"], answer: "Object → JSON" },

  // 41–50 Storage & DB
  { question: "What is ACID?", options: ["DB properties","API rules","Security","Threading"], answer: "DB properties" },
  { question: "Which DB supports relations?", options: ["SQL","NoSQL","Cache","Memory"], answer: "SQL" },
  { question: "Which Flutter DB is encrypted?", options: ["Hive","SQLite","Prefs","Memory"], answer: "Hive" },
  { question: "Which Android ORM?", options: ["Room","Realm","Firebase","CoreData"], answer: "Room" },
  { question: "What is data migration?", options: ["Schema change","Backup","Delete","Sync"], answer: "Schema change" },
  { question: "Which iOS DB is ORM-based?", options: ["CoreData","Realm","SQLite","FMDB"], answer: "CoreData" },
  { question: "What is offline-first?", options: ["Local priority","API only","Cache only","Server first"], answer: "Local priority" },
  { question: "Which RN DB is fast?", options: ["MMKV","AsyncStorage","SQLite","Realm"], answer: "MMKV" },
  { question: "What is write-ahead logging?", options: ["DB safety","Cache","Encrypt","Sync"], answer: "DB safety" },
  { question: "Which storage survives reinstall?", options: ["Cloud","Local","Cache","Memory"], answer: "Cloud" },

  // 51–60 Security
  { question: "What is certificate pinning?", options: ["Server trust","Token","Cache","Encrypt DB"], answer: "Server trust" },
  { question: "Which attack intercepts traffic?", options: ["MITM","XSS","CSRF","SQLi"], answer: "MITM" },
  { question: "Which Android secures keys?", options: ["Keystore","Prefs","Room","Cache"], answer: "Keystore" },
  { question: "What is OAuth?", options: ["Auth protocol","DB","API","Cache"], answer: "Auth protocol" },
  { question: "Which token refreshes session?", options: ["Refresh token","Access token","Cookie","JWT"], answer: "Refresh token" },
  { question: "Which Flutter secures storage?", options: ["flutter_secure_storage","hive","prefs","sqlite"], answer: "flutter_secure_storage" },
  { question: "Which RN prevents code tampering?", options: ["Code obfuscation","Redux","Axios","Metro"], answer: "Code obfuscation" },
  { question: "What is sandboxing?", options: ["App isolation","UI","Cache","Thread"], answer: "App isolation" },
  { question: "Which Android enables HTTPS only?", options: ["Network Security Config","Manifest","Gradle","Keystore"], answer: "Network Security Config" },
  { question: "Which iOS file enforces ATS?", options: ["Info.plist","AppDelegate","Scene","Storyboard"], answer: "Info.plist" },

  // 61–70 Testing
  { question: "What is unit testing?", options: ["Small components","UI test","Integration","Manual"], answer: "Small components" },
  { question: "Which Flutter test is UI?", options: ["Widget test","Unit test","Integration","Manual"], answer: "Widget test" },
  { question: "Which Android UI test?", options: ["Espresso","JUnit","Mockito","Robolectric"], answer: "Espresso" },
  { question: "Which RN testing lib?", options: ["Jest","Mocha","Chai","AVA"], answer: "Jest" },
  { question: "What is mocking?", options: ["Fake dependencies","Cache","Encrypt","Stub UI"], answer: "Fake dependencies" },
  { question: "Which Flutter lib mocks?", options: ["Mockito","Dio","Bloc","Riverpod"], answer: "Mockito" },
  { question: "What is integration testing?", options: ["Module interaction","Unit","UI only","Manual"], answer: "Module interaction" },
  { question: "Which Android test runs JVM?", options: ["Robolectric","Espresso","JUnit","UIAutomator"], answer: "Robolectric" },
  { question: "Which RN tool snapshots UI?", options: ["Snapshot testing","Flipper","Redux","Metro"], answer: "Snapshot testing" },
  { question: "Which Flutter test runs real app?", options: ["Integration test","Widget","Unit","Manual"], answer: "Integration test" },

  // 71–80 CI/CD & Deployment
  { question: "What is CI?", options: ["Auto build","Manual deploy","Testing only","Hosting"], answer: "Auto build" },
  { question: "Which tool automates pipelines?", options: ["GitHub Actions","Postman","Figma","Jira"], answer: "GitHub Actions" },
  { question: "Which Android format is required now?", options: ["AAB","APK","ZIP","JAR"], answer: "AAB" },
  { question: "Which iOS beta tool?", options: ["TestFlight","Firebase","Crashlytics","Xcode"], answer: "TestFlight" },
  { question: "Which Flutter flavor supports envs?", options: ["Flavors","Modes","Channels","Targets"], answer: "Flavors" },
  { question: "What is code signing?", options: ["App identity","Encryption","Cache","API"], answer: "App identity" },
  { question: "Which Android build is optimized?", options: ["Release","Debug","Profile","Test"], answer: "Release" },
  { question: "Which RN bundler?", options: ["Metro","Webpack","Vite","Rollup"], answer: "Metro" },
  { question: "What is blue-green deployment?", options: ["Zero downtime","Cache","Rollback","Scaling"], answer: "Zero downtime" },
  { question: "Which Flutter mode measures perf?", options: ["Profile","Debug","Release","Test"], answer: "Profile" },

  // 81–100 Advanced Concepts
  { question: "What is modularization?", options: ["Split features","Single file","Cache","Encrypt"], answer: "Split features" },
  { question: "Which Android supports dynamic features?", options: ["Dynamic Feature Modules","Fragments","Services","Intents"], answer: "Dynamic Feature Modules" },
  { question: "What is deep linking?", options: ["Direct screen access","Routing","API","Cache"], answer: "Direct screen access" },
  { question: "Which Flutter supports background work?", options: ["Workmanager","Isolate","Future","Stream"], answer: "Workmanager" },
  { question: "Which Android background API is restricted?", options: ["Background services","Foreground","WorkManager","Alarm"], answer: "Background services" },
  { question: "What is cold start?", options: ["Fresh launch","Resume","Pause","Destroy"], answer: "Fresh launch" },
  { question: "Which RN improves startup?", options: ["Hermes","JSC","Bridge","Redux"], answer: "Hermes" },
  { question: "What is tree shaking?", options: ["Remove unused code","Compress","Encrypt","Cache"], answer: "Remove unused code" },
  { question: "Which Flutter compiles native?", options: ["AOT","JIT","VM","Bridge"], answer: "AOT" },
  { question: "Which Android API schedules deferrable work?", options: ["WorkManager","Service","Thread","Handler"], answer: "WorkManager" },
  { question: "What is feature flag?", options: ["Toggle feature","API","DB","Cache"], answer: "Toggle feature" },
  { question: "Which RN supports OTA updates?", options: ["CodePush","Firebase","Redux","Metro"], answer: "CodePush" },
  { question: "What is app sandbox?", options: ["Isolated environment","UI","Cache","Thread"], answer: "Isolated environment" },
  { question: "Which Flutter widget preserves state?", options: ["AutomaticKeepAlive","Container","Key","Stack"], answer: "AutomaticKeepAlive" },
  { question: "What is background isolate?", options: ["Separate thread","UI thread","Cache","API"], answer: "Separate thread" },
  { question: "Which Android handles paging?", options: ["Paging 3","Room","Retrofit","Hilt"], answer: "Paging 3" },
  { question: "What is cold observable?", options: ["Starts on subscribe","Always running","Cached","Hot"], answer: "Starts on subscribe" },
  { question: "Which Flutter handles deep links?", options: ["uni_links","go_router","bloc","http"], answer: "uni_links" },
  { question: "What is hot observable?", options: ["Always emitting","On subscribe","Cached","Paused"], answer: "Always emitting" },
  { question: "Which concept reduces APK size?", options: ["App Bundles","Obfuscation","Caching","Threads"], answer: "App Bundles" }
];

export default function AppDevTest3() {
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
    navigate("/app-task", { replace: true });
  };

  /* ================= ON MOUNT ================= */
  useEffect(() => {
    // ❌ always clear old test
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
      const i = Math.floor(Math.random() * ADVANCED_QUESTIONS.length);
      if (!used.has(i)) {
        picked.push(ADVANCED_QUESTIONS[i]);
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
                      state: { type: "appdev" , level : "advanced" },
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
                    onClick={() => navigate("/app-task")}
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
