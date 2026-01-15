import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "cyber_test_progress";
const TEST_TIME = 10 * 60; // 10 min
const PASS_SCORE = 7;

const ADVANCED_LEVEL_QUESTIONS = [
/* 1 */ { question:"Curse of dimensionality mainly affects?", options:["Bias","Variance","Distance metrics","Labels"], answer:"Distance metrics" },
/* 2 */ { question:"Which algorithm minimizes hinge loss?", options:["Logistic Regression","SVM","Naive Bayes","KNN"], answer:"SVM" },
/* 3 */ { question:"Vanishing gradient is severe in?", options:["CNN","Shallow NN","RNN","Linear model"], answer:"RNN" },
/* 4 */ { question:"Threshold independent metric?", options:["Accuracy","Precision","Recall","ROC-AUC"], answer:"ROC-AUC" },
/* 5 */ { question:"Which method handles class imbalance?", options:["PCA","SMOTE","Scaling","Encoding"], answer:"SMOTE" },
/* 6 */ { question:"Naive Bayes assumes?", options:["Linearity","Feature independence","Equal variance","Continuity"], answer:"Feature independence" },
/* 7 */ { question:"Best loss for binary classification?", options:["MSE","MAE","Log Loss","Huber"], answer:"Log Loss" },
/* 8 */ { question:"L1 regularization encourages?", options:["Smoothness","Sparsity","Stability","Normalization"], answer:"Sparsity" },
/* 9 */ { question:"Which algorithm is scale sensitive?", options:["Decision Tree","Naive Bayes","KNN","Random Forest"], answer:"KNN" },
/* 10 */ { question:"Validation for time series data?", options:["KFold","Stratified","TimeSeriesSplit","Bootstrap"], answer:"TimeSeriesSplit" },

/* 11 */ { question:"Optimizer with adaptive learning rate?", options:["SGD","Adam","Batch GD","Newton"], answer:"Adam" },
/* 12 */ { question:"High variance leads to?", options:["Underfitting","Overfitting","Bias","Noise"], answer:"Overfitting" },
/* 13 */ { question:"Which ensemble reduces variance?", options:["Boosting","Bagging","Stacking","Voting"], answer:"Bagging" },
/* 14 */ { question:"Activation preventing dying neurons?", options:["Sigmoid","Tanh","ReLU","Leaky ReLU"], answer:"Leaky ReLU" },
/* 15 */ { question:"Which distance uses vector magnitude?", options:["Cosine","Jaccard","Euclidean","Hamming"], answer:"Euclidean" },
/* 16 */ { question:"Non-parametric algorithm?", options:["Linear Regression","Logistic Regression","KNN","Naive Bayes"], answer:"KNN" },
/* 17 */ { question:"Greedy algorithm?", options:["KNN","Decision Tree","Linear Regression","Naive Bayes"], answer:"Decision Tree" },
/* 18 */ { question:"Which regularization penalizes squared weights?", options:["L1","Dropout","L2","Early stopping"], answer:"L2" },
/* 19 */ { question:"Best metric for imbalanced data?", options:["Accuracy","F1-score","RMSE","R2"], answer:"F1-score" },
/* 20 */ { question:"Technique to reduce NN overfitting?", options:["Dropout","Pooling","Encoding","Scaling"], answer:"Dropout" },

/* 21 */ { question:"Model predicting class probability?", options:["Regression","Classification","Clustering","Association"], answer:"Classification" },
/* 22 */ { question:"Most interpretable ML model?", options:["XGBoost","Random Forest","Linear Regression","Neural Network"], answer:"Linear Regression" },
/* 23 */ { question:"Missing value handling methods?", options:["Drop","Impute","Interpolate","All"], answer:"All" },
/* 24 */ { question:"Which assumes Gaussian distribution?", options:["SVM","Naive Bayes","KNN","Tree"], answer:"Naive Bayes" },
/* 25 */ { question:"Scaler robust to outliers?", options:["MinMax","Standard","Robust","Normalize"], answer:"Robust" },
/* 26 */ { question:"Tree parameter limiting growth?", options:["Criterion","Min samples","Max depth","Splitter"], answer:"Max depth" },
/* 27 */ { question:"Kernel mapping to infinite dimension?", options:["Linear","Polynomial","Sigmoid","RBF"], answer:"RBF" },
/* 28 */ { question:"Metric prioritizing false negatives?", options:["Precision","Recall","Accuracy","Specificity"], answer:"Recall" },
/* 29 */ { question:"Best algorithm for text classification?", options:["KNN","Naive Bayes","Linear Regression","Tree"], answer:"Naive Bayes" },
/* 30 */ { question:"Unsupervised learning task?", options:["Regression","Classification","Clustering","Prediction"], answer:"Clustering" },

/* 31 */ { question:"Sorting with O(n log n) worst case?", options:["Bubble","Merge","Insertion","Selection"], answer:"Merge" },
/* 32 */ { question:"Graph to analyze correlation?", options:["Histogram","Pie","Scatter","Bar"], answer:"Scatter" },
/* 33 */ { question:"Optimizer using second derivatives?", options:["SGD","Adam","Newton","RMSProp"], answer:"Newton" },
/* 34 */ { question:"Model capturing non-linearity?", options:["OLS","Decision Tree","Ridge","Lasso"], answer:"Decision Tree" },
/* 35 */ { question:"Regression evaluation metric?", options:["Accuracy","Recall","MSE","F1"], answer:"MSE" },
/* 36 */ { question:"Technique preventing exploding gradients?", options:["Dropout","Clipping","BatchNorm","Pooling"], answer:"Clipping" },
/* 37 */ { question:"Algorithm requiring normalization?", options:["Tree","Random Forest","KNN","Naive Bayes"], answer:"KNN" },
/* 38 */ { question:"Learning with reward signal?", options:["Supervised","Unsupervised","Reinforcement","Clustering"], answer:"Reinforcement" },
/* 39 */ { question:"Improves model generalization?", options:["Overfitting","Regularization","Leakage","Noise"], answer:"Regularization" },
/* 40 */ { question:"Layer extracting spatial features?", options:["Dense","RNN","CNN","Embedding"], answer:"CNN" },

/* 41 */ { question:"Outlier detection algorithm?", options:["PCA","Isolation Forest","Bagging","Boosting"], answer:"Isolation Forest" },
/* 42 */ { question:"Ensemble reducing bias?", options:["Bagging","Boosting","Sampling","Dropout"], answer:"Boosting" },
/* 43 */ { question:"Loss function in SVM?", options:["Log Loss","Hinge","MSE","MAE"], answer:"Hinge" },
/* 44 */ { question:"Algorithm using backpropagation?", options:["KNN","Naive Bayes","Neural Network","Tree"], answer:"Neural Network" },
/* 45 */ { question:"Prevents data leakage?", options:["Shuffling","Pipeline","Oversampling","Scaling"], answer:"Pipeline" },
/* 46 */ { question:"Scale invariant similarity metric?", options:["RMSE","MAE","R2","Cosine similarity"], answer:"Cosine similarity" },
/* 47 */ { question:"Supports online learning?", options:["Batch GD","SGD","Normal Equation","OLS"], answer:"SGD" },
/* 48 */ { question:"Linear decision boundary model?", options:["Linear SVM","KNN","Tree","XGBoost"], answer:"Linear SVM" },
/* 49 */ { question:"Combines heterogeneous models?", options:["Stacking","Scaling","Encoding","Splitting"], answer:"Stacking" },
/* 50 */ { question:"Statistical measure of dispersion?", options:["Mean","Median","Variance","Mode"], answer:"Variance" },

/* 51 */ { question:"Best for sparse high-dimensional data?", options:["KNN","Naive Bayes","Tree","SVM"], answer:"Naive Bayes" },
/* 52 */ { question:"Metric robust for imbalance?", options:["Accuracy","Recall","AUC","Recall & AUC"], answer:"Recall & AUC" },
/* 53 */ { question:"Activation with sum = 1?", options:["Sigmoid","ReLU","Softmax","Tanh"], answer:"Softmax" },
/* 54 */ { question:"Probabilistic classifier?", options:["Decision Tree","SVM","Naive Bayes","KNN"], answer:"Naive Bayes" },
/* 55 */ { question:"Lazy learning algorithm?", options:["KNN","SVM","Tree","Regression"], answer:"KNN" },
/* 56 */ { question:"Dimensionality reduction method?", options:["Bagging","Boosting","PCA","Stacking"], answer:"PCA" },
/* 57 */ { question:"AUC measures?", options:["Accuracy","Ranking quality","Loss","Error"], answer:"Ranking quality" },
/* 58 */ { question:"Model sensitive to multicollinearity?", options:["Tree","KNN","Linear Regression","Naive Bayes"], answer:"Linear Regression" },
/* 59 */ { question:"Balances bias-variance tradeoff?", options:["Regularization","Noise","Leakage","Oversampling"], answer:"Regularization" },
/* 60 */ { question:"Categorical encoding technique?", options:["Scaling","One-Hot Encoding","Normalization","Clipping"], answer:"One-Hot Encoding" },

/* 61 */ { question:"Which reduces training variance?", options:["Bagging","Boosting","SGD","Normalization"], answer:"Bagging" },
/* 62 */ { question:"Overfitting occurs when?", options:["High bias","High variance","Low complexity","Few features"], answer:"High variance" },
/* 63 */ { question:"Loss for regression?", options:["Cross entropy","MSE","Hinge","Log loss"], answer:"MSE" },
/* 64 */ { question:"Which model uses margins?", options:["Logistic Regression","SVM","KNN","Tree"], answer:"SVM" },
/* 65 */ { question:"Which avoids exploding gradients?", options:["Clipping","Pooling","Encoding","Dropout"], answer:"Clipping" },
/* 66 */ { question:"Which model is black box?", options:["Linear Regression","Decision Tree","Neural Network","Logistic"], answer:"Neural Network" },
/* 67 */ { question:"Which improves convergence speed?", options:["Lower LR","Higher LR","Momentum","Noise"], answer:"Momentum" },
/* 68 */ { question:"Which is unsupervised?", options:["KNN","KMeans","SVM","Logistic"], answer:"KMeans" },
/* 69 */ { question:"Which requires feature scaling?", options:["Tree","Random Forest","KNN","Naive Bayes"], answer:"KNN" },
/* 70 */ { question:"Which reduces overfitting?", options:["Dropout","Increase depth","Noise","Leakage"], answer:"Dropout" },

/* 71 */ { question:"Which handles non-linearity automatically?", options:["Linear Reg","Logistic Reg","Decision Tree","OLS"], answer:"Decision Tree" },
/* 72 */ { question:"Which is bagging based?", options:["AdaBoost","XGBoost","Random Forest","SVM"], answer:"Random Forest" },
/* 73 */ { question:"Which is boosting based?", options:["Bagging","Random Forest","AdaBoost","KNN"], answer:"AdaBoost" },
/* 74 */ { question:"Which metric penalizes false positives?", options:["Recall","Precision","Accuracy","RMSE"], answer:"Precision" },
/* 75 */ { question:"Which layer normalizes batch stats?", options:["Dense","Dropout","BatchNorm","Pooling"], answer:"BatchNorm" },
/* 76 */ { question:"Which reduces internal covariate shift?", options:["Dropout","BatchNorm","PCA","Scaling"], answer:"BatchNorm" },
/* 77 */ { question:"Which is parametric?", options:["KNN","Tree","Linear Regression","DBSCAN"], answer:"Linear Regression" },
/* 78 */ { question:"Which handles concept drift?", options:["Batch learning","Online learning","PCA","Scaling"], answer:"Online learning" },
/* 79 */ { question:"Which algorithm clusters density?", options:["KMeans","Hierarchical","DBSCAN","SVM"], answer:"DBSCAN" },
/* 80 */ { question:"Which distance suits text vectors?", options:["Euclidean","Manhattan","Cosine","Hamming"], answer:"Cosine" },

/* 81 */ { question:"Which avoids overfitting in trees?", options:["Increase depth","Pruning","Noise","Oversample"], answer:"Pruning" },
/* 82 */ { question:"Which is instance-based?", options:["SVM","Tree","KNN","Regression"], answer:"KNN" },
/* 83 */ { question:"Which metric for ranking models?", options:["RMSE","MAE","AUC","Accuracy"], answer:"AUC" },
/* 84 */ { question:"Which method ensembles weak learners?", options:["Bagging","Boosting","Stacking","Voting"], answer:"Boosting" },
/* 85 */ { question:"Which ML task predicts labels?", options:["Regression","Classification","Clustering","Reduction"], answer:"Classification" },
/* 86 */ { question:"Which avoids data leakage?", options:["Shuffle before split","Split before scale","Oversample first","Normalize first"], answer:"Split before scale" },
/* 87 */ { question:"Which is convex loss?", options:["MSE","0-1 loss","Hinge","Both A & C"], answer:"Both A & C" },
/* 88 */ { question:"Which algorithm finds hyperplane?", options:["KNN","SVM","Tree","Naive Bayes"], answer:"SVM" },
/* 89 */ { question:"Which regularization drives weights to zero?", options:["L2","Dropout","L1","Early stop"], answer:"L1" },
/* 90 */ { question:"Which model handles non-linearity via kernels?", options:["Linear Reg","SVM","KNN","Tree"], answer:"SVM" },

/* 91 */ { question:"Which technique increases data?", options:["Scaling","Augmentation","Normalization","Clipping"], answer:"Augmentation" },
/* 92 */ { question:"Which metric for skewed classes?", options:["Accuracy","Recall","F1","Precision"], answer:"F1" },
/* 93 */ { question:"Which algorithm is deterministic?", options:["KMeans","DBSCAN","Linear Regression","Random Forest"], answer:"Linear Regression" },
/* 94 */ { question:"Which avoids gradient explosion?", options:["Clipping","Normalization","Dropout","Pooling"], answer:"Clipping" },
/* 95 */ { question:"Which is hierarchical clustering?", options:["KMeans","Agglomerative","DBSCAN","SVM"], answer:"Agglomerative" },
/* 96 */ { question:"Which model assumes linearity?", options:["Tree","Neural Net","Linear Regression","KNN"], answer:"Linear Regression" },
/* 97 */ { question:"Which uses expectation-maximization?", options:["KMeans","GMM","DBSCAN","SVM"], answer:"GMM" },
/* 98 */ { question:"Which handles missing internally?", options:["Linear Reg","XGBoost","KNN","SVM"], answer:"XGBoost" },
/* 99 */ { question:"Which is variance reduction technique?", options:["Boosting","Bagging","Noise","Leakage"], answer:"Bagging" },
/* 100 */ { question:"Which ML model is hardest to interpret?", options:["Linear Reg","Decision Tree","Neural Network","Logistic"], answer:"Neural Network" }
];


export default function CyberSecurityTest3() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(TEST_TIME);

  /* ======================= EXIT TEST ======================== */
  const exitTest = () => {
    localStorage.removeItem(STORAGE_KEY);
    navigate("/cyber-task", { replace: true });
  };

  /* ======================= LOAD TEST ======================== */
  useEffect(() => {
    // ❌ always clear previous test
    localStorage.removeItem(STORAGE_KEY);
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
      const i = Math.floor(Math.random() * ADVANCED_LEVEL_QUESTIONS.length);
      if (!usedIndexes.has(i)) {
        picked.push(ADVANCED_LEVEL_QUESTIONS[i]);
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
                    navigate("/certificate", { state: { type: "cyber" , level : "advanced" } })
                  }
                  className="px-6 py-3 bg-green-500 text-black rounded-lg"
                >
                  Check Certificate
                </button>
              ) : (
                <>
                  <p className="text-red-500 mb-4">
                    You failed 😞
                  </p>
                  <button
                    onClick={() => navigate("/cyber-task")}
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






















