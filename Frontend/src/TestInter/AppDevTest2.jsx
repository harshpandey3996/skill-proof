import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "appdev_test_progress";
const TEST_TIME = 10 * 60;
const PASS_SCORE = 7;


export const INTERMEDIATE_QUESTIONS = [
  // 1–10 Core Concepts
  { question: "What is cross-platform development?", options: ["Single OS","Multiple OS with one codebase","Only Android","Only iOS"], answer: "Multiple OS with one codebase" },
  { question: "Which language is used by Flutter?", options: ["Java","Kotlin","Dart","Swift"], answer: "Dart" },
  { question: "React Native bridge is used for?", options: ["UI design","JS ↔ Native communication","Routing","Styling"], answer: "JS ↔ Native communication" },
  { question: "What is widget tree in Flutter?", options: ["Database","UI hierarchy","API tree","State tree"], answer: "UI hierarchy" },
  { question: "Which Android component provides UI?", options: ["Activity","Service","BroadcastReceiver","ContentProvider"], answer: "Activity" },
  { question: "Which file manages Android dependencies?", options: ["AndroidManifest.xml","build.gradle","settings.gradle","MainActivity"], answer: "build.gradle" },
  { question: "Which iOS file handles app lifecycle?", options: ["AppDelegate","Info.plist","Scene.storyboard","Main.storyboard"], answer: "AppDelegate" },
  { question: "What is hot restart?", options: ["Reset state","Keep state","Rebuild UI","Close app"], answer: "Reset state" },
  { question: "Which Flutter widget is immutable?", options: ["StatefulWidget","StatelessWidget","InheritedWidget","Container"], answer: "StatelessWidget" },
  { question: "Which React Native component renders UI?", options: ["View","Div","Span","Container"], answer: "View" },

  // 11–20 State & Lifecycle
  { question: "What manages state in Flutter?", options: ["setState","Provider","Bloc","All"], answer: "All" },
  { question: "Which lifecycle runs once in Flutter?", options: ["build","initState","dispose","setState"], answer: "initState" },
  { question: "Which Android lifecycle is visible state?", options: ["onCreate","onStart","onResume","onPause"], answer: "onResume" },
  { question: "Which lifecycle runs when app goes background?", options: ["onStop","onCreate","onResume","onRestart"], answer: "onStop" },
  { question: "What is props in React Native?", options: ["Mutable data","Read-only data","State","API"], answer: "Read-only data" },
  { question: "Which hook manages side effects in RN?", options: ["useState","useEffect","useRef","useMemo"], answer: "useEffect" },
  { question: "What is state lifting?", options: ["Move state up","Delete state","Duplicate state","Freeze state"], answer: "Move state up" },
  { question: "Which Flutter widget rebuilds UI?", options: ["setState","build","initState","dispose"], answer: "setState" },
  { question: "What is InheritedWidget?", options: ["Global data sharing","Routing","Styling","Animation"], answer: "Global data sharing" },
  { question: "Which Android component survives rotation?", options: ["ViewModel","Activity","Fragment","Intent"], answer: "ViewModel" },

  // 21–30 Navigation
  { question: "Which Flutter class handles routes?", options: ["Navigator","Router","Scaffold","MaterialApp"], answer: "Navigator" },
  { question: "Which method pops screen?", options: ["Navigator.pop","Navigator.push","Navigator.replace","Navigator.go"], answer: "Navigator.pop" },
  { question: "What is named routing?", options: ["String-based routes","Dynamic routing","API routing","Native routing"], answer: "String-based routes" },
  { question: "Which RN library handles navigation?", options: ["react-navigation","redux","axios","formik"], answer: "react-navigation" },
  { question: "Which Android component passes data?", options: ["Intent","Bundle","Both","None"], answer: "Both" },
  { question: "Which iOS controller manages screens?", options: ["UIViewController","AppDelegate","SceneDelegate","Storyboard"], answer: "UIViewController" },
  { question: "Which Flutter widget holds routes?", options: ["MaterialApp","Scaffold","Navigator","Theme"], answer: "MaterialApp" },
  { question: "Which navigation is stack-based?", options: ["Navigator","Drawer","BottomNav","TabBar"], answer: "Navigator" },
  { question: "Which RN component handles tabs?", options: ["TabNavigator","BottomTabs","Drawer","All"], answer: "All" },
  { question: "Which Android navigation is modern?", options: ["NavController","Intent","FragmentManager","Service"], answer: "NavController" },

  // 31–40 Networking
  { question: "Which Flutter package handles HTTP?", options: ["http","dio","Both","None"], answer: "Both" },
  { question: "Which method fetches API data?", options: ["GET","POST","PUT","DELETE"], answer: "GET" },
  { question: "Which format APIs use?", options: ["XML","JSON","YAML","Binary"], answer: "JSON" },
  { question: "What is REST API?", options: ["Architecture","Framework","Database","Protocol"], answer: "Architecture" },
  { question: "Which status means success?", options: ["200","404","500","301"], answer: "200" },
  { question: "Which RN library fetches APIs?", options: ["fetch","axios","Both","None"], answer: "Both" },
  { question: "What is async/await?", options: ["Promise handling","Thread","Loop","State"], answer: "Promise handling" },
  { question: "Which Flutter widget shows loader?", options: ["CircularProgressIndicator","Spinner","Loader","Progress"], answer: "CircularProgressIndicator" },
  { question: "What is pagination?", options: ["Load chunks","Load all","Cache","Filter"], answer: "Load chunks" },
  { question: "Which API call updates data?", options: ["PUT","GET","HEAD","OPTIONS"], answer: "PUT" },

  // 41–50 Storage
  { question: "Which Flutter storage is key-value?", options: ["SharedPreferences","SQLite","Hive","Firebase"], answer: "SharedPreferences" },
  { question: "Which Android DB is lightweight?", options: ["SQLite","MySQL","Postgres","Oracle"], answer: "SQLite" },
  { question: "Which iOS storage is key-value?", options: ["UserDefaults","CoreData","Realm","SQLite"], answer: "UserDefaults" },
  { question: "What is cache?", options: ["Temporary storage","Permanent storage","Cloud","API"], answer: "Temporary storage" },
  { question: "Which RN storage is async?", options: ["AsyncStorage","LocalStorage","Session","DB"], answer: "AsyncStorage" },
  { question: "Which Flutter DB is NoSQL?", options: ["Hive","SQLite","Room","CoreData"], answer: "Hive" },
  { question: "Which Android lib replaces SQLite?", options: ["Room","Realm","Firebase","CoreData"], answer: "Room" },
  { question: "Which storage survives app restart?", options: ["Persistent","Memory","Cache","Temp"], answer: "Persistent" },
  { question: "Which Flutter DB supports encryption?", options: ["Hive","SharedPrefs","Memory","State"], answer: "Hive" },
  { question: "Which storage is fastest?", options: ["Memory","Disk","Cloud","API"], answer: "Memory" },

  // 51–60 UI & Layout
  { question: "Which Flutter widget aligns children?", options: ["Align","Center","Both","None"], answer: "Both" },
  { question: "Which RN style system is used?", options: ["Flexbox","Grid","CSS","Table"], answer: "Flexbox" },
  { question: "Which Flutter widget creates spacing?", options: ["SizedBox","Spacer","Both","None"], answer: "Both" },
  { question: "Which Android layout is flexible?", options: ["ConstraintLayout","LinearLayout","FrameLayout","TableLayout"], answer: "ConstraintLayout" },
  { question: "Which widget animates size?", options: ["AnimatedContainer","Container","Box","Stack"], answer: "AnimatedContainer" },
  { question: "Which RN component shows image?", options: ["Image","Img","Picture","Icon"], answer: "Image" },
  { question: "Which Flutter widget clips UI?", options: ["ClipRRect","Container","Stack","Align"], answer: "ClipRRect" },
  { question: "Which Android unit is responsive?", options: ["dp","px","mm","cm"], answer: "dp" },
  { question: "Which Flutter widget layers UI?", options: ["Stack","Column","Row","Wrap"], answer: "Stack" },
  { question: "Which RN component handles scroll?", options: ["ScrollView","View","Text","SafeArea"], answer: "ScrollView" },

  // 61–70 Performance & Debug
  { question: "What is jank?", options: ["UI lag","Crash","Freeze","ANR"], answer: "UI lag" },
  { question: "Which Flutter tool profiles app?", options: ["DevTools","Inspector","Analyzer","Logger"], answer: "DevTools" },
  { question: "Which Android error means freeze?", options: ["ANR","404","500","OOM"], answer: "ANR" },
  { question: "Which RN tool debugs UI?", options: ["Flipper","Redux","Metro","Babel"], answer: "Flipper" },
  { question: "What is lazy loading?", options: ["Load on demand","Load all","Cache","Compress"], answer: "Load on demand" },
  { question: "Which Flutter widget avoids rebuild?", options: ["const","key","ref","memo"], answer: "const" },
  { question: "Which Android profiler tracks memory?", options: ["Memory Profiler","CPU","GPU","Logcat"], answer: "Memory Profiler" },
  { question: "What causes memory leak?", options: ["Unreleased refs","CSS","API","Routing"], answer: "Unreleased refs" },
  { question: "Which RN improves performance?", options: ["FlatList","ScrollView","View","Text"], answer: "FlatList" },
  { question: "Which Flutter widget caches image?", options: ["CachedNetworkImage","Image","Container","Stack"], answer: "CachedNetworkImage" },

  // 71–80 Security
  { question: "What is authentication?", options: ["Verify user","Authorize access","Encrypt","Store"], answer: "Verify user" },
  { question: "What is authorization?", options: ["Access control","Login","Encrypt","Cache"], answer: "Access control" },
  { question: "Which token is stateless?", options: ["JWT","Session","Cookie","Cache"], answer: "JWT" },
  { question: "Which Android file sets permissions?", options: ["AndroidManifest.xml","build.gradle","MainActivity","res"], answer: "AndroidManifest.xml" },
  { question: "Which Flutter plugin secures storage?", options: ["flutter_secure_storage","shared_prefs","hive","sqflite"], answer: "flutter_secure_storage" },
  { question: "Which attack injects scripts?", options: ["XSS","CSRF","SQLi","MITM"], answer: "XSS" },
  { question: "Which protocol is secure?", options: ["HTTPS","HTTP","FTP","TCP"], answer: "HTTPS" },
  { question: "Which RN lib handles auth?", options: ["Firebase Auth","Axios","Redux","Formik"], answer: "Firebase Auth" },
  { question: "What is biometric auth?", options: ["Fingerprint/Face","OTP","Password","Token"], answer: "Fingerprint/Face" },
  { question: "Which Android API encrypts data?", options: ["Keystore","SQLite","Room","Prefs"], answer: "Keystore" },

  // 81–100 Deployment & Tools
  { question: "Which file builds Flutter app?", options: ["pubspec.yaml","main.dart","index.js","gradle"], answer: "pubspec.yaml" },
  { question: "Which command builds release APK?", options: ["flutter build apk","flutter run","flutter clean","flutter test"], answer: "flutter build apk" },
  { question: "Which store publishes Android apps?", options: ["Play Store","App Store","Firebase","GitHub"], answer: "Play Store" },
  { question: "Which store publishes iOS apps?", options: ["App Store","Play Store","TestFlight","Firebase"], answer: "App Store" },
  { question: "Which RN tool bundles JS?", options: ["Metro","Webpack","Vite","Parcel"], answer: "Metro" },
  { question: "What is TestFlight?", options: ["iOS testing","Android testing","Flutter tool","CI"], answer: "iOS testing" },
  { question: "Which Android build type is public?", options: ["Release","Debug","Profile","Test"], answer: "Release" },
  { question: "Which Flutter mode is fastest?", options: ["Release","Debug","Profile","Test"], answer: "Release" },
  { question: "Which CI tool automates build?", options: ["GitHub Actions","Figma","Postman","VS Code"], answer: "GitHub Actions" },
  { question: "Which format Android uses?", options: ["APK/AAB","IPA","EXE","DMG"], answer: "APK/AAB" }
];

export default function AppDevTest2() {
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
      const i = Math.floor(Math.random() * INTERMEDIATE_QUESTIONS.length);
      if (!used.has(i)) {
        picked.push(INTERMEDIATE_QUESTIONS[i]);
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
                      state: { type: "appdev"  , level : "intermediate"},
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
