import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function WebDevTask() {
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
            Web Development
          </motion.h1>

          <p className="text-gray-400 max-w-3xl">
            Web Development is the complete process of designing, building,
            deploying, and maintaining modern web applications that work
            seamlessly across devices and users.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate("/select-level", {
                state: { track: "web" },
              })
            }

            className="mt-6 bg-green-500 text-black px-10 py-3 rounded-full font-semibold"
          >
            Start Web Dev Test
          </motion.button>
        </div>

        {/* ================= CONTENT ================= */}
        <div className="px-6 md:px-12 py-20 space-y-28 max-w-6xl mx-auto">

          <section>
            <h2 className="text-3xl font-semibold mb-6">
              What is Web Development?
            </h2>
            <p className="text-gray-300 leading-loose">
              Web development refers to the creation of applications that run
              on the internet. It involves multiple layers including the user
              interface, server-side logic, databases, APIs, and deployment.
              A complete web developer understands how data flows from the
              browser to the server and back again.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Frontend Development (Client Side)
            </h2>
            <p className="text-gray-300 leading-loose">
              Frontend development focuses on what users see and interact with.
              It includes building layouts, forms, dashboards, animations,
              and navigation systems using technologies like HTML, CSS,
              JavaScript, and modern frameworks such as React.
              A strong frontend ensures speed, accessibility, and usability.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Backend Development (Server Side)
            </h2>
            <p className="text-gray-300 leading-loose">
              Backend development handles the logic behind the scenes.
              It manages authentication, authorization, business rules,
              API responses, and communication with databases.
              Popular backend technologies include Node.js, Express,
              Django, Flask, and Java-based frameworks.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Databases & Data Management
            </h2>
            <p className="text-gray-300 leading-loose">
              Databases store application data securely and efficiently.
              Web applications commonly use SQL databases like MySQL
              and PostgreSQL, or NoSQL databases like MongoDB.
              A developer must understand data modeling, relationships,
              indexing, and performance optimization.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">
              APIs & Communication
            </h2>
            <p className="text-gray-300 leading-loose">
              APIs act as the bridge between frontend and backend.
              REST and GraphQL APIs allow applications to exchange data
              in a structured and secure manner.
              Proper API design ensures scalability and maintainability
              of large web systems.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Authentication & Security
            </h2>
            <p className="text-gray-300 leading-loose">
              Security is a critical part of web development.
              Authentication systems manage user identity using
              sessions, JWT tokens, or OAuth.
              Developers must protect applications from threats like
              SQL injection, XSS, CSRF, and unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Deployment & DevOps Basics
            </h2>
            <p className="text-gray-300 leading-loose">
              After development, applications are deployed to servers
              or cloud platforms like AWS, Vercel, or Netlify.
              Knowledge of CI/CD, environment variables,
              and monitoring helps ensure stable production systems.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Full Stack Development
            </h2>
            <p className="text-gray-300 leading-loose">
              Full stack developers understand frontend, backend,
              and databases together.
              They can design complete systems end-to-end,
              debug issues across layers, and build scalable applications
              from scratch.
            </p>
          </section>

          <section className="text-center">
            <h2 className="text-3xl font-semibold mb-4">
              Ready to Prove Your Web Development Skills?
            </h2>
            <p className="text-gray-400 mb-6">
              Build real applications. Understand real systems.
              Get tested. Get certified.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
