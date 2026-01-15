// ❗ imports SAME
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "ai_ml_test_progress";
const TEST_TIME = 10 * 60;
const PASS_SCORE = 7;

export const ALL_AI_ML_INTERMEDIATE_QUESTIONS = [
/* ================= 1–25 ================= */
{question:"What is bias-variance tradeoff?",options:["Data split","Model balance between underfit & overfit","Training speed","Accuracy trick"],answer:"Model balance between underfit & overfit"},
{question:"Which algorithm is sensitive to outliers?",options:["Decision Tree","Linear Regression","Random Forest","KNN"],answer:"Linear Regression"},
{question:"What does regularization do?",options:["Increase data","Reduce overfitting","Increase loss","Remove labels"],answer:"Reduce overfitting"},
{question:"L1 regularization is also called?",options:["Ridge","Lasso","ElasticNet","Dropout"],answer:"Lasso"},
{question:"L2 regularization is called?",options:["Lasso","Ridge","Dropout","Boosting"],answer:"Ridge"},
{question:"Which metric is best for imbalanced dataset?",options:["Accuracy","F1 Score","MSE","Loss"],answer:"F1 Score"},
{question:"Which algorithm works on distance?",options:["Naive Bayes","KNN","Decision Tree","Logistic Regression"],answer:"KNN"},
{question:"What does K in KNN represent?",options:["Kernel","Cluster","Neighbors","Class"],answer:"Neighbors"},
{question:"What happens if K is very small?",options:["Underfitting","Overfitting","Balanced","No change"],answer:"Overfitting"},
{question:"Which algorithm uses probability?",options:["KNN","Naive Bayes","SVM","Tree"],answer:"Naive Bayes"},
{question:"What is hyperparameter?",options:["Learned parameter","Manually set parameter","Output","Loss"],answer:"Manually set parameter"},
{question:"Train-test split ratio commonly used?",options:["50-50","60-40","70-30","90-10"],answer:"70-30"},
{question:"What is cross validation?",options:["Training twice","Data shuffling","Multiple train-test splits","Only testing"],answer:"Multiple train-test splits"},
{question:"Which ML model outputs probability?",options:["Linear Regression","Logistic Regression","KNN","Tree"],answer:"Logistic Regression"},
{question:"Sigmoid function output range?",options:["0 to 1","-1 to 1","0 to infinity","-infinity to infinity"],answer:"0 to 1"},
{question:"Which loss used in classification?",options:["MSE","MAE","Log Loss","RMSE"],answer:"Log Loss"},
{question:"Which ML model is non-linear?",options:["Linear Regression","Decision Tree","Ridge","Lasso"],answer:"Decision Tree"},
{question:"Feature selection means?",options:["Creating data","Removing irrelevant features","Scaling","Encoding"],answer:"Removing irrelevant features"},
{question:"Feature engineering is?",options:["Model training","Data cleaning","Creating new features","Testing"],answer:"Creating new features"},
{question:"Which scaling method uses mean & std?",options:["Normalization","Standardization","MinMax","Log"],answer:"Standardization"},
{question:"Normalization range is?",options:["-1 to 1","0 to 1","0 to 100","Any"],answer:"0 to 1"},
{question:"Which model works best with scaling?",options:["Tree","KNN","Random Forest","Naive Bayes"],answer:"KNN"},
{question:"Which ML algorithm is interpretable?",options:["Neural Network","Decision Tree","SVM","KNN"],answer:"Decision Tree"},
{question:"What is ensemble learning?",options:["Single model","Multiple models combined","Deep learning","Transfer learning"],answer:"Multiple models combined"},
{question:"Which is ensemble algorithm?",options:["KNN","Random Forest","Linear Regression","Naive Bayes"],answer:"Random Forest"},

/* ================= 26–50 ================= */
{question:"Random Forest is based on?",options:["Boosting","Bagging","Stacking","Clustering"],answer:"Bagging"},
{question:"Which algorithm reduces bias?",options:["Bagging","Boosting","Clustering","Regression"],answer:"Boosting"},
{question:"Which boosting algorithm is popular?",options:["XGBoost","KNN","Naive Bayes","PCA"],answer:"XGBoost"},
{question:"What is PCA used for?",options:["Classification","Dimensionality reduction","Clustering","Prediction"],answer:"Dimensionality reduction"},
{question:"PCA works on?",options:["Labels","Variance","Distance","Probability"],answer:"Variance"},
{question:"What is dimensionality curse?",options:["High bias","High variance","Performance drop with features","Overfitting"],answer:"Performance drop with features"},
{question:"Which algorithm is lazy learner?",options:["KNN","Tree","Logistic","Naive Bayes"],answer:"KNN"},
{question:"Which algorithm is eager learner?",options:["KNN","Decision Tree","Instance based","Memory based"],answer:"Decision Tree"},
{question:"What is ROC curve?",options:["Loss graph","TPR vs FPR","Accuracy plot","Error plot"],answer:"TPR vs FPR"},
{question:"AUC full form?",options:["Area Under Curve","Accuracy Under Curve","Area Unit Cost","None"],answer:"Area Under Curve"},
{question:"Which value of AUC is best?",options:["0","0.5","1","Depends"],answer:"1"},
{question:"What is confusion matrix size for binary?",options:["2x2","3x3","1x2","2x3"],answer:"2x2"},
{question:"True Positive means?",options:["Correct negative","Wrong positive","Correct positive","Wrong negative"],answer:"Correct positive"},
{question:"False Negative means?",options:["Missed positive","Correct negative","Wrong positive","Correct positive"],answer:"Missed positive"},
{question:"Precision focuses on?",options:["False positive","False negative","True negative","Accuracy"],answer:"False positive"},
{question:"Recall focuses on?",options:["False negative","False positive","Accuracy","Loss"],answer:"False negative"},
{question:"Which metric used in medical diagnosis?",options:["Accuracy","Recall","MSE","Loss"],answer:"Recall"},
{question:"Which ML model supports kernel trick?",options:["Linear Regression","SVM","KNN","Tree"],answer:"SVM"},
{question:"Kernel trick used for?",options:["Speed","Non-linearity","Accuracy","Scaling"],answer:"Non-linearity"},
{question:"Which kernel is common?",options:["Linear","Polynomial","RBF","All"],answer:"All"},
{question:"What is margin in SVM?",options:["Distance between classes","Accuracy","Loss","Data size"],answer:"Distance between classes"},
{question:"Hard margin means?",options:["No error allowed","Some error allowed","Overfitting","Underfitting"],answer:"No error allowed"},
{question:"Soft margin allows?",options:["Zero error","Some misclassification","Only linear","Only nonlinear"],answer:"Some misclassification"},
{question:"Which algorithm handles non-linear data?",options:["Linear Regression","SVM with kernel","Naive Bayes","PCA"],answer:"SVM with kernel"},
{question:"Which ML model is memory based?",options:["KNN","Tree","SVM","Regression"],answer:"KNN"},

/* ================= 51–75 ================= */
{question:"What is learning rate?",options:["Training speed","Step size","Epoch count","Batch size"],answer:"Step size"},
{question:"High learning rate causes?",options:["Slow training","Divergence","Underfitting","No change"],answer:"Divergence"},
{question:"Low learning rate causes?",options:["Fast training","Slow convergence","Overfitting","Crash"],answer:"Slow convergence"},
{question:"Epoch means?",options:["One batch","One iteration","One full dataset pass","One model"],answer:"One full dataset pass"},
{question:"Batch gradient descent uses?",options:["One sample","Mini batch","Whole dataset","Random"],answer:"Whole dataset"},
{question:"Stochastic GD uses?",options:["Whole dataset","One sample","Mini batch","None"],answer:"One sample"},
{question:"Mini-batch GD uses?",options:["Few samples","One sample","All data","None"],answer:"Few samples"},
{question:"Which optimizer adapts learning rate?",options:["SGD","Adam","GD","Loss"],answer:"Adam"},
{question:"What is dropout?",options:["Remove data","Deactivate neurons","Increase loss","Scaling"],answer:"Deactivate neurons"},
{question:"Dropout prevents?",options:["Underfitting","Overfitting","Bias","Variance"],answer:"Overfitting"},
{question:"CNN best suited for?",options:["Text","Image","Audio","Tabular"],answer:"Image"},
{question:"RNN best suited for?",options:["Image","Sequence","Tabular","Static"],answer:"Sequence"},
{question:"LSTM solves?",options:["Overfitting","Vanishing gradient","Bias","Variance"],answer:"Vanishing gradient"},
{question:"Activation function adds?",options:["Linearity","Non-linearity","Noise","Loss"],answer:"Non-linearity"},
{question:"ReLU stands for?",options:["Rectified Linear Unit","Random Learning Unit","Recurrent Layer Unit","None"],answer:"Rectified Linear Unit"},
{question:"Softmax used in?",options:["Regression","Binary class","Multi-class","Clustering"],answer:"Multi-class"},
{question:"One-hot encoding used for?",options:["Scaling","Categorical data","Images","Text"],answer:"Categorical data"},
{question:"Label encoding problem?",options:["Memory","Order issue","Speed","Accuracy"],answer:"Order issue"},
{question:"Which avoids label encoding issue?",options:["Scaling","One-hot encoding","PCA","Dropout"],answer:"One-hot encoding"},
{question:"Which model requires feature scaling?",options:["Tree","KNN","Random Forest","Naive Bayes"],answer:"KNN"},
{question:"Which ML model is fast at prediction?",options:["KNN","Tree","Linear Regression","SVM"],answer:"Linear Regression"},
{question:"Which is computationally expensive?",options:["Linear Regression","KNN","Naive Bayes","Logistic"],answer:"KNN"},
{question:"Which algorithm good for small dataset?",options:["Deep NN","Linear Regression","CNN","RNN"],answer:"Linear Regression"},
{question:"Which ML step splits data?",options:["Training","Validation","Preprocessing","Deployment"],answer:"Preprocessing"},
{question:"Validation data used for?",options:["Training","Hyperparameter tuning","Final testing","Deployment"],answer:"Hyperparameter tuning"},

/* ================= 76–100 ================= */
{question:"Test data used for?",options:["Training","Tuning","Final evaluation","Scaling"],answer:"Final evaluation"},
{question:"Which ML model is black box?",options:["Linear Regression","Decision Tree","Neural Network","Logistic"],answer:"Neural Network"},
{question:"Explainability means?",options:["Speed","Understanding model decisions","Accuracy","Loss"],answer:"Understanding model decisions"},
{question:"Which tool explains ML models?",options:["SHAP","React","TensorFlow","Flask"],answer:"SHAP"},
{question:"Overfitting occurs when?",options:["High bias","Low variance","Model memorizes","Less data"],answer:"Model memorizes"},
{question:"Underfitting occurs when?",options:["Too complex","Too simple","Perfect","Balanced"],answer:"Too simple"},
{question:"Bias error is due to?",options:["Complex model","Simple model","Noise","Data leak"],answer:"Simple model"},
{question:"Variance error due to?",options:["Simple model","Complex model","Bias","Scaling"],answer:"Complex model"},
{question:"Data leakage means?",options:["Missing data","Test data in training","Noise","Scaling"],answer:"Test data in training"},
{question:"Which ML pipeline step is first?",options:["Training","Testing","Data collection","Deployment"],answer:"Data collection"},
{question:"Which ML model is robust to outliers?",options:["Linear Regression","Decision Tree","KNN","SVM"],answer:"Decision Tree"},
{question:"Which ML model uses entropy?",options:["Linear","Decision Tree","KNN","SVM"],answer:"Decision Tree"},
{question:"Entropy measures?",options:["Distance","Impurity","Accuracy","Loss"],answer:"Impurity"},
{question:"Gini index used in?",options:["Regression","Decision Tree","Clustering","SVM"],answer:"Decision Tree"},
{question:"Which ML algorithm uses distance metric?",options:["Tree","KNN","Naive Bayes","Regression"],answer:"KNN"},
{question:"Which ML model is sensitive to feature scale?",options:["Tree","KNN","Random Forest","Naive Bayes"],answer:"KNN"},
{question:"Which algorithm supports online learning?",options:["SGD","Tree","KNN","SVM"],answer:"SGD"},
{question:"What is model generalization?",options:["Training accuracy","Test performance","Loss","Speed"],answer:"Test performance"},
{question:"Which ML step saves model?",options:["Training","Serialization","Scaling","Encoding"],answer:"Serialization"},
{question:"Pickle used for?",options:["Training","Model saving","Scaling","Encoding"],answer:"Model saving"},
{question:"Which ML library for production?",options:["NumPy","Scikit-learn","TensorFlow","Matplotlib"],answer:"TensorFlow"},
{question:"Which ML model is good baseline?",options:["Deep NN","Linear Regression","CNN","RNN"],answer:"Linear Regression"},
{question:"Final goal of ML is?",options:["Accuracy","Learning patterns","Prediction","Deployment"],answer:"Prediction"},
{question:"Which ML phase improves model?",options:["Training","Evaluation","Iteration","Deployment"],answer:"Iteration"},
{question:"Which ML approach uses pre-trained models?",options:["Supervised","Transfer Learning","Unsupervised","Clustering"],answer:"Transfer Learning"}
];


export default function AIMachineTest2() {
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
      const i = Math.floor(Math.random() * ALL_AI_ML_INTERMEDIATE_QUESTIONS.length);
      if (!used.has(i)) {
        picked.push(ALL_AI_ML_INTERMEDIATE_QUESTIONS[i]);
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
                    navigate("/certificate", { state: { type: "aiml2" , level : "intermediate"} })
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
