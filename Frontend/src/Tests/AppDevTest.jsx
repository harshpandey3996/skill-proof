import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "appdev_test_progress";
const TEST_TIME = 10 * 60;
const PASS_SCORE = 7;


export const ALL_QUESTIONS = [
  { question: "Which language is primarily used for Android development?", options: ["Java","Kotlin","Swift","Dart"], answer: "Kotlin" }, // B
  { question: "Which language is primarily used for iOS development?", options: ["Swift","Java","Kotlin","C#"], answer: "Swift" }, // A
  { question: "What is Flutter used for?", options: ["Web development only","Mobile app development","Database management","Server setup"], answer: "Mobile app development" }, // B
  { question: "Which widget is used for layout in Flutter?", options: ["Container","Row","Scaffold","All of these"], answer: "All of these" }, // D
  { question: "Which component is entry point in Android app?", options: ["Activity","Fragment","Service","Intent"], answer: "Activity" }, // A
  { question: "Which IDE is official for Android?", options: ["Android Studio","Xcode","VS Code","Eclipse"], answer: "Android Studio" }, // B
  { question: "Which file contains iOS app UI definitions?", options: ["Main.storyboard","AndroidManifest.xml","build.gradle","App.js"], answer: "Main.storyboard" }, // C
  { question: "What is React Native used for?", options: ["Web apps","Mobile apps","Database apps","Server apps"], answer: "Mobile apps" }, // B
  { question: "Which language does React Native use?", options: ["JavaScript","Swift","Kotlin","Dart"], answer: "JavaScript" }, // A
  { question: "Which layout is default in Android XML?", options: ["LinearLayout","RelativeLayout","ConstraintLayout","FrameLayout"], answer: "ConstraintLayout" }, // C
  { question: "What is Gradle in Android?", options: ["Build system","IDE","Database","Server"], answer: "Build system" }, // A
  { question: "Which command runs Flutter app?", options: ["flutter run","flutter build","flutter start","flutter install"], answer: "flutter run" }, // A
  { question: "Which is stateless widget in Flutter?", options: ["Container","Scaffold","Text","All of these"], answer: "All of these" }, // D
  { question: "Which package manager is used in React Native?", options: ["npm/yarn","pip","gem","composer"], answer: "npm/yarn" }, // A
  { question: "Which tool is used for iOS simulator?", options: ["Xcode Simulator","Android Studio","VS Code","Flutter"], answer: "Xcode Simulator" }, // A
  { question: "Which file defines Android app permissions?", options: ["AndroidManifest.xml","MainActivity.java","build.gradle","settings.xml"], answer: "AndroidManifest.xml" }, // A
  { question: "Which method is called when Activity starts?", options: ["onCreate","onStart","onResume","onPause"], answer: "onCreate" }, // A
  { question: "Which component handles background tasks in Android?", options: ["Service","Broadcast Receiver","Activity","Fragment"], answer: "Service" }, // A
  { question: "Which IDE is official for iOS?", options: ["Xcode","Android Studio","VS Code","IntelliJ"], answer: "Xcode" }, // A
  { question: "What is hot reload in Flutter?", options: ["Refresh UI instantly","Compile code only","Debugging tool","Database refresh"], answer: "Refresh UI instantly" }, // A
  { question: "Which layout in Flutter scrolls?", options: ["Column","Row","ListView","Stack"], answer: "ListView" }, // C
  { question: "Which widget handles gestures in Flutter?", options: ["GestureDetector","Container","Row","Column"], answer: "GestureDetector" }, // A
  { question: "Which lifecycle method is used to cleanup resources in Android?", options: ["onDestroy","onPause","onResume","onStop"], answer: "onDestroy" }, // A
  { question: "Which file contains iOS app bundle identifier?", options: ["Info.plist","Main.storyboard","AppDelegate.swift","Build.gradle"], answer: "Info.plist" }, // A
  { question: "Which library is used for navigation in React Native?", options: ["react-navigation","redux","axios","framer-motion"], answer: "react-navigation" }, // A
  { question: "Which method is used to run background task in iOS?", options: ["Background Fetch","onCreate","Service","Activity"], answer: "Background Fetch" }, // A
  { question: "Which component shows data in tabular form in Android?", options: ["RecyclerView","TextView","LinearLayout","FrameLayout"], answer: "RecyclerView" }, // A
  { question: "Which is used to style Flutter widgets?", options: ["ThemeData","CSS","XML","StyleSheet"], answer: "ThemeData" }, // A
  { question: "Which property is used for padding in Flutter?", options: ["Padding widget","Margin","Spacer","Container only"], answer: "Padding widget" }, // A
  { question: "Which file defines app icon in Android?", options: ["res/mipmap","drawable","assets","gradle"], answer: "res/mipmap" }, // A
  { question: "Which command builds APK in Flutter?", options: ["flutter build apk","flutter run","flutter start","flutter compile"], answer: "flutter build apk" }, // A
  { question: "Which method is used to pass data between Flutter widgets?", options: ["Constructor/Props","Intent","Broadcast","Service"], answer: "Constructor/Props" }, // A
  { question: "Which state management library is popular in Flutter?", options: ["Provider","Redux","Bloc","All of these"], answer: "All of these" }, // D
  { question: "Which component in React Native handles text input?", options: ["TextInput","Text","Input","TextField"], answer: "TextInput" }, // A
  { question: "Which widget displays an image in Flutter?", options: ["Image","Container","Box","Picture"], answer: "Image" }, // A
  { question: "Which lifecycle method is called when Flutter widget is initialized?", options: ["initState","build","dispose","didUpdateWidget"], answer: "initState" }, // A
  { question: "Which widget handles scrolling in Flutter?", options: ["SingleChildScrollView","Column","Row","Stack"], answer: "SingleChildScrollView" }, // A
  { question: "Which Android component listens to system events?", options: ["BroadcastReceiver","Service","Activity","Fragment"], answer: "BroadcastReceiver" }, // A
  { question: "Which widget in Flutter displays a list?", options: ["ListView","Column","Row","Stack"], answer: "ListView" }, // A
  { question: "Which tool is used to debug Android apps?", options: ["Android Studio debugger","Xcode","Flutter CLI","VS Code only"], answer: "Android Studio debugger" }, // A
  { question: "Which method saves data persistently in Android?", options: ["SharedPreferences","SQLite","File storage","All of these"], answer: "All of these" }, // D
  { question: "Which Flutter widget overlays multiple widgets?", options: ["Stack","Column","Row","Container"], answer: "Stack" }, // A
  { question: "Which package is used for HTTP requests in Flutter?", options: ["http","axios","fetch","Dio"], answer: "http" }, // A
  { question: "Which command runs iOS app in simulator?", options: ["flutter run","flutter build ios","flutter install","flutter start"], answer: "flutter run" }, // A
  { question: "Which IDE can be used for Flutter development?", options: ["Android Studio","VS Code","IntelliJ","All of these"], answer: "All of these" }, // D
  { question: "Which widget allows user to select date in Flutter?", options: ["DatePicker","TimePicker","Calendar","Form"], answer: "DatePicker" }, // A
  { question: "Which widget displays circular progress in Flutter?", options: ["CircularProgressIndicator","LinearProgressIndicator","ProgressBar","ActivityIndicator"], answer: "CircularProgressIndicator" }, // A
  { question: "Which method disposes resources in Flutter?", options: ["dispose","initState","build","didUpdateWidget"], answer: "dispose" }, // A
  { question: "Which Android layout is best for complex UI?", options: ["ConstraintLayout","LinearLayout","RelativeLayout","FrameLayout"], answer: "ConstraintLayout" }, // A
  { question: "Which method in Android handles button clicks?", options: ["onClickListener","onTap","onPress","onHover"], answer: "onClickListener" }, // A
  { question: "Which component allows multi-screen navigation in Flutter?", options: ["Navigator","Scaffold","Container","Stack"], answer: "Navigator" }, // A
  { question: "Which widget handles gestures in Flutter?", options: ["GestureDetector","InkWell","Both","Container"], answer: "Both" }, // C
  { question: "Which component in Flutter is used for theming?", options: ["Theme","MaterialApp","Scaffold","Container"], answer: "Theme" }, // A
  { question: "Which Android file contains strings?", options: ["res/values/strings.xml","res/layout/activity_main.xml","AndroidManifest.xml","build.gradle"], answer: "res/values/strings.xml" }, // A
  { question: "Which widget is used for navigation drawer in Flutter?", options: ["Drawer","Navigator","Scaffold","MaterialApp"], answer: "Drawer" }, // A
  { question: "Which Flutter widget shows an alert dialog?", options: ["AlertDialog","DialogBox","Popup","Modal"], answer: "AlertDialog" }, // A
  { question: "Which Android component runs in background?", options: ["Service","Activity","BroadcastReceiver","ContentProvider"], answer: "Service" }, // A
  { question: "Which method shows toast in Android?", options: ["Toast.makeText","Snackbar.make","Alert.show","Dialog.show"], answer: "Toast.makeText" }, // A
  { question: "Which Flutter widget is used to draw shapes?", options: ["CustomPaint","Canvas","Container","Stack"], answer: "CustomPaint" }, // A
  { question: "Which Flutter widget arranges children vertically?", options: ["Column","Row","Stack","Container"], answer: "Column" }, // A
  { question: "Which widget in Flutter arranges children horizontally?", options: ["Row","Column","Stack","Container"], answer: "Row" }, // A
  { question: "Which Android layout is used for stacking views?", options: ["FrameLayout","LinearLayout","ConstraintLayout","RelativeLayout"], answer: "FrameLayout" }, // A
  { question: "Which Flutter widget detects taps?", options: ["GestureDetector","InkWell","Both","Container"], answer: "Both" }, // C
  { question: "Which Flutter widget displays text?", options: ["Text","Label","String","Paragraph"], answer: "Text" }, // A
  { question: "Which Flutter widget displays an image from network?", options: ["Image.network","Image.asset","Image.file","NetworkImage"], answer: "Image.network" }, // A
  { question: "Which method updates state in Flutter StatefulWidget?", options: ["setState","updateState","refresh","build"], answer: "setState" }, // A
  { question: "Which widget handles scrollable lists efficiently?", options: ["ListView.builder","Column","Row","Stack"], answer: "ListView.builder" }, // A
  { question: "Which Flutter widget is used for bottom navigation?", options: ["BottomNavigationBar","TabBar","Drawer","Scaffold"], answer: "BottomNavigationBar" }, // A
  { question: "Which component in React Native shows lists?", options: ["FlatList","ScrollView","SectionList","All of these"], answer: "All of these" }, // D
  { question: "Which method in Flutter navigates to new screen?", options: ["Navigator.push","Navigator.pop","Navigator.go","Navigator.replace"], answer: "Navigator.push" }, // A
  { question: "Which Flutter widget creates forms?", options: ["Form","Container","Column","Row"], answer: "Form" }, // A
  { question: "Which Flutter widget validates form fields?", options: ["Form","TextFormField","Validator","Container"], answer: "TextFormField" }, // B
  { question: "Which Flutter widget is used for input fields?", options: ["TextField","InputBox","FormField","TextInput"], answer: "TextField" }, // A
  { question: "Which Flutter widget displays checkboxes?", options: ["Checkbox","Switch","Toggle","Button"], answer: "Checkbox" }, // A
  { question: "Which Flutter widget displays radio buttons?", options: ["Radio","Checkbox","Switch","Slider"], answer: "Radio" }, // A
  { question: "Which Flutter widget is used for slider input?", options: ["Slider","Switch","TextField","TextInput"], answer: "Slider" }, // A
  { question: "Which Flutter widget shows a linear progress indicator?", options: ["LinearProgressIndicator","CircularProgressIndicator","ProgressBar","ActivityIndicator"], answer: "LinearProgressIndicator" }, // A
];

export default function AppDevTest() {
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
      const i = Math.floor(Math.random() * ALL_QUESTIONS.length);
      if (!used.has(i)) {
        picked.push(ALL_QUESTIONS[i]);
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
                      state: { type: "appdev" , level : "beginner"},
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
