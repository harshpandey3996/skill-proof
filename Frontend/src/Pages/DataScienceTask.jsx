import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DataScienceTask() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="bg-black text-white">

        {/* ================= HERO (30vh) ================= */}
        <div className="h-[30vh] flex flex-col justify-center items-center text-center px-6 border-b border-gray-800">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Data Science
          </motion.h1>

          <p className="text-gray-400 max-w-4xl">
            Data science is the discipline of turning raw, unstructured data
            into meaningful insights that drive real-world decisions.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate("/select-level", {
                state: { track: "ds" },
              })
            }
            className="mt-6 bg-green-500 text-black px-12 py-3 rounded-full font-semibold"
          >
            Start Data Science Test
          </motion.button>
        </div>

        {/* ================= CONTENT (~1000vh) ================= */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-32 space-y-36">

          {/* SECTION 1 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              What is Data Science?
            </h2>
            <p className="text-gray-300 leading-loose">
              Data science is a multidisciplinary field that combines statistics,
              computer science, mathematics, and domain knowledge to extract
              actionable insights from data. In today’s digital world, every
              interaction generates data — from clicks on a website to financial
              transactions, sensor readings, social media activity, and medical
              records. Raw data by itself has no value unless it is processed,
              analyzed, and interpreted correctly.
              <br /><br />
              A data scientist’s job is not limited to running algorithms.
              They must ask the right questions, understand the business context,
              clean noisy datasets, identify patterns, and communicate results
              clearly to non-technical stakeholders. Many real-world datasets
              are incomplete, biased, or messy, and handling these imperfections
              is a critical skill.
              <br /><br />
              True data science is about decision-making under uncertainty.
              Models assist humans, but judgment, ethics, and domain understanding
              determine whether insights are actually useful or misleading.
            </p>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Data Collection & Data Cleaning
            </h2>
            <p className="text-gray-300 leading-loose">
              Data collection is the first and most crucial step in any data
              science project. Data can come from databases, APIs, logs,
              spreadsheets, sensors, surveys, or third-party sources.
              Unfortunately, real-world data is almost never clean.
              <br /><br />
              Data cleaning involves handling missing values, removing duplicates,
              correcting inconsistencies, detecting outliers, and ensuring data
              integrity. Poor data quality leads to incorrect models and false
              conclusions, no matter how advanced the algorithm is.
              <br /><br />
              Professional data scientists spend a significant portion of their
              time preparing data. This stage determines the reliability of
              every downstream analysis and model.
            </p>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Exploratory Data Analysis (EDA)
            </h2>
            <p className="text-gray-300 leading-loose">
              Exploratory Data Analysis is the process of understanding data
              through visualization and summary statistics. Before applying
              machine learning, data scientists explore distributions,
              correlations, trends, and anomalies.
              <br /><br />
              Visualization tools such as charts, plots, and dashboards help
              uncover hidden patterns that are not visible in raw tables.
              EDA also helps validate assumptions and guide feature selection.
              <br /><br />
              A strong EDA phase can reveal data leakage, bias, or unexpected
              relationships that significantly impact model performance.
            </p>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Statistics & Probability
            </h2>
            <p className="text-gray-300 leading-loose">
              Statistics is the backbone of data science. Concepts such as
              probability distributions, hypothesis testing, confidence intervals,
              and regression analysis allow data scientists to quantify uncertainty.
              <br /><br />
              Without statistical thinking, models can easily be misinterpreted.
              Correlation does not imply causation, and understanding this
              distinction prevents incorrect conclusions.
              <br /><br />
              Statistical reasoning ensures that insights are scientifically
              sound and not the result of random noise.
            </p>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Machine Learning in Data Science
            </h2>
            <p className="text-gray-300 leading-loose">
              Machine learning enables systems to learn patterns from data
              without explicit programming. In data science, ML is used for
              prediction, classification, clustering, and recommendation.
              <br /><br />
              Data scientists must understand model assumptions, bias-variance
              tradeoff, evaluation metrics, and overfitting. Blindly applying
              algorithms leads to unreliable results.
              <br /><br />
              Interpreting and validating models is just as important as training them.
            </p>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Tools & Programming
            </h2>
            <p className="text-gray-300 leading-loose">
              Python is the dominant language in data science due to its rich
              ecosystem of libraries such as NumPy, Pandas, Matplotlib,
              Seaborn, and Scikit-learn. SQL is essential for querying databases.
              <br /><br />
              Data scientists also use notebooks, version control, and
              visualization tools to collaborate and communicate findings.
              Tool mastery increases productivity but does not replace thinking.
            </p>
          </section>

          {/* SECTION 7 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Data Science as a Career
            </h2>
            <p className="text-gray-300 leading-loose">
              Data scientists work across industries including finance,
              healthcare, e-commerce, logistics, and technology. Their role
              is to turn data into competitive advantage.
              <br /><br />
              Companies value professionals who can explain insights clearly,
              build reproducible pipelines, and understand business impact —
              not just those who know algorithms.
              <br /><br />
              SkillProof evaluates data scientists on real analysis and clarity,
              not theoretical knowledge alone.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
