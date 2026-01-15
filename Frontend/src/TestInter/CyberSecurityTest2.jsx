import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "cyber_test_progress";
const TEST_TIME = 10 * 60; // 10 min
const PASS_SCORE = 7;
export const INTERMEDIATE_QUESTIONS = [

/* ================= 1–20 ================= */

{ question:"Which loss function is used in logistic regression?", options:["MSE","Log Loss","Hinge","MAE"], answer:"Log Loss" },
{ question:"Which metric is best for imbalanced classification?", options:["Accuracy","Recall","F1-score","RMSE"], answer:"F1-score" },
{ question:"Which technique reduces variance?", options:["Boosting","Bagging","Scaling","Encoding"], answer:"Bagging" },
{ question:"Which algorithm is non-parametric?", options:["Linear Regression","Logistic Regression","KNN","Naive Bayes"], answer:"KNN" },
{ question:"Which model assumes feature independence?", options:["SVM","KNN","Naive Bayes","Random Forest"], answer:"Naive Bayes" },
{ question:"Which is an ensemble method?", options:["SVM","Decision Tree","Random Forest","KNN"], answer:"Random Forest" },
{ question:"Which metric is used for clustering quality?", options:["Accuracy","Silhouette Score","Recall","F1"], answer:"Silhouette Score" },
{ question:"Which algorithm uses margin maximization?", options:["KNN","Naive Bayes","SVM","K-Means"], answer:"SVM" },
{ question:"Which scaling uses mean and std?", options:["MinMax","Robust","StandardScaler","Normalizer"], answer:"StandardScaler" },
{ question:"Which method reduces dimensionality?", options:["PCA","Encoding","Scaling","Bagging"], answer:"PCA" },
{ question:"Which algorithm is greedy?", options:["KNN","SVM","K-Means","Naive Bayes"], answer:"K-Means" },
{ question:"Which algorithm handles non-linearity well?", options:["Linear Regression","Polynomial Regression","Ridge","Lasso"], answer:"Polynomial Regression" },
{ question:"Which regression penalizes absolute weights?", options:["Ridge","ElasticNet","Lasso","OLS"], answer:"Lasso" },
{ question:"Which metric evaluates ranking models?", options:["RMSE","Accuracy","AUC","MAE"], answer:"AUC" },
{ question:"Which model is probabilistic?", options:["SVM","Naive Bayes","KNN","Tree"], answer:"Naive Bayes" },
{ question:"Which algorithm is sensitive to feature scaling?", options:["Tree","Random Forest","KNN","Naive Bayes"], answer:"KNN" },
{ question:"Which technique combats overfitting?", options:["Regularization","Normalization","Encoding","Sampling"], answer:"Regularization" },
{ question:"Which model outputs probabilities?", options:["Linear Reg","Logistic Reg","KNN","SVM"], answer:"Logistic Reg" },
{ question:"Which loss is used in SVM?", options:["Log Loss","MSE","Hinge Loss","MAE"], answer:"Hinge Loss" },
{ question:"Which model is linear?", options:["CNN","KNN","Linear Regression","Decision Tree"], answer:"Linear Regression" },

/* ================= 21–40 ================= */

{ question:"Which optimizer is adaptive?", options:["SGD","Momentum","Adam","Batch GD"], answer:"Adam" },
{ question:"Which activation avoids vanishing gradient?", options:["Sigmoid","Tanh","ReLU","Softmax"], answer:"ReLU" },
{ question:"Which layer extracts features?", options:["Dense","Dropout","Convolution","Flatten"], answer:"Convolution" },
{ question:"Which CNN layer reduces dimensions?", options:["Dense","Pooling","Conv","BatchNorm"], answer:"Pooling" },
{ question:"Which technique randomly drops neurons?", options:["BatchNorm","Dropout","Pooling","Scaling"], answer:"Dropout" },
{ question:"Which model is sequence-based?", options:["CNN","RNN","SVM","KNN"], answer:"RNN" },
{ question:"Which variant solves vanishing gradient?", options:["RNN","LSTM","CNN","ANN"], answer:"LSTM" },
{ question:"Which activation used in multi-class output?", options:["Sigmoid","ReLU","Softmax","Tanh"], answer:"Softmax" },
{ question:"Which loss for multi-class classification?", options:["MSE","Binary CE","Categorical CE","MAE"], answer:"Categorical CE" },
{ question:"Which technique speeds up training?", options:["Dropout","Batch Normalization","Regularization","Pruning"], answer:"Batch Normalization" },
{ question:"Which learning is reward-based?", options:["Supervised","Unsupervised","Reinforcement","Semi"], answer:"Reinforcement" },
{ question:"Which algorithm uses Q-table?", options:["SARSA","Q-Learning","Policy Grad","DQN"], answer:"Q-Learning" },
{ question:"Which policy balances exploration?", options:["Greedy","Epsilon-Greedy","Random","Static"], answer:"Epsilon-Greedy" },
{ question:"Which RL problem maximizes reward?", options:["Classification","Regression","MDP","Clustering"], answer:"MDP" },
{ question:"Which algo is online learning?", options:["Batch GD","SGD","Normal Eq","OLS"], answer:"SGD" },
{ question:"Which method handles class imbalance?", options:["Oversampling","Scaling","Encoding","PCA"], answer:"Oversampling" },
{ question:"Which sampling reduces majority class?", options:["SMOTE","ADASYN","Undersampling","Scaling"], answer:"Undersampling" },
{ question:"Which evaluation uses confusion matrix?", options:["RMSE","Accuracy","Precision","Both"], answer:"Both" },
{ question:"Which metric penalizes false positives?", options:["Recall","Precision","Accuracy","RMSE"], answer:"Precision" },
{ question:"Which curve shows tradeoff?", options:["ROC","Loss","Histogram","Line"], answer:"ROC" },

/* ================= 41–60 ================= */

{ question:"Which algorithm uses bootstrapping?", options:["SVM","Random Forest","KNN","NB"], answer:"Random Forest" },
{ question:"Which method reduces bias?", options:["Bagging","Boosting","Sampling","Scaling"], answer:"Boosting" },
{ question:"Which boosting is gradient-based?", options:["AdaBoost","XGBoost","Bagging","RF"], answer:"XGBoost" },
{ question:"Which algo handles sparse data?", options:["SVM","Naive Bayes","Tree","KNN"], answer:"Naive Bayes" },
{ question:"Which metric measures error magnitude?", options:["Accuracy","Recall","MAE","AUC"], answer:"MAE" },
{ question:"Which regression assumes normality?", options:["OLS","Ridge","Lasso","Elastic"], answer:"OLS" },
{ question:"Which algorithm partitions data?", options:["Hierarchical","DBSCAN","K-Means","OPTICS"], answer:"K-Means" },
{ question:"Which clustering detects noise?", options:["K-Means","Hierarchical","DBSCAN","PCA"], answer:"DBSCAN" },
{ question:"Which distance used in KNN?", options:["Cosine","Manhattan","Euclidean","All"], answer:"All" },
{ question:"Which similarity uses angle?", options:["Euclidean","Cosine","Manhattan","Hamming"], answer:"Cosine" },
{ question:"Which method encodes categories?", options:["Scaling","One-Hot","PCA","SMOTE"], answer:"One-Hot" },
{ question:"Which encoding preserves order?", options:["Label","One-Hot","Binary","Hash"], answer:"Label" },
{ question:"Which technique avoids data leakage?", options:["Shuffling","Train-Test Split","Scaling","Encoding"], answer:"Train-Test Split" },
{ question:"Which validation uses folds?", options:["Holdout","Bootstrap","Cross Validation","Shuffle"], answer:"Cross Validation" },
{ question:"Which CV is exhaustive?", options:["K-Fold","Leave-One-Out","Stratified","Random"], answer:"Leave-One-Out" },
{ question:"Which metric for time-series?", options:["Accuracy","MAE","AUC","F1"], answer:"MAE" },
{ question:"Which model captures seasonality?", options:["ARIMA","OLS","SVM","KNN"], answer:"ARIMA" },
{ question:"Which component removes trend?", options:["Differencing","Scaling","Encoding","Sampling"], answer:"Differencing" },
{ question:"Which test checks stationarity?", options:["ADF","Chi-square","ANOVA","Z-test"], answer:"ADF" },
{ question:"Which decomposition splits series?", options:["STL","PCA","SVD","FFT"], answer:"STL" },

/* ================= 61–80 ================= */

{ question:"Which method compresses data?", options:["PCA","Scaling","Sampling","Encoding"], answer:"PCA" },
{ question:"Which matrix factorization?", options:["SVD","FFT","PCA","ICA"], answer:"SVD" },
{ question:"Which recommender uses similarity?", options:["Content","Collaborative","Hybrid","Rule"], answer:"Collaborative" },
{ question:"Which system uses user-item matrix?", options:["Content","Collaborative","Rule","Static"], answer:"Collaborative" },
{ question:"Which metric for recommender?", options:["RMSE","Accuracy","Recall","AUC"], answer:"RMSE" },
{ question:"Which algorithm finds latent factors?", options:["KNN","SVD","NB","Tree"], answer:"SVD" },
{ question:"Which technique handles cold start?", options:["Content-Based","Collaborative","Matrix","Hybrid"], answer:"Content-Based" },
{ question:"Which NLP model is contextual?", options:["Word2Vec","GloVe","BERT","TF-IDF"], answer:"BERT" },
{ question:"Which embedding is static?", options:["BERT","ELMo","Word2Vec","GPT"], answer:"Word2Vec" },
{ question:"Which model is transformer?", options:["CNN","RNN","BERT","LSTM"], answer:"BERT" },
{ question:"Which attention scales quadratically?", options:["Self-Attn","RNN","CNN","Pooling"], answer:"Self-Attn" },
{ question:"Which tokenizer splits subwords?", options:["Whitespace","Regex","BPE","Rule"], answer:"BPE" },
{ question:"Which NLP task labels sequence?", options:["NER","Clustering","Summarization","Topic"], answer:"NER" },
{ question:"Which metric for language model?", options:["BLEU","Accuracy","RMSE","AUC"], answer:"BLEU" },
{ question:"Which loss for language modeling?", options:["MSE","Cross Entropy","Hinge","MAE"], answer:"Cross Entropy" },
{ question:"Which model generates text?", options:["SVM","KNN","GPT","NB"], answer:"GPT" },
{ question:"Which technique prevents exploding gradients?", options:["Clipping","Scaling","Dropout","PCA"], answer:"Clipping" },
{ question:"Which optimizer uses momentum?", options:["Adam","RMSProp","SGD","Both"], answer:"Both" },
{ question:"Which learning rate schedule decays?", options:["Constant","Step","Cyclic","All"], answer:"All" },
{ question:"Which metric evaluates probabilistic forecasts?", options:["Brier Score","Accuracy","RMSE","F1"], answer:"Brier Score" },

/* ================= 81–100 ================= */

{ question:"Which method detects anomalies?", options:["K-Means","Isolation Forest","Linear Reg","OLS"], answer:"Isolation Forest" },
{ question:"Which algorithm isolates outliers?", options:["LOF","SVM","Tree","NB"], answer:"LOF" },
{ question:"Which method handles drift?", options:["Batch","Online","Static","Rule"], answer:"Online" },
{ question:"Which monitoring checks distribution?", options:["PSI","Accuracy","Recall","Loss"], answer:"PSI" },
{ question:"Which metric measures drift?", options:["PSI","RMSE","AUC","F1"], answer:"PSI" },
{ question:"Which pipeline automates ML?", options:["ETL","AutoML","EDA","BI"], answer:"AutoML" },
{ question:"Which framework serves models?", options:["Flask","TensorFlow Serving","React","Django"], answer:"TensorFlow Serving" },
{ question:"Which format stores models?", options:["CSV","JSON","Pickle","TXT"], answer:"Pickle" },
{ question:"Which tool versions data?", options:["Git","DVC","Docker","Airflow"], answer:"DVC" },
{ question:"Which tool orchestrates workflows?", options:["Kafka","Airflow","Spark","Hadoop"], answer:"Airflow" },
{ question:"Which system processes streams?", options:["Spark","HDFS","MapReduce","Hive"], answer:"Spark" },
{ question:"Which storage is columnar?", options:["CSV","Parquet","JSON","TXT"], answer:"Parquet" },
{ question:"Which query engine is distributed?", options:["MySQL","Postgres","Presto","SQLite"], answer:"Presto" },
{ question:"Which architecture decouples compute?", options:["Monolith","Lambda","Micro","Client"], answer:"Lambda" },
{ question:"Which layer ensures reproducibility?", options:["Logging","Versioning","Scaling","Caching"], answer:"Versioning" },
{ question:"Which metric tracks business impact?", options:["Accuracy","Precision","ROI","Recall"], answer:"ROI" },
{ question:"Which approach is data-centric?", options:["Model tuning","Data quality","Hyperparams","Ensemble"], answer:"Data quality" },
{ question:"Which practice prevents leakage?", options:["Feature store","Train-test split","Scaling","Encoding"], answer:"Train-test split" },
{ question:"Which store manages features?", options:["DB","Cache","Feature Store","Queue"], answer:"Feature Store" },
{ question:"Which principle ensures fairness?", options:["Bias check","Scaling","Encoding","Sampling"], answer:"Bias check" }

];



export default function CyberSecurityTest2() {
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
      const i = Math.floor(Math.random() * INTERMEDIATE_QUESTIONS.length);
      if (!usedIndexes.has(i)) {
        picked.push(INTERMEDIATE_QUESTIONS[i]);
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
                    navigate("/certificate", { state: { type: "cyber" , level : "intermediate" } })
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






















