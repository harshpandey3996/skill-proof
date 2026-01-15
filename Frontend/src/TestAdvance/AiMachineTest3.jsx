// ❗ imports SAME
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "ai_ml_test_progress";
const TEST_TIME = 10 * 60;
const PASS_SCORE = 7;
export const ALL_AI_ML_ADVANCED_QUESTIONS = [

/* ================= ADVANCED (1–25) ================= */
{question:"What does backpropagation optimize?",options:["Weights","Dataset","UI","Epoch"],answer:"Weights"},
{question:"Vanishing gradient occurs in?",options:["Shallow networks","Deep networks","Linear models","KNN"],answer:"Deep networks"},
{question:"Which activation avoids vanishing gradient?",options:["Sigmoid","Tanh","ReLU","Step"],answer:"ReLU"},
{question:"Which optimizer adapts learning rate?",options:["SGD","Adam","GD","Newton"],answer:"Adam"},
{question:"What is regularization used for?",options:["Increase loss","Prevent overfitting","Speed training","Reduce data"],answer:"Prevent overfitting"},
{question:"L1 regularization is also called?",options:["Ridge","ElasticNet","Lasso","Dropout"],answer:"Lasso"},
{question:"L2 regularization is also called?",options:["Lasso","Ridge","Dropout","BatchNorm"],answer:"Ridge"},
{question:"Dropout does what?",options:["Remove neurons randomly","Increase neurons","Freeze weights","Normalize data"],answer:"Remove neurons randomly"},
{question:"Batch normalization helps with?",options:["UI","Gradient stability","Routing","Deployment"],answer:"Gradient stability"},
{question:"Which loss for binary classification?",options:["MSE","Cross entropy","MAE","Huber"],answer:"Cross entropy"},
{question:"Which loss for multi-class classification?",options:["Binary CE","Categorical CE","MSE","MAE"],answer:"Categorical CE"},
{question:"Exploding gradient means?",options:["Very small gradient","Very large gradient","No gradient","Perfect training"],answer:"Very large gradient"},
{question:"Which solves exploding gradient?",options:["Clipping","Normalization","Scaling","Dropout"],answer:"Clipping"},
{question:"Which optimizer uses momentum?",options:["SGD","Adam","RMSprop","All"],answer:"All"},
{question:"Bias-variance tradeoff means?",options:["Speed vs size","Underfit vs overfit","Loss vs accuracy","Train vs test"],answer:"Underfit vs overfit"},
{question:"What is ensemble learning?",options:["Single model","Multiple models","UI logic","Routing"],answer:"Multiple models"},
{question:"Which is ensemble method?",options:["SVM","Random Forest","KNN","Linear Reg"],answer:"Random Forest"},
{question:"Bagging reduces?",options:["Bias","Variance","Loss","Noise"],answer:"Variance"},
{question:"Boosting reduces?",options:["Variance","Bias","Data","Features"],answer:"Bias"},
{question:"Which boosting algorithm?",options:["KNN","AdaBoost","PCA","SVM"],answer:"AdaBoost"},
{question:"XGBoost is?",options:["Clustering","Boosting","Regression only","CNN"],answer:"Boosting"},
{question:"Which metric for imbalanced dataset?",options:["Accuracy","F1 Score","Loss","MSE"],answer:"F1 Score"},
{question:"ROC curve plots?",options:["Loss vs epoch","TPR vs FPR","Accuracy vs loss","Bias vs variance"],answer:"TPR vs FPR"},
{question:"AUC means?",options:["Area under curve","Average unit cost","Auto update cycle","Accuracy unit"],answer:"Area under curve"},
{question:"Confusion matrix size for binary?",options:["2x2","3x3","4x4","1x2"],answer:"2x2"},

/* ================= ADVANCED (26–50) ================= */
{question:"What is PCA used for?",options:["Classification","Dimensionality reduction","Clustering","Regression"],answer:"Dimensionality reduction"},
{question:"PCA maximizes?",options:["Variance","Bias","Loss","Accuracy"],answer:"Variance"},
{question:"Eigenvectors belong to?",options:["PCA","CNN","RNN","KNN"],answer:"PCA"},
{question:"Which distance metric in KNN?",options:["Euclidean","Cosine","Manhattan","All"],answer:"All"},
{question:"Curse of dimensionality affects?",options:["KNN","Linear reg","Naive Bayes","Tree"],answer:"KNN"},
{question:"SVM tries to maximize?",options:["Loss","Margin","Variance","Bias"],answer:"Margin"},
{question:"Kernel trick used in?",options:["CNN","SVM","RNN","Tree"],answer:"SVM"},
{question:"Which kernel is non-linear?",options:["Linear","Polynomial","Dot","Identity"],answer:"Polynomial"},
{question:"Soft margin SVM allows?",options:["No error","Some misclassification","Infinite margin","No slack"],answer:"Some misclassification"},
{question:"Naive Bayes assumes?",options:["Dependent features","Independent features","Equal data","Balanced data"],answer:"Independent features"},
{question:"Which NB used for text?",options:["Gaussian","Bernoulli","Multinomial","Uniform"],answer:"Multinomial"},
{question:"Decision tree splits based on?",options:["Loss","Information gain","Epoch","LR"],answer:"Information gain"},
{question:"Entropy measures?",options:["Accuracy","Impurity","Loss","Depth"],answer:"Impurity"},
{question:"Gini index measures?",options:["Variance","Impurity","Bias","Noise"],answer:"Impurity"},
{question:"Tree pruning helps with?",options:["Underfitting","Overfitting","Data leak","Scaling"],answer:"Overfitting"},
{question:"Random forest uses?",options:["Single tree","Multiple trees","Boosting","Clustering"],answer:"Multiple trees"},
{question:"Out-of-bag error used in?",options:["SVM","RF","KNN","CNN"],answer:"RF"},
{question:"Feature importance comes from?",options:["CNN","Tree models","KNN","SVM"],answer:"Tree models"},
{question:"Which model is probabilistic?",options:["Tree","Naive Bayes","KNN","Linear"],answer:"Naive Bayes"},
{question:"Logistic regression outputs?",options:["Class","Probability","Label","Cluster"],answer:"Probability"},
{question:"Sigmoid output range?",options:["-1 to 1","0 to 1","0 to ∞","-∞ to ∞"],answer:"0 to 1"},
{question:"Threshold used in classification?",options:["0.1","0.5","1","Depends"],answer:"0.5"},
{question:"Calibration refers to?",options:["UI","Probability correctness","Loss","Scaling"],answer:"Probability correctness"},
{question:"Which handles non-linearity?",options:["Linear reg","Polynomial features","PCA","Scaling"],answer:"Polynomial features"},
{question:"Feature engineering improves?",options:["Hardware","Model performance","Dataset size","Epoch"],answer:"Model performance"},

/* ================= ADVANCED (51–75) ================= */
{question:"CNN mainly used for?",options:["Text","Images","Audio","Tabular"],answer:"Images"},
{question:"Convolution extracts?",options:["Edges/features","Labels","Noise","Targets"],answer:"Edges/features"},
{question:"Pooling reduces?",options:["Channels","Overfitting","Spatial size","Loss"],answer:"Spatial size"},
{question:"Which pooling common?",options:["Avg","Max","Min","Sum"],answer:"Max"},
{question:"CNN parameter sharing reduces?",options:["Loss","Overfitting","Params","Bias"],answer:"Params"},
{question:"RNN handles?",options:["Images","Sequences","Tables","Graphs"],answer:"Sequences"},
{question:"RNN problem?",options:["Overfitting","Vanishing gradient","Bias","Noise"],answer:"Vanishing gradient"},
{question:"LSTM solves?",options:["Overfitting","Long-term dependency","Bias","Noise"],answer:"Long-term dependency"},
{question:"GRU is?",options:["CNN","Simplified LSTM","Tree","NB"],answer:"Simplified LSTM"},
{question:"Transformer uses?",options:["Recurrence","Attention","Pooling","Trees"],answer:"Attention"},
{question:"Self-attention measures?",options:["Distance","Importance","Loss","Bias"],answer:"Importance"},
{question:"BERT is?",options:["CNN","Transformer","RNN","Tree"],answer:"Transformer"},
{question:"GPT is based on?",options:["CNN","RNN","Transformer","NB"],answer:"Transformer"},
{question:"Transfer learning means?",options:["Train from scratch","Reuse pretrained model","Delete weights","Freeze data"],answer:"Reuse pretrained model"},
{question:"Fine-tuning means?",options:["Freeze all","Train some layers","Delete model","Scale data"],answer:"Train some layers"},
{question:"Overparameterization risk?",options:["Underfitting","Overfitting","Low loss","Bias"],answer:"Overfitting"},
{question:"Early stopping prevents?",options:["Bias","Overfitting","Noise","Scaling"],answer:"Overfitting"},
{question:"Learning rate too high causes?",options:["Slow training","Divergence","Overfit","Bias"],answer:"Divergence"},
{question:"Learning rate too low causes?",options:["Fast training","Slow convergence","Divergence","Overfit"],answer:"Slow convergence"},
{question:"Hyperparameter tuning uses?",options:["Grid search","Random search","Bayesian","All"],answer:"All"},
{question:"Cross-validation improves?",options:["Bias","Generalization","Speed","Noise"],answer:"Generalization"},
{question:"K-fold CV splits into?",options:["Train only","K parts","2 sets","Random"],answer:"K parts"},
{question:"Data leakage means?",options:["Missing data","Test info in training","Noise","Bias"],answer:"Test info in training"},
{question:"Pipeline prevents?",options:["Overfit","Leakage","Bias","Noise"],answer:"Leakage"},
{question:"Model drift occurs when?",options:["Data changes","UI changes","Epoch increases","Loss zero"],answer:"Data changes"},

/* ================= ADVANCED (76–100) ================= */
{question:"Concept drift relates to?",options:["UI","Data distribution","Epoch","Loss"],answer:"Data distribution"},
{question:"Online learning updates?",options:["Once","Continuously","Never","Batch only"],answer:"Continuously"},
{question:"Reinforcement learning optimizes?",options:["Loss","Reward","Accuracy","Bias"],answer:"Reward"},
{question:"Exploration vs exploitation tradeoff in?",options:["CNN","RL","SVM","NB"],answer:"RL"},
{question:"Q-learning is?",options:["Supervised","Unsupervised","Reinforcement","Clustering"],answer:"Reinforcement"},
{question:"Policy gradient optimizes?",options:["Loss","Policy directly","Tree","Distance"],answer:"Policy directly"},
{question:"Reward delayed problem in?",options:["CNN","RL","NB","Tree"],answer:"RL"},
{question:"Markov property means?",options:["Depends on past","Depends on current state","Future known","Static"],answer:"Depends on current state"},
{question:"GAN consists of?",options:["CNN+RNN","Generator+Discriminator","Tree+NB","RL+CNN"],answer:"Generator+Discriminator"},
{question:"GAN training goal?",options:["Min loss","Min-max game","Max accuracy","Min bias"],answer:"Min-max game"},
{question:"Mode collapse in GAN means?",options:["Perfect output","Limited diversity","Overfit","Underfit"],answer:"Limited diversity"},
{question:"Autoencoder used for?",options:["Classification","Compression","Clustering","Regression"],answer:"Compression"},
{question:"Variational autoencoder outputs?",options:["Single value","Distribution","Label","Cluster"],answer:"Distribution"},
{question:"Anomaly detection uses?",options:["Autoencoder","KNN","Tree","NB"],answer:"Autoencoder"},
{question:"Explainable AI focuses on?",options:["Accuracy","Transparency","Speed","UI"],answer:"Transparency"},
{question:"SHAP values explain?",options:["Model","Feature contribution","Loss","Epoch"],answer:"Feature contribution"},
{question:"LIME explains?",options:["Global","Local predictions","Dataset","UI"],answer:"Local predictions"},
{question:"Ethical AI concerns?",options:["Bias","Fairness","Privacy","All"],answer:"All"},
{question:"Federated learning keeps data?",options:["Centralized","Local","Deleted","Public"],answer:"Local"},
{question:"Edge AI runs on?",options:["Cloud","Devices","Servers","GPU only"],answer:"Devices"},
{question:"Model quantization reduces?",options:["Accuracy","Size","Bias","Loss"],answer:"Size"},
{question:"Pruning removes?",options:["Data","Weights","Epoch","Loss"],answer:"Weights"},
{question:"Inference means?",options:["Training","Prediction","Scaling","Testing"],answer:"Prediction"},
{question:"Latency matters most in?",options:["Training","Inference","Data prep","CV"],answer:"Inference"},
{question:"Production ML focuses on?",options:["Accuracy only","Scalability & reliability","UI","Design"],answer:"Scalability & reliability"},
{question:"MLOps combines?",options:["ML + UI","ML + DevOps","ML + CSS","ML + DB"],answer:"ML + DevOps"}

];



export default function AIMachineTest3() {
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
      const i = Math.floor(Math.random() * ALL_AI_ML_ADVANCED_QUESTIONS.length);
      if (!used.has(i)) {
        picked.push(ALL_AI_ML_ADVANCED_QUESTIONS[i]);
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
                    navigate("/certificate", { state: { type: "aiml2" , level : "advanced"} })
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
