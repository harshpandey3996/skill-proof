import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MLTask() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg-black text-white">

        {/* ================= HERO ================= */}
        <div className="h-[30vh] flex flex-col justify-center items-center text-center px-6 border-b border-gray-800">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Artificial Intelligence & Machine Learning
          </motion.h1>

          <p className="text-gray-400 max-w-3xl">
            Machine Learning is not magic. It is applied mathematics,
            statistics, and engineering working together.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate("/select-level", {
                state: { track: "ml" },
              })
            }

            className="mt-6 bg-green-500 text-black px-10 py-3 rounded-full font-semibold"
          >
            Start ML Test
          </motion.button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 space-y-28">

          {/* INTRO */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Understanding Machine Learning
            </h2>
            <p className="text-gray-300 leading-loose">
              Machine Learning is a subset of Artificial Intelligence that focuses
              on building systems capable of learning patterns from data instead
              of relying on explicitly programmed rules. At its core, ML is about
              using historical data to make predictions, classifications, or
              decisions about unseen data.
              <br /><br />
              Unlike traditional software systems where logic is hard-coded,
              machine learning models learn relationships directly from examples.
              This shift allows systems to adapt, improve, and scale in ways that
              were previously impossible. From recommendation engines and fraud
              detection to medical diagnosis and self-driving cars, ML powers
              modern intelligent systems.
            </p>
          </section>

          {/* TYPES */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Types of Machine Learning
            </h2>
            <p className="text-gray-300 leading-loose">
              Machine learning is broadly divided into supervised, unsupervised,
              and reinforcement learning. Supervised learning uses labeled data
              to train models for classification and regression tasks. Examples
              include predicting house prices or detecting spam emails.
              <br /><br />
              Unsupervised learning works with unlabeled data to discover hidden
              structures such as clusters or associations. Reinforcement learning
              focuses on learning through rewards and penalties, commonly used in
              robotics and game-playing agents.
            </p>

            <ul className="list-disc list-inside text-gray-400 mt-6 space-y-2">
              <li>Supervised Learning (Classification, Regression)</li>
              <li>Unsupervised Learning (Clustering, Dimensionality Reduction)</li>
              <li>Reinforcement Learning (Agent-based learning)</li>
            </ul>
          </section>

          {/* DATA */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Data: The Fuel of ML
            </h2>
            <p className="text-gray-300 leading-loose">
              Data quality directly determines model performance. A machine
              learning model is only as good as the data it is trained on.
              Cleaning, preprocessing, and understanding data is often more
              time-consuming than training the model itself.
              <br /><br />
              ML engineers spend a significant portion of their time handling
              missing values, outliers, feature scaling, and encoding categorical
              variables. These steps ensure that algorithms can learn effectively
              without being misled by noise or bias.
            </p>
          </section>

          {/* ALGORITHMS */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              ML Algorithms & Models
            </h2>
            <p className="text-gray-300 leading-loose">
              Machine learning algorithms include linear regression, logistic
              regression, decision trees, random forests, support vector machines,
              k-nearest neighbors, and neural networks. Each algorithm has strengths
              and weaknesses depending on the problem and data characteristics.
              <br /><br />
              Choosing the right model requires understanding bias-variance tradeoff,
              interpretability, computational cost, and scalability.
            </p>
          </section>

          {/* EVALUATION */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Model Evaluation & Metrics
            </h2>
            <p className="text-gray-300 leading-loose">
              Training a model is only half the work. Evaluating performance is
              critical to ensure real-world reliability. Accuracy alone is often
              misleading, especially with imbalanced datasets.
              <br /><br />
              Metrics such as precision, recall, F1-score, ROC-AUC, and confusion
              matrices provide deeper insight into how models behave under
              different conditions.
            </p>
          </section>

          {/* TOOLS */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Tools & Libraries
            </h2>
            <p className="text-gray-300 leading-loose">
              Python dominates the ML ecosystem due to libraries like NumPy,
              Pandas, Matplotlib, Scikit-learn, TensorFlow, and PyTorch. These
              tools allow rapid experimentation and production deployment.
              <br /><br />
              Understanding tooling is essential for reproducibility, collaboration,
              and scaling ML systems.
            </p>
          </section>

          {/* CAREER */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              ML as a Career
            </h2>
            <p className="text-gray-300 leading-loose">
              Careers in machine learning include roles such as Data Scientist,
              ML Engineer, Research Scientist, and AI Engineer. Employers value
              candidates who can explain models clearly, justify decisions, and
              apply ML responsibly.
              <br /><br />
              SkillProof evaluates ML talent based on understanding, execution,
              and clarity — not buzzwords or certificates.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
