import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "datascience_test_progress";
const TEST_TIME = 10 * 60; // 10 minutes
const PASS_SCORE = 7;

export const ALL_QUESTIONS = [
  // ---------- A (20) ----------
  { question: "What is Data Science?", options: ["Study of data","Web design","App testing","Game dev"], answer: "Study of data" }, // A
  { question: "Which language is popular in Data Science?", options: ["Python","HTML","CSS","PHP"], answer: "Python" }, // A
  { question: "What is a dataset?", options: ["Collection of data","Single value","Website","Code"], answer: "Collection of data" }, // A
  { question: "NumPy is used for?", options: ["Numerical computing","UI design","Routing","Styling"], answer: "Numerical computing" }, // A
  { question: "What is Machine Learning?", options: ["Learning from data","Manual coding","UI work","Server task"], answer: "Learning from data" }, // A
  { question: "CSV stands for?", options: ["Comma Separated Values","Common Simple Value","Code Style Version","None"], answer: "Comma Separated Values" }, // A
  { question: "What does AI stand for?", options: ["Artificial Intelligence","Auto Internet","Advanced Input","None"], answer: "Artificial Intelligence" }, // A
  { question: "Which plot shows comparison?", options: ["Bar chart","Pie","Line","Scatter"], answer: "Bar chart" }, // A
  { question: "Which data type is numeric?", options: ["Numerical","Text","Image","Audio"], answer: "Numerical" }, // A
  { question: "Which file stores table data?", options: ["CSV","PNG","MP4","HTML"], answer: "CSV" }, // A
  { question: "What is Big Data?", options: ["Very large data","Small data","Image file","Code"], answer: "Very large data" }, // A
  { question: "Which tool is used for DS coding?", options: ["Jupyter Notebook","Photoshop","Figma","Paint"], answer: "Jupyter Notebook" }, // A
  { question: "Which library is for arrays?", options: ["NumPy","Pandas","Seaborn","TensorFlow"], answer: "NumPy" }, // A
  { question: "Which ML predicts numbers?", options: ["Regression","Classification","Clustering","Sorting"], answer: "Regression" }, // A
  { question: "What is data cleaning?", options: ["Removing errors","Adding noise","Styling UI","Deploying"], answer: "Removing errors" }, // A
  { question: "Which graph shows trend?", options: ["Line chart","Pie","Bar","Table"], answer: "Line chart" }, // A
  { question: "Which Python lib for plots?", options: ["Matplotlib","Redux","Axios","Mongo"], answer: "Matplotlib" }, // A
  { question: "What is model training?", options: ["Learning from data","Testing UI","CSS work","Deploy"], answer: "Learning from data" }, // A
  { question: "Which split is common?", options: ["Train/Test","HTML/CSS","Dev/Prod","UI/API"], answer: "Train/Test" }, // A
  { question: "Which job works with data?", options: ["Data Scientist","Designer","HR","Tester"], answer: "Data Scientist" }, // A

  // ---------- B (25) ----------
  { question: "Which library is for data analysis?", options: ["NumPy","Pandas","React","Vue"], answer: "Pandas" }, // B
  { question: "Which chart shows percentage?", options: ["Line","Pie chart","Bar","Scatter"], answer: "Pie chart" }, // B
  { question: "Which ML type uses labels?", options: ["Unsupervised","Supervised","Reinforcement","None"], answer: "Supervised" }, // B
  { question: "Which library for ML?", options: ["Bootstrap","Scikit-learn","Redux","jQuery"], answer: "Scikit-learn" }, // B
  { question: "Which function loads CSV?", options: ["load()","read_csv()","open()","get()"], answer: "read_csv()" }, // B
  { question: "Which method shows top rows?", options: ["top()","head()","show()","rows()"], answer: "head()" }, // B
  { question: "Which plot shows distribution?", options: ["Line","Histogram","Bar","Pie"], answer: "Histogram" }, // B
  { question: "Which metric for regression?", options: ["Accuracy","MSE","Recall","Precision"], answer: "MSE" }, // B
  { question: "Which Python lib for stats plots?", options: ["Matplotlib","Seaborn","Flask","Django"], answer: "Seaborn" }, // B
  { question: "Which value means missing?", options: ["0","NaN","False","Null"], answer: "NaN" }, // B
  { question: "Which tool visualizes data?", options: ["Excel","Tableau","Paint","Notepad"], answer: "Tableau" }, // B
  { question: "Which ML task predicts category?", options: ["Regression","Classification","Clustering","Sorting"], answer: "Classification" }, // B
  { question: "Which pandas function info?", options: ["about()","info()","check()","desc()"], answer: "info()" }, // B
  { question: "Which data has labels?", options: ["Raw","Labeled","Noise","Text"], answer: "Labeled" }, // B
  { question: "Which plot shows relation?", options: ["Bar","Scatter","Pie","Table"], answer: "Scatter" }, // B
  { question: "Which library for DL?", options: ["Axios","TensorFlow","Redux","Express"], answer: "TensorFlow" }, // B
  { question: "Which step prepares data?", options: ["Modeling","Preprocessing","Deploy","Testing"], answer: "Preprocessing" }, // B
  { question: "Which chart compares groups?", options: ["Line","Bar","Scatter","Area"], answer: "Bar" }, // B
  { question: "Which file saves model?", options: ["PNG","Pickle","CSV","HTML"], answer: "Pickle" }, // B
  { question: "Which method splits data?", options: ["divide()","train_test_split()","split()","cut()"], answer: "train_test_split()" }, // B
  { question: "Which lib handles dataframe?", options: ["NumPy","Pandas","Tensor","Torch"], answer: "Pandas" }, // B
  { question: "Which metric for classification?", options: ["MSE","Accuracy","Loss","RMSE"], answer: "Accuracy" }, // B
  { question: "Which DS IDE popular?", options: ["Word","Jupyter","Paint","Chrome"], answer: "Jupyter" }, // B
  { question: "Which chart is circular?", options: ["Line","Pie","Bar","Scatter"], answer: "Pie" }, // B
  { question: "Which tool for Python DS?", options: ["VS Code","Jupyter","Notepad","Paint"], answer: "Jupyter" }, // B

  // ---------- C (25) ----------
  { question: "Which ML is unsupervised?", options: ["Regression","Classification","Clustering","Prediction"], answer: "Clustering" }, // C
  { question: "Which graph shows relation?", options: ["Bar","Line","Scatter","Pie"], answer: "Scatter" }, // C
  { question: "Which library visualizes stats?", options: ["NumPy","Pandas","Seaborn","Redux"], answer: "Seaborn" }, // C
  { question: "Which chart shows growth?", options: ["Bar","Pie","Line","Table"], answer: "Line" }, // C
  { question: "Which DS task groups data?", options: ["Regression","Classification","Clustering","Sorting"], answer: "Clustering" }, // C
  { question: "Which ML term is over learning?", options: ["Underfit","Balanced","Overfitting","Perfect"], answer: "Overfitting" }, // C
  { question: "Which method scales data?", options: ["Split","Encode","Normalize","Sort"], answer: "Normalize" }, // C
  { question: "Which data is text?", options: ["Numeric","Image","Categorical","Audio"], answer: "Categorical" }, // C
  { question: "Which tool shows dashboard?", options: ["Excel","PowerPoint","Tableau","Word"], answer: "Tableau" }, // C
  { question: "Which model predicts yes/no?", options: ["Regression","Clustering","Classification","Sorting"], answer: "Classification" }, // C
  { question: "Which value type is category?", options: ["Float","Int","Categorical","Boolean"], answer: "Categorical" }, // C
  { question: "Which DS step comes first?", options: ["Model","Deploy","Data collection","Testing"], answer: "Data collection" }, // C
  { question: "Which plot shows frequency?", options: ["Line","Bar","Histogram","Pie"], answer: "Histogram" }, // C
  { question: "Which lib for visualization?", options: ["NumPy","Pandas","Matplotlib","Flask"], answer: "Matplotlib" }, // C
  { question: "Which ML is prediction?", options: ["Sort","Search","Regression","UI"], answer: "Regression" }, // C
  { question: "Which DS tool cleans data?", options: ["Photoshop","Excel","Pandas","Chrome"], answer: "Pandas" }, // C
  { question: "Which file stores numbers?", options: ["PNG","MP3","CSV","EXE"], answer: "CSV" }, // C
  { question: "Which chart shows relationship?", options: ["Bar","Pie","Scatter","Line"], answer: "Scatter" }, // C
  { question: "Which DS skill important?", options: ["Design","Statistics","Animation","Gaming"], answer: "Statistics" }, // C
  { question: "Which model fits too much?", options: ["Underfit","Balanced","Overfit","Perfect"], answer: "Overfit" }, // C
  { question: "Which ML uses reward?", options: ["Supervised","Unsupervised","Reinforcement","None"], answer: "Reinforcement" }, // C
  { question: "Which data is image?", options: ["Numeric","Text","Image","Audio"], answer: "Image" }, // C
  { question: "Which tool deploys model?", options: ["Figma","Flask","Paint","Excel"], answer: "Flask" }, // C
  { question: "Which library handles ML?", options: ["Redux","Axios","Scikit-learn","jQuery"], answer: "Scikit-learn" }, // C
  { question: "Which DS phase tests model?", options: ["Collect","Prepare","Evaluate","Design"], answer: "Evaluate" }, // C

  // ---------- D (30) ----------
  { question: "Which is NOT DS tool?", options: ["Python","Pandas","Tableau","Photoshop"], answer: "Photoshop" }, // D
  { question: "Which is NOT ML?", options: ["Regression","Clustering","Classification","HTML"], answer: "HTML" }, // D
  { question: "Which is NOT chart?", options: ["Bar","Line","Pie","Router"], answer: "Router" }, // D
  { question: "Which is NOT Python lib?", options: ["NumPy","Pandas","TensorFlow","React"], answer: "React" }, // D
  { question: "Which is NOT data?", options: ["Text","Number","Image","Button"], answer: "Button" }, // D
  { question: "Which is NOT DS role?", options: ["Scientist","Analyst","Engineer","Painter"], answer: "Painter" }, // D
  { question: "Which is NOT ML metric?", options: ["Accuracy","Recall","Precision","Margin"], answer: "Margin" }, // D
  { question: "Which is NOT file format?", options: ["CSV","JSON","XML","MP3"], answer: "MP3" }, // D
  { question: "Which is NOT visualization tool?", options: ["Tableau","PowerBI","Matplotlib","Notepad"], answer: "Notepad" }, // D
  { question: "Which is NOT pandas function?", options: ["head()","info()","read_csv()","render()"], answer: "render()" }, // D
  { question: "Which is NOT ML type?", options: ["Supervised","Unsupervised","Reinforcement","Responsive"], answer: "Responsive" }, // D
  { question: "Which is NOT numeric?", options: ["10","3.5","-7","Hello"], answer: "Hello" }, // D
  { question: "Which is NOT DS step?", options: ["Collect","Clean","Deploy","Animate"], answer: "Animate" }, // D
  { question: "Which is NOT Python IDE?", options: ["Jupyter","VS Code","PyCharm","Photoshop"], answer: "Photoshop" }, // D
  { question: "Which is NOT plot?", options: ["Scatter","Histogram","Pie","Navbar"], answer: "Navbar" }, // D
  { question: "Which is NOT model?", options: ["Regression","Decision Tree","CNN","HTML"], answer: "HTML" }, // D
  { question: "Which is NOT algorithm?", options: ["KNN","SVM","Random Forest","CSS"], answer: "CSS" }, // D
  { question: "Which is NOT DS library?", options: ["NumPy","Pandas","Matplotlib","Bootstrap"], answer: "Bootstrap" }, // D
  { question: "Which is NOT AI?", options: ["ML","DL","NLP","HTTP"], answer: "HTTP" }, // D
  { question: "Which is NOT ML output?", options: ["Prediction","Probability","Accuracy","Navbar"], answer: "Navbar" }, // D
  { question: "Which is NOT data type?", options: ["Numeric","Text","Image","Function"], answer: "Function" }, // D
  { question: "Which is NOT visualization?", options: ["Chart","Graph","Dashboard","Console.log"], answer: "Console.log" }, // D
  { question: "Which is NOT DS skill?", options: ["Python","Stats","ML","Animation"], answer: "Animation" }, // D
  { question: "Which is NOT preprocessing?", options: ["Scaling","Encoding","Cleaning","Deploy"], answer: "Deploy" }, // D
  { question: "Which is NOT ML task?", options: ["Regression","Classification","Clustering","Styling"], answer: "Styling" }, // D
  { question: "Which is NOT data source?", options: ["CSV","API","Database","Navbar"], answer: "Navbar" }, // D
  { question: "Which is NOT Python?", options: ["Python","Java","C++","HTML"], answer: "HTML" }, // D
  { question: "Which is NOT DS output?", options: ["Model","Insight","Report","Navbar"], answer: "Navbar" }, // D
  { question: "Which is NOT graph?", options: ["Bar","Line","Pie","Footer"], answer: "Footer" }, // D
  { question: "Which is NOT ML library?", options: ["Scikit-learn","TensorFlow","Keras","jQuery"], answer: "jQuery" }, // D
];

export default function DataScienceTest() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TEST_TIME);
  const [user, setUser] = useState({ name: "User" });

  /* ======================= EXIT TEST ======================== */
  const exitTest = () => {
    localStorage.removeItem(STORAGE_KEY);
    navigate("/datascience-task", { replace: true });
  };

  /* ======================= LOAD TEST ======================== */
  useEffect(() => {
    // ❌ always clear old progress
    localStorage.removeItem(STORAGE_KEY);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

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
                    navigate("/certificate", {
                      state: { type: "datascience" , level : "beginner"},
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
                    onClick={() => navigate("/datascience-task")}
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
