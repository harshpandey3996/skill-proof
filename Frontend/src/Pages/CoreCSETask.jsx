import { motion } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function CoreCSETask() {
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
            Core Computer Science
          </motion.h1>

          <p className="text-gray-400 max-w-4xl">
            Strong fundamentals decide how far you can grow as a software engineer,
            system designer, or computer scientist.
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() =>
              navigate("/select-level", {
                state: { track: "cse" },
              })
            }
            className="mt-6 bg-green-500 text-black px-12 py-3 rounded-full font-semibold"
          >
            Start Core CSE Test
          </motion.button>
        </div>

        {/* ================= CONTENT (~1000vh) ================= */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-32 space-y-40">

          {/* SECTION 1 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Why Core Computer Science Matters
            </h2>
            <p className="text-gray-300 leading-loose">
              Core Computer Science subjects form the intellectual foundation of
              the entire software industry. Frameworks, programming languages,
              and tools evolve rapidly, but the principles behind them remain
              constant. Concepts such as memory management, process scheduling,
              networking protocols, and data organization are timeless.
              <br /><br />
              Engineers who master core subjects understand not only how to write
              code, but why systems behave the way they do. This depth of knowledge
              allows them to solve complex problems instead of relying on trial
              and error or surface-level debugging.
              <br /><br />
              Strong fundamentals separate average developers from exceptional
              engineers who can design scalable, reliable, and efficient systems.
            </p>
          </section>

          {/* SECTION 2 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Operating Systems (OS)
            </h2>
            <p className="text-gray-300 leading-loose">
              An operating system is the bridge between hardware and software.
              It manages processes, memory, storage, and hardware resources.
              Understanding OS concepts helps developers write efficient programs
              and debug system-level issues.
              <br /><br />
              Key topics include process scheduling, threads, concurrency,
              deadlocks, memory allocation, paging, segmentation, and file systems.
              These concepts explain how multiple applications run simultaneously
              without crashing the system.
              <br /><br />
              Knowledge of operating systems is essential for backend developers,
              system engineers, and anyone working with performance-critical
              applications.
            </p>
          </section>

          {/* SECTION 3 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Database Management Systems (DBMS)
            </h2>
            <p className="text-gray-300 leading-loose">
              DBMS deals with how data is stored, retrieved, and managed
              efficiently. Almost every application relies on databases, making
              DBMS knowledge critical for real-world software development.
              <br /><br />
              Topics such as normalization, indexing, transactions, ACID
              properties, concurrency control, and query optimization explain
              how databases maintain consistency and performance at scale.
              <br /><br />
              Engineers with DBMS knowledge design schemas that scale, avoid
              bottlenecks, and ensure data integrity even under heavy load.
            </p>
          </section>

          {/* SECTION 4 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Computer Networks (CN)
            </h2>
            <p className="text-gray-300 leading-loose">
              Computer networks explain how data moves across systems and
              geographical boundaries. Every web request, API call, and file
              transfer depends on networking principles.
              <br /><br />
              Core topics include OSI model, TCP/IP, routing, switching,
              congestion control, DNS, HTTP/HTTPS, and network security basics.
              <br /><br />
              Without networking fundamentals, debugging production issues such
              as latency, packet loss, or connectivity failures becomes guesswork.
            </p>
          </section>

          {/* SECTION 5 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Data Structures & Algorithms (DSA)
            </h2>
            <p className="text-gray-300 leading-loose">
              Data structures and algorithms teach problem-solving at scale.
              Choosing the right data structure directly affects performance,
              memory usage, and scalability.
              <br /><br />
              Arrays, linked lists, stacks, queues, trees, graphs, and hash tables
              are foundational tools. Algorithms such as searching, sorting,
              recursion, and dynamic programming build logical thinking.
              <br /><br />
              DSA is not just for interviews; it improves everyday coding quality
              and system efficiency.
            </p>
          </section>

          {/* SECTION 6 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Compiler Design & Programming Languages
            </h2>
            <p className="text-gray-300 leading-loose">
              Compiler design explains how high-level code is translated into
              machine instructions. Lexical analysis, parsing, semantic analysis,
              and optimization reveal how programming languages actually work.
              <br /><br />
              Understanding language design helps developers write better code,
              avoid undefined behavior, and learn new languages faster.
              <br /><br />
              This knowledge is especially useful for low-level programming,
              performance optimization, and language tooling.
            </p>
          </section>

          {/* SECTION 7 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Software Engineering Principles
            </h2>
            <p className="text-gray-300 leading-loose">
              Software engineering focuses on building maintainable, scalable,
              and reliable systems. Topics include design patterns, system design,
              version control, testing, and documentation.
              <br /><br />
              Good software engineering practices reduce bugs, improve team
              collaboration, and increase product longevity.
              <br /><br />
              Core CSE combined with engineering discipline creates professional,
              industry-ready developers.
            </p>
          </section>

          {/* SECTION 8 */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">
              Core CSE in Real-World Careers
            </h2>
            <p className="text-gray-300 leading-loose">
              Core computer science knowledge is required in roles such as
              backend engineer, systems engineer, data engineer, security analyst,
              and cloud architect.
              <br /><br />
              Companies value engineers who can reason about performance,
              reliabilityAystem reliability, scalability, and failure handling.
              These skills are rooted in core subjects, not frameworks.
              <br /><br />
              Skill-based assessments focus on fundamentals because strong roots
              create adaptable engineers who thrive in any technology stack.
            </p>
          </section>

        </div>
      </div>
      <Footer />
    </>
  );
}
