import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "datascience_test_progress";
const TEST_TIME = 10 * 60; // 10 minutes
const PASS_SCORE = 7;

export const ADVANCED_DS_QUESTIONS = [
  // ---------- ANSWER A (20) ----------
  { question: "Which algorithm reduces dimensionality linearly?", options: ["PCA","t-SNE","Autoencoder","LDA"], answer: "PCA" },
  { question: "Which activation function allows small negative outputs?", options: ["Leaky ReLU","ReLU","Sigmoid","Tanh"], answer: "Leaky ReLU" },
  { question: "Which regularization reduces overfitting in regression?", options: ["L1 Regularization","Dropout","Bagging","PCA"], answer: "L1 Regularization" },
  { question: "Which method handles imbalanced datasets?", options: ["SMOTE","Random Oversampling","Undersampling","Bagging"], answer: "SMOTE" },
  { question: "Which optimizer combines adaptive learning rate and momentum?", options: ["Nadam","SGD","Adagrad","RMSProp"], answer: "Nadam" },
  { question: "Which distance metric is commonly used in KNN?", options: ["Euclidean","Manhattan","Cosine","Hamming"], answer: "Euclidean" },
  { question: "Which technique prevents vanishing gradients in deep nets?", options: ["ReLU","Sigmoid","Tanh","Softmax"], answer: "ReLU" },
  { question: "Which method selects the most relevant features?", options: ["Feature Selection","PCA","One-Hot Encoding","Bagging"], answer: "Feature Selection" },
  { question: "Which loss function is used for regression?", options: ["MSE","Cross-Entropy","Hinge","KL Divergence"], answer: "MSE" },
  { question: "Which sampling technique reduces variance in trees?", options: ["Bootstrap","Stratified","Oversampling","Undersampling"], answer: "Bootstrap" },
  { question: "Which ensemble method combines sequential models?", options: ["Boosting","Bagging","Stacking","Random Forest"], answer: "Boosting" },
  { question: "Which method normalizes data?", options: ["StandardScaler","MinMaxScaler","One-Hot","PCA"], answer: "StandardScaler" },
  { question: "Which method splits dataset for evaluation?", options: ["Train/Test Split","Cross Validation","Bootstrap","Bagging"], answer: "Train/Test Split" },
  { question: "Which function converts outputs to probabilities?", options: ["Softmax","ReLU","Linear","Tanh"], answer: "Softmax" },
  { question: "Which technique detects outliers in data?", options: ["Isolation Forest","Z-Score","Bagging","Dropout"], answer: "Isolation Forest" },
  { question: "Which method prevents exploding gradients?", options: ["Gradient Clipping","BatchNorm","Dropout","Bagging"], answer: "Gradient Clipping" },
  { question: "Which distance metric accounts for covariance?", options: ["Mahalanobis","Euclidean","Manhattan","Cosine"], answer: "Mahalanobis" },
  { question: "Which technique is used for feature extraction from text?", options: ["TF-IDF","Word2Vec","Bagging","Dropout"], answer: "TF-IDF" },
  { question: "Which activation function is used in output layer for regression?", options: ["Linear","Sigmoid","Softmax","Tanh"], answer: "Linear" },
  { question: "Which method reduces correlation among features?", options: ["PCA","Feature Scaling","One-Hot Encoding","Bagging"], answer: "PCA" },

  // ---------- ANSWER B (25) ----------
  { question: "Which library is used for ML in Python?", options: ["React","Scikit-learn","NumPy","Pandas"], answer: "Scikit-learn" },
  { question: "Which loss function is used for multi-class classification?", options: ["MSE","Categorical Cross-Entropy","Hinge","RMSE"], answer: "Categorical Cross-Entropy" },
  { question: "Which method evaluates classification models?", options: ["Accuracy","Confusion Matrix","MSE","RMSE"], answer: "Confusion Matrix" },
  { question: "Which technique handles ordinal categorical features?", options: ["Ordinal Encoding","One-Hot Encoding","Bagging","PCA"], answer: "Ordinal Encoding" },
  { question: "Which metric is preferred for imbalanced datasets?", options: ["Accuracy","F1 Score","MSE","RMSE"], answer: "F1 Score" },
  { question: "Which method estimates causal effects from observational data?", options: ["Random Forest","Propensity Score","Bagging","PCA"], answer: "Propensity Score" },
  { question: "Which ensemble combines different model types?", options: ["Boosting","Stacking","Bagging","Random Forest"], answer: "Stacking" },
  { question: "Which optimizer adapts learning rate per parameter?", options: ["SGD","Adam","Adagrad","RMSProp"], answer: "Adam" },
  { question: "Which method handles missing data?", options: ["Dropout","Imputation","Bagging","PCA"], answer: "Imputation" },
  { question: "Which metric measures clustering quality?", options: ["Accuracy","Silhouette Score","RMSE","MSE"], answer: "Silhouette Score" },
  { question: "Which method reduces dimensionality non-linearly?", options: ["PCA","t-SNE","LDA","StandardScaler"], answer: "t-SNE" },
  { question: "Which method balances bias and variance?", options: ["Dropout","Regularization","Bagging","Stacking"], answer: "Regularization" },
  { question: "Which ensemble reduces model variance?", options: ["Boosting","Bagging","Stacking","Random Forest"], answer: "Bagging" },
  { question: "Which method encodes target labels for multi-class?", options: ["Label Encoding","One-Hot","Bagging","Dropout"], answer: "Label Encoding" },
  { question: "Which method splits data for time series?", options: ["K-Fold","Time Series Split","Random Split","Bootstrap"], answer: "Time Series Split" },
  { question: "Which metric evaluates ranking predictions?", options: ["Accuracy","NDCG","MSE","Silhouette"], answer: "NDCG" },
  { question: "Which technique evaluates regression residuals?", options: ["Accuracy","RMSE","F1","Silhouette"], answer: "RMSE" },
  { question: "Which method detects concept drift?", options: ["Bagging","Drift Detection","Boosting","PCA"], answer: "Drift Detection" },
  { question: "Which metric evaluates multi-label classification?", options: ["Accuracy","Hamming Loss","MSE","RMSE"], answer: "Hamming Loss" },
  { question: "Which method extracts word embeddings?", options: ["TF-IDF","Word2Vec","Bagging","Dropout"], answer: "Word2Vec" },
  { question: "Which method initializes embedding vectors?", options: ["Random","Glove","Bagging","PCA"], answer: "Glove" },
  { question: "Which metric balances precision and recall?", options: ["Accuracy","F1 Score","MSE","RMSE"], answer: "F1 Score" },
  { question: "Which technique evaluates model uncertainty?", options: ["Dropout","Bayesian Methods","Bagging","PCA"], answer: "Bayesian Methods" },
  { question: "Which ensemble improves weak learners sequentially?", options: ["Bagging","Boosting","Stacking","Random Forest"], answer: "Boosting" },

  // ---------- ANSWER C (30) ----------
  { question: "Which neural network is suitable for images?", options: ["RNN","SVM","KNN","CNN"], answer: "CNN" },
  { question: "Which model avoids local minima using adaptive optimizer?", options: ["SGD","Momentum","Adam Optimizer","Bagging"], answer: "Adam Optimizer" },
  { question: "Which activation is used in RNN?", options: ["ReLU","Linear","Tanh","Softmax"], answer: "Tanh" },
  { question: "Which method prevents overfitting in decision trees?", options: ["Bagging","Boosting","Pruning","Dropout"], answer: "Pruning" },
  { question: "Which CNN layer extracts features?", options: ["Pooling","Dense","Convolution","Flatten"], answer: "Convolution" },
  { question: "Which normalization accelerates training?", options: ["StandardScaler","Batch Normalization","Layer Norm","Dropout"], answer: "Batch Normalization" },
  { question: "Which function converts logits to probabilities?", options: ["ReLU","Sigmoid","Softmax","Tanh"], answer: "Softmax" },
  { question: "Which optimizer is second-order?", options: ["Adam","SGD","Newton's Method","RMSProp"], answer: "Newton's Method" },
  { question: "Which autoencoder reduces dimensions?", options: ["PCA","t-SNE","Autoencoder","LDA"], answer: "Autoencoder" },
  { question: "Which loss is used for GAN generator?", options: ["MSE","Cross-Entropy","Adversarial Loss","KL Divergence"], answer: "Adversarial Loss" },
  { question: "Which metric evaluates regression error?", options: ["Accuracy","F1","RMSE","Silhouette"], answer: "RMSE" },
  { question: "Which model uses attention mechanism?", options: ["CNN","RNN","Transformer","KNN"], answer: "Transformer" },
  { question: "Which technique augments images for training?", options: ["Scaling","Normalization","Rotation and Flip","PCA"], answer: "Rotation and Flip" },
  { question: "Which metric evaluates segmentation?", options: ["Accuracy","RMSE","IoU","MSE"], answer: "IoU" },
  { question: "Which layer reduces spatial size in CNN?", options: ["Convolution","Dense","Pooling","Dropout"], answer: "Pooling" },
  { question: "Which technique prevents mode collapse in GAN?", options: ["Dropout","Bagging","Mini-batch Discrimination","Boosting"], answer: "Mini-batch Discrimination" },
  { question: "Which optimizer corrects sparse gradients?", options: ["SGD","Adam","Adagrad","RMSProp"], answer: "Adagrad" },
  { question: "Which method initializes neural network weights?", options: ["PCA","Dropout","He Initialization","Bagging"], answer: "He Initialization" },
  { question: "Which method extracts features from sequential data?", options: ["2D Convolution","Pooling","1D Convolution","Dense"], answer: "1D Convolution" },
  { question: "Which model captures long-term dependencies?", options: ["RNN","CNN","LSTM","KNN"], answer: "LSTM" },
  { question: "Which metric evaluates multi-class classification?", options: ["Accuracy","RMSE","Cross-Entropy Loss","MSE"], answer: "Cross-Entropy Loss" },
  { question: "Which function measures similarity between embeddings?", options: ["Euclidean","Manhattan","Cosine Similarity","Hamming"], answer: "Cosine Similarity" },
  { question: "Which technique reduces noise in images?", options: ["PCA","Dropout","Gaussian Blur","Normalization"], answer: "Gaussian Blur" },
  { question: "Which optimizer prevents vanishing gradients in RNN?", options: ["RNN","GRU","LSTM","CNN"], answer: "LSTM" },
  { question: "Which metric evaluates text summarization?", options: ["Accuracy","F1","ROUGE","MSE"], answer: "ROUGE" },
  { question: "Which embedding represents words?", options: ["Bagging","PCA","Word2Vec","Dropout"], answer: "Word2Vec" },
  { question: "Which technique stabilizes GAN training?", options: ["Dropout","Bagging","Label Smoothing","Boosting"], answer: "Label Smoothing" },
  { question: "Which layer in GAN generator?", options: ["Pooling","Flatten","Dense Layer","Convolution"], answer: "Dense Layer" },
  { question: "Which metric evaluates multi-label classification?", options: ["MSE","Hamming Loss","Accuracy","RMSE"], answer: "Hamming Loss" },
  { question: "Which method extracts embeddings from text?", options: ["PCA","LDA","Word Embedding","Bagging"], answer: "Word Embedding" },
  { question: "Which method evaluates calibration of models?", options: ["Confusion Matrix","MSE","Calibration Curve","RMSE"], answer: "Calibration Curve" },
  { question: "Which method reduces variance in ensemble?", options: ["Boosting","Stacking","Bagging","Random Forest"], answer: "Bagging" },

  // ---------- ANSWER D (25) ----------
  { question: "Which layer is NOT used in CNN?", options: ["Flatten","Dense","Convolution","Navbar"], answer: "Navbar" },
  { question: "Which data type is NOT numeric?", options: ["Integer","Float","Text","Double"], answer: "Text" },
  { question: "Which function is NOT used in pandas?", options: ["head()","info()","read_csv()","render()"], answer: "render()" },
  { question: "Which optimizer is NOT adaptive?", options: ["SGD","Adam","Adagrad","Nadam"], answer: "SGD" },
  { question: "Which activation is saturating?", options: ["Sigmoid","ReLU","Leaky ReLU","Softmax"], answer: "Sigmoid" },
  { question: "Which layer in GAN is NOT used?", options: ["Dense","Pooling","Flatten","Navbar"], answer: "Navbar" },
  { question: "Which metric is NOT for regression?", options: ["RMSE","MAE","Accuracy","MSE"], answer: "Accuracy" },
  { question: "Which function is NOT used in ML preprocessing?", options: ["Scaling","Encoding","Bagging","Normalization"], answer: "Bagging" },
  { question: "Which optimizer is second order?", options: ["Newton's Method","Adam","SGD","RMSProp"], answer: "Newton's Method" },
  { question: "Which technique is NOT for dimensionality reduction?", options: ["PCA","t-SNE","Bagging","LDA"], answer: "Bagging" },
  { question: "Which loss function is NOT used in classification?", options: ["MSE","Cross-Entropy","Hinge","KL Divergence"], answer: "MSE" },
  { question: "Which metric does NOT evaluate clustering?", options: ["Silhouette","Accuracy","Davies-Bouldin","Calinski-Harabasz"], answer: "Accuracy" },
  { question: "Which method does NOT prevent overfitting?", options: ["Bagging","Dropout","Boosting","PCA"], answer: "PCA" },
  { question: "Which layer does NOT reduce dimensions in CNN?", options: ["Pooling","Convolution","Dense","Flatten"], answer: "Dense" },
  { question: "Which function does NOT compute similarity?", options: ["Cosine Similarity","Euclidean","Manhattan","Bagging"], answer: "Bagging" },
  { question: "Which embedding method is NOT word representation?", options: ["Word2Vec","Glove","PCA","FastText"], answer: "PCA" },
  { question: "Which technique is NOT used for GAN stabilization?", options: ["Bagging","Label Smoothing","Mini-batch Discrimination","Dropout"], answer: "Bagging" },
  { question: "Which method is NOT used for NLP feature extraction?", options: ["Bagging","TF-IDF","Word Embedding","CountVectorizer"], answer: "Bagging" },
  { question: "Which metric is NOT used in multi-label evaluation?", options: ["MSE","Hamming Loss","Precision","Recall"], answer: "MSE" },
  { question: "Which method is NOT used for time series split?", options: ["Random Split","Time Series Split","K-Fold","Bootstrap"], answer: "Random Split" },
  { question: "Which function is NOT used to prevent vanishing gradient?", options: ["Sigmoid","ReLU","LSTM","GRU"], answer: "Sigmoid" },
  { question: "Which layer in CNN is NOT trainable?", options: ["Pooling","Convolution","Dense","Flatten"], answer: "Pooling" },
  { question: "Which optimizer is NOT adaptive momentum based?", options: ["SGD","Adam","RMSProp","Nadam"], answer: "SGD" },
  { question: "Which activation is NOT commonly used in output layer?", options: ["Leaky ReLU","Softmax","Sigmoid","Linear"], answer: "Leaky ReLU" },
  { question: "Which metric does NOT evaluate segmentation?", options: ["Accuracy","IoU","Dice Coefficient","F1 Score"], answer: "Accuracy" }
];


export default function DataScienceTest3() {
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
      const i = Math.floor(Math.random() * ADVANCED_DS_QUESTIONS.length);
      if (!usedIndexes.has(i)) {
        picked.push(ADVANCED_DS_QUESTIONS[i]);
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
                      state: { type: "datascience", level : "advanced" },
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
