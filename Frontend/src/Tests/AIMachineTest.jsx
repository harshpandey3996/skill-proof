// ❗ imports SAME
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "ai_ml_test_progress";
const TEST_TIME = 10 * 60;
const PASS_SCORE = 7;

export const ALL_AI_ML_QUESTIONS = [
/* ================= A correct (1–25) ================= */
{question:"What is Artificial Intelligence?",options:["Making machines intelligent","Web design","Database","Networking"],answer:"Making machines intelligent"},
{question:"What is Machine Learning?",options:["Learning from data","Manual coding","Styling","Hosting"],answer:"Learning from data"},
{question:"Which language is most popular for ML?",options:["Python","HTML","CSS","PHP"],answer:"Python"},
{question:"What is data?",options:["Information","Design","Animation","UI"],answer:"Information"},
{question:"What is an ML model?",options:["Math representation","Website","CSS","API"],answer:"Math representation"},
{question:"What is training?",options:["Feeding data","Teaching humans","Designing UI","Routing"],answer:"Feeding data"},
{question:"What is testing data?",options:["New data","Training data","UI data","CSS"],answer:"New data"},
{question:"What is supervised learning?",options:["With labels","Without data","Random","Manual"],answer:"With labels"},
{question:"What is unsupervised learning?",options:["Without labels","With teacher","With output","Hard coding"],answer:"Without labels"},
{question:"Which is ML algorithm?",options:["Linear Regression","React","HTML","CSS"],answer:"Linear Regression"},
{question:"What is regression used for?",options:["Numbers","Categories","Images","Text"],answer:"Numbers"},
{question:"What is classification used for?",options:["Categories","Numbers","Styling","Routing"],answer:"Categories"},
{question:"What is clustering?",options:["Grouping data","Routing","Styling","Design"],answer:"Grouping data"},
{question:"What is Deep Learning?",options:["Neural networks","If else","HTML","CSS"],answer:"Neural networks"},
{question:"Neural networks inspired from?",options:["Human brain","CPU","Internet","OS"],answer:"Human brain"},
{question:"What is accuracy?",options:["Correct prediction %","Speed","Design","Time"],answer:"Correct prediction %"},
{question:"What is overfitting?",options:["Memorizes training data","Good model","Fast training","Low data"],answer:"Memorizes training data"},
{question:"What is underfitting?",options:["Too simple model","Perfect model","High accuracy","Over trained"],answer:"Too simple model"},
{question:"Which library is used for ML?",options:["TensorFlow","React","Bootstrap","Tailwind"],answer:"TensorFlow"},
{question:"Which library is used for data analysis?",options:["Pandas","HTML","CSS","React"],answer:"Pandas"},
{question:"What is NumPy used for?",options:["Math operations","UI","Routing","API"],answer:"Math operations"},
{question:"What is dataset?",options:["Collection of data","Website","Design","Function"],answer:"Collection of data"},
{question:"What is feature?",options:["Input variable","Output","CSS","JS"],answer:"Input variable"},
{question:"What is label?",options:["Output","Input","Design","UI"],answer:"Output"},
{question:"What is prediction?",options:["Future output","Past data","Design","UI"],answer:"Future output"},

/* ================= B correct (26–50) ================= */
{question:"Which ML type uses reward?",options:["Supervised","Reinforcement","Unsupervised","Regression"],answer:"Reinforcement"},
{question:"What is reinforcement learning?",options:["Label learning","Reward based learning","Random","Manual"],answer:"Reward based learning"},
{question:"Which is AI application?",options:["HTML page","Face recognition","CSS animation","Form"],answer:"Face recognition"},
{question:"AI is used in?",options:["Only websites","Self driving cars","Only games","Only servers"],answer:"Self driving cars"},
{question:"Chatbots are example of?",options:["CSS","AI","HTML","DB"],answer:"AI"},
{question:"Spam detection uses?",options:["Regression","Classification","Clustering","Design"],answer:"Classification"},
{question:"Price prediction uses?",options:["Classification","Regression","UI","CSS"],answer:"Regression"},
{question:"Google Maps traffic uses?",options:["HTML","AI","CSS","PHP"],answer:"AI"},
{question:"Face unlock uses?",options:["CSS","AI","JS","HTML"],answer:"AI"},
{question:"Which is NOT ML?",options:["Linear Regression","Hard coded logic","Clustering","Classification"],answer:"Hard coded logic"},
{question:"What is bias?",options:["Design","Error from assumption","Speed","UI"],answer:"Error from assumption"},
{question:"What is variance?",options:["CSS","Model sensitivity","HTML","JS"],answer:"Model sensitivity"},
{question:"Which metric for classification?",options:["MSE","Accuracy","MAE","Loss"],answer:"Accuracy"},
{question:"Which metric for regression?",options:["Accuracy","MSE","Precision","Recall"],answer:"MSE"},
{question:"What is confusion matrix?",options:["Dataset","Performance table","Model","Graph"],answer:"Performance table"},
{question:"Precision means?",options:["Speed","Correct positive / predicted positive","UI","Design"],answer:"Correct positive / predicted positive"},
{question:"Recall means?",options:["Speed","Correct positive / actual positive","CSS","HTML"],answer:"Correct positive / actual positive"},
{question:"Which tool for visualization?",options:["React","Matplotlib","HTML","Node"],answer:"Matplotlib"},
{question:"Which file format for dataset?",options:["HTML","CSV","CSS","JS"],answer:"CSV"},
{question:"What is normalization?",options:["Deleting data","Scaling data","Design","UI"],answer:"Scaling data"},
{question:"What is feature scaling?",options:["Delete rows","Normalize values","Sort","Design"],answer:"Normalize values"},
{question:"Which is cloud AI service?",options:["Bootstrap","AWS","Tailwind","CSS"],answer:"AWS"},
{question:"Which company created TensorFlow?",options:["Facebook","Google","Amazon","Microsoft"],answer:"Google"},
{question:"Which company created PyTorch?",options:["Google","Facebook","Amazon","Apple"],answer:"Facebook"},
{question:"What is epoch?",options:["One feature","One full training cycle","One model","One output"],answer:"One full training cycle"},

/* ================= C correct (51–75) ================= */
{question:"What is batch size?",options:["Model size","UI size","Data per iteration","CSS"],answer:"Data per iteration"},
{question:"What is loss function?",options:["UI","CSS","Error measurement","HTML"],answer:"Error measurement"},
{question:"Gradient descent is used for?",options:["Design","Routing","Optimization","API"],answer:"Optimization"},
{question:"Which AI field deals with images?",options:["NLP","DB","Computer Vision","UI"],answer:"Computer Vision"},
{question:"Which AI field deals with text?",options:["CV","UI","NLP","CSS"],answer:"NLP"},
{question:"Speech recognition uses?",options:["HTML","CSS","AI","JS"],answer:"AI"},
{question:"Recommendation system uses?",options:["CSS","HTML","ML","JS"],answer:"ML"},
{question:"Netflix recommendation is?",options:["HTML","CSS","ML","DB"],answer:"ML"},
{question:"Which is ML framework?",options:["React","Angular","Scikit-learn","Vue"],answer:"Scikit-learn"},
{question:"Which is NOT AI?",options:["Chatbot","Self driving car","Calculator","Voice assistant"],answer:"Calculator"},
{question:"AI goal is?",options:["Design","Hosting","Mimic human intelligence","Routing"],answer:"Mimic human intelligence"},
{question:"Which is semantic data?",options:["CSS","HTML","Labeled data","JS"],answer:"Labeled data"},
{question:"What is real-life ML example?",options:["Static page","CSS file","Email spam filter","HTML tag"],answer:"Email spam filter"},
{question:"Which is ML type?",options:["Structured","Styled","Supervised","Sorted"],answer:"Supervised"},
{question:"What is model deployment?",options:["Training","Testing","Using model in real app","Design"],answer:"Using model in real app"},
{question:"AI needs?",options:["Only CSS","Only HTML","Data + Algorithm","Only JS"],answer:"Data + Algorithm"},
{question:"Which is AI assistant?",options:["HTML","CSS","Alexa","Bootstrap"],answer:"Alexa"},
{question:"What is automation?",options:["Manual work","Design","Work without human","UI"],answer:"Work without human"},
{question:"AI future depends on?",options:["CSS","HTML","Data","JS"],answer:"Data"},
{question:"Which domain uses AI most?",options:["Only web","Only games","Healthcare","Only design"],answer:"Healthcare"},
{question:"Which AI type learns by experience?",options:["Supervised","Unsupervised","Reinforcement","Static"],answer:"Reinforcement"},
{question:"Which ML model predicts probability?",options:["Tree","SVM","Logistic Regression","KNN"],answer:"Logistic Regression"},
{question:"What is NLP full form?",options:["Neural Learning Process","Network Logic Program","Natural Language Processing","Node Language Pack"],answer:"Natural Language Processing"},
{question:"Which data is text based?",options:["Image","Audio","Text","Video"],answer:"Text"},
{question:"Which algorithm groups data?",options:["Regression","Classification","Clustering","Sorting"],answer:"Clustering"},

/* ================= D correct (76–100) ================= */
{question:"Which AI system understands voice?",options:["HTML","CSS","JS","Speech Recognition"],answer:"Speech Recognition"},
{question:"Which algorithm uses neighbors?",options:["Tree","Regression","Clustering","KNN"],answer:"KNN"},
{question:"Which ML model is linear?",options:["Tree","CNN","SVM","Linear Regression"],answer:"Linear Regression"},
{question:"Which AI branch deals with robots?",options:["NLP","CV","ML","Robotics"],answer:"Robotics"},
{question:"Which algorithm is tree based?",options:["SVM","KNN","Naive Bayes","Decision Tree"],answer:"Decision Tree"},
{question:"Which loss for regression?",options:["Accuracy","Precision","Recall","MSE"],answer:"MSE"},
{question:"Which metric for imbalance data?",options:["Accuracy","Loss","MSE","F1-score"],answer:"F1-score"},
{question:"Which AI can generate images?",options:["HTML","CSS","JS","Generative AI"],answer:"Generative AI"},
{question:"Which model used in NLP?",options:["CNN","KNN","Tree","RNN"],answer:"RNN"},
{question:"Which algorithm based on probability?",options:["KNN","SVM","Tree","Naive Bayes"],answer:"Naive Bayes"},
{question:"Which ML uses layers?",options:["Regression","Tree","KNN","Neural Network"],answer:"Neural Network"},
{question:"Which AI used in healthcare?",options:["CSS","HTML","JS","Disease prediction"],answer:"Disease prediction"},
{question:"Which model handles images best?",options:["RNN","KNN","Tree","CNN"],answer:"CNN"},
{question:"Which AI is future tech?",options:["HTML","CSS","JS","Artificial Intelligence"],answer:"Artificial Intelligence"},
{question:"Which tool trains deep models?",options:["NumPy","Pandas","Matplotlib","PyTorch"],answer:"PyTorch"},
{question:"Which ML used for recommendation?",options:["Sorting","Searching","Filtering","Collaborative filtering"],answer:"Collaborative filtering"},
{question:"Which AI system talks like human?",options:["Calculator","Compiler","Editor","Chatbot"],answer:"Chatbot"},
{question:"Which algorithm predicts yes/no?",options:["Regression","Clustering","Sorting","Classification"],answer:"Classification"},
{question:"Which ML learns from mistakes?",options:["Supervised","Unsupervised","Static","Reinforcement"],answer:"Reinforcement"},
{question:"Which AI improves automatically?",options:["Manual","Static","Fixed","Self-learning system"],answer:"Self-learning system"},
{question:"Which AI uses big data?",options:["CSS","HTML","JS","Machine Learning"],answer:"Machine Learning"},
{question:"Which ML step cleans data?",options:["Training","Testing","Deployment","Preprocessing"],answer:"Preprocessing"},
{question:"Which AI detects fraud?",options:["HTML","CSS","JS","Fraud detection system"],answer:"Fraud detection system"},
{question:"Which ML predicts house price?",options:["Classification","Clustering","Sorting","Regression"],answer:"Regression"},
{question:"Which AI powers self driving cars?",options:["HTML","CSS","JS","Artificial Intelligence"],answer:"Artificial Intelligence"}
];

export default function AIMachineTest() {
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
    navigate("/ml-task");
  };

  /* ================= LOAD TEST ================= */
   useEffect(() => {
    // ❌ always clear previous test
    localStorage.removeItem(STORAGE_KEY);
  
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  
    // ✅ always start new test
    startNewTest();
  }, []);

  /* ================= SAVE PROGRESS ================= */
  

  /* ================= BACK / REFRESH BLOCK ================= */
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
      const i = Math.floor(Math.random() * ALL_AI_ML_QUESTIONS.length);
      if (!used.has(i)) {
        picked.push(ALL_AI_ML_QUESTIONS[i]);
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
                    navigate("/certificate", { state: { type: "aiml" , level : "beginner"} })
                  }
                  className="px-6 py-3 bg-green-500 text-black rounded-lg"
                >
                  Check Certificate
                </button>
              ) : (

                <>
                <p className="text-red-500 mb-4">{user.name}, You failed 😞</p>
                <button
                  onClick={() => navigate("/ml-task")}
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
