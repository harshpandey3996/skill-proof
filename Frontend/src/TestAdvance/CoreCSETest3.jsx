import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "core_security_test_progress";
const TEST_TIME = 10 * 60;
const PASS_SCORE = 7;

/* ================= QUESTIONS SAME ================= */

export const ALL_ADVANCED_QUESTIONS = [
  /* 1 */ { question: "What is the worst-case complexity of QuickSort?", options: ["O(n^2)", "O(n log n)", "O(n)", "O(log n)"], answer: "O(n^2" }, // A
  /* 2 */ { question: "Which algorithm is used for finding shortest path in a weighted graph?", options: ["DFS", "Dijkstra", "BFS", "Prim"], answer: "Dijkstra" }, // B
  /* 3 */ { question: "Which data structure allows O(1) access by key?", options: ["Array", "Hash Table", "Linked List", "Stack"], answer: "Hash Table" }, // C
  /* 4 */ { question: "What is the purpose of deadlock detection in OS?", options: ["Speed up CPU", "Prevent resource starvation", "Increase memory", "Debug code"], answer: "Prevent resource starvation" }, // D
  /* 5 */ { question: "Which scheduling algorithm is preemptive?", options: ["FCFS", "Round Robin", "SJF Non-preemptive", "Priority Non-preemptive"], answer: "Round Robin" }, // A
  /* 6 */ { question: "In a B+ tree of order m, what is the maximum number of children a node can have?", options: ["m-1", "m", "2m", "2m-1"], answer: "m" }, // B
  /* 7 */ { question: "Which normal form removes transitive dependency?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: "3NF" }, // C
  /* 8 */ { question: "Which protocol is connectionless?", options: ["TCP", "UDP", "FTP", "HTTP"], answer: "UDP" }, // D
  /* 9 */ { question: "Which of the following is a non-blocking synchronization mechanism?", options: ["Mutex", "Spinlock", "Semaphore", "Barrier"], answer: "Spinlock" }, // A
  /* 10 */ { question: "What is the main purpose of virtual memory?", options: ["Memory abstraction", "Increase CPU speed", "Faster I/O", "Disk compression"], answer: "Memory abstraction" }, // B
  /* 11 */ { question: "Which algorithm is used in minimum spanning tree?", options: ["Dijkstra", "Kruskal", "Bellman-Ford", "Floyd-Warshall"], answer: "Kruskal" }, // C
  /* 12 */ { question: "Which data structure is best for implementing LRU cache?", options: ["Stack", "Queue", "Heap", "Doubly Linked List + HashMap"], answer: "Doubly Linked List + HashMap" }, // D
  /* 13 */ { question: "What does 'mutex' ensure in OS?", options: ["Mutual exclusion", "Faster execution", "Memory protection", "File locking"], answer: "Mutual exclusion" }, // A
  /* 14 */ { question: "Which consistency model allows maximum concurrency in DB?", options: ["Strong consistency", "Eventual consistency", "Sequential consistency", "Causal consistency"], answer: "Eventual consistency" }, // B
  /* 15 */ { question: "Which is a divide-and-conquer algorithm?", options: ["Insertion Sort", "Bubble Sort", "Linear Search", "MergeSort"], answer: "MergeSort" }, // C
  /* 16 */ { question: "Which of the following is true for AVL tree?", options: ["Order-balanced", "Height-balanced", "Value-balanced", "Color-balanced"], answer: "Height-balanced" }, // D
  /* 17 */ { question: "Which protocol is used for sending emails?", options: ["FTP", "HTTP", "SMTP", "POP3"], answer: "SMTP" }, // A
  /* 18 */ { question: "Which locking protocol prevents deadlocks?", options: ["SJF", "FCFS", "2PL (Two-phase locking)", "Round Robin"], answer: "2PL (Two-phase locking)" }, // B
  /* 19 */ { question: "Which traversal is used in expression tree to get postfix?", options: ["Preorder", "Level order", "Inorder", "Postorder"], answer: "Postorder" }, // C
  /* 20 */ { question: "Which data structure is used in recursion?", options: ["Queue", "Stack", "Heap", "Tree"], answer: "Stack" }, // D
  /* 21 */ { question: "Which of the following is a stable sorting algorithm?", options: ["Quick Sort", "Heap Sort", "Selection Sort", "Merge Sort"], answer: "Merge Sort" }, // A
  /* 22 */ { question: "Which page replacement algorithm approximates LRU?", options: ["FIFO", "LRU Clock", "Optimal", "Random"], answer: "LRU Clock" }, // B
  /* 23 */ { question: "What is the main disadvantage of linked list over array?", options: ["Insertion is complex", "Random access is slow", "Deletion is impossible", "Consumes more memory"], answer: "Random access is slow" }, // C
  /* 24 */ { question: "Which hash collision resolution method uses probing?", options: ["Separate chaining", "Open addressing", "Chaining", "Double hashing"], answer: "Open addressing" }, // D
  /* 25 */ { question: "Which scheduling algorithm minimizes average waiting time?", options: ["Round Robin", "SJF", "FCFS", "Priority"], answer: "SJF" }, // A
  /* 26 */ { question: "Which protocol ensures reliable data transfer?", options: ["TCP", "UDP", "IP", "ICMP"], answer: "TCP" }, // B
  /* 27 */ { question: "Which data structure is used in BFS?", options: ["Stack", "Heap", "Queue", "Linked List"], answer: "Queue" }, // C
  /* 28 */ { question: "Which data structure is used in DFS?", options: ["Queue", "Heap", "Stack", "Array"], answer: "Stack" }, // D
  /* 29 */ { question: "Which technique is used in compiler for syntax analysis?", options: ["Lexical analysis", "Code generation", "Parsing", "Optimization"], answer: "Parsing" }, // A
  /* 30 */ { question: "Which of the following is a greedy algorithm?", options: ["Merge Sort", "Binary Search", "DFS", "Prim's MST"], answer: "Prim's MST" }, // B
  /* 31 */ { question: "Which protocol is used for file transfer?", options: ["FTP", "HTTP", "SMTP", "POP3"], answer: "FTP" }, // C
  /* 32 */ { question: "Which sorting algorithm is in-place?", options: ["Merge Sort", "Heap Sort", "Quick Sort", "Radix Sort"], answer: "Quick Sort" }, // D
  /* 33 */ { question: "Which OS concept prevents race condition?", options: ["Mutex", "Semaphore", "Thread", "Process"], answer: "Mutex" }, // A
  /* 34 */ { question: "Which data structure is used for priority queue?", options: ["Queue", "Stack", "Heap", "Linked List"], answer: "Heap" }, // B
  /* 35 */ { question: "Which is a strongly typed language?", options: ["C", "Python", "Java", "JavaScript"], answer: "Java" }, // C
  /* 36 */ { question: "Which graph traversal uses a queue?", options: ["DFS", "BFS", "Topological", "Prim"], answer: "BFS" }, // D
  /* 37 */ { question: "Which algorithm is used for cycle detection in graph?", options: ["DFS", "BFS", "Dijkstra", "Kruskal"], answer: "DFS" }, // A
  /* 38 */ { question: "Which memory allocation is dynamic?", options: ["Static", "Heap", "Stack", "Register"], answer: "Heap" }, // B
  /* 39 */ { question: "Which file system supports journaling?", options: ["FAT32", "NTFS", "EXT4", "exFAT"], answer: "EXT4" }, // C
  /* 40 */ { question: "Which is NOT a database constraint?", options: ["Primary key", "Foreign key", "Check", "Compile-time"], answer: "Compile-time" }, // D
  /* 41 */ { question: "Which data structure is used in undo operation?", options: ["Queue", "Stack", "Linked List", "Array"], answer: "Stack" }, // A
  /* 42 */ { question: "Which search algorithm is used in AI pathfinding?", options: ["DFS", "BFS", "A*", "Greedy"], answer: "A*" }, // B
  /* 43 */ { question: "Which protocol is used in VoIP?", options: ["TCP", "UDP", "SIP", "HTTP"], answer: "SIP" }, // C
  /* 44 */ { question: "Which process scheduling uses priority?", options: ["Round Robin", "FCFS", "Priority", "SJF"], answer: "Priority" }, // D
  /* 45 */ { question: "Which algorithm finds strongly connected components?", options: ["Kruskal", "Tarjan", "Dijkstra", "Prim"], answer: "Tarjan" }, // A
  /* 46 */ { question: "Which is NOT a linear data structure?", options: ["Array", "Linked List", "Stack", "Graph"], answer: "Graph" }, // B
  /* 47 */ { question: "Which caching technique is used in CPU?", options: ["Write-back", "Write-through", "LRU", "All of the above"], answer: "All of the above" }, // C
  /* 48 */ { question: "Which is NOT a cloud deployment model?", options: ["Public", "Private", "Hybrid", "LAN"], answer: "LAN" }, // D
  /* 49 */ { question: "Which algorithm finds minimum spanning tree?", options: ["DFS", "Prim", "Dijkstra", "Bellman-Ford"], answer: "Prim" }, // A
  /* 50 */ { question: "Which scheduling uses round-robin?", options: ["FCFS", "Round Robin", "SJF", "Priority"], answer: "Round Robin" }, // B
  /* 51 */ { question: "Which algorithm is used for topological sort?", options: ["DFS", "BFS", "Kruskal", "Prim"], answer: "DFS" }, // C
  /* 52 */ { question: "Which is used for memory protection in OS?", options: ["Segmentation", "Compilation", "Linking", "Caching"], answer: "Segmentation" }, // D
  /* 53 */ { question: "Which data structure is used in BFS?", options: ["Stack", "Queue", "Heap", "Tree"], answer: "Queue" }, // A
  /* 54 */ { question: "Which protocol is secure for web browsing?", options: ["HTTP", "HTTPS", "FTP", "SMTP"], answer: "HTTPS" }, // B
  /* 55 */ { question: "Which technique is used in process synchronization?", options: ["Semaphore", "Compilation", "Parsing", "Linking"], answer: "Semaphore" }, // C
  /* 56 */ { question: "Which algorithm finds shortest path in unweighted graph?", options: ["DFS", "BFS", "Dijkstra", "Bellman-Ford"], answer: "BFS" }, // D
  /* 57 */ { question: "Which is a non-preemptive scheduling algorithm?", options: ["FCFS", "Round Robin", "SJF Preemptive", "Priority Preemptive"], answer: "FCFS" }, // A
  /* 58 */ { question: "Which data structure is used in LRU cache?", options: ["Stack", "Queue", "Hash Map + DLL", "Array"], answer: "Hash Map + DLL" }, // B
  /* 59 */ { question: "Which is a divide-and-conquer algorithm?", options: ["MergeSort", "Linear Search", "BFS", "DFS"], answer: "MergeSort" }, // C
  /* 60 */ { question: "Which type of database normal form eliminates redundancy?", options: ["1NF", "2NF", "3NF", "BCNF"], answer: "3NF" }, // D
  /* 61 */ { question: "Which graph algorithm uses priority queue?", options: ["DFS", "BFS", "Dijkstra", "Bellman-Ford"], answer: "Dijkstra" }, // A
  /* 62 */ { question: "Which is NOT a semaphore type?", options: ["Binary", "Counting", "Mutex", "Threaded"], answer: "Threaded" }, // B
  /* 63 */ { question: "Which scheduling algorithm minimizes average waiting time?", options: ["FCFS", "Round Robin", "SJF", "Priority"], answer: "SJF" }, // C
  /* 64 */ { question: "Which memory allocation is dynamic?", options: ["Static", "Heap", "Stack", "Register"], answer: "Heap" }, // D
  /* 65 */ { question: "Which data structure is used in recursion?", options: ["Queue", "Stack", "Heap", "Linked List"], answer: "Stack" }, // A
  /* 66 */ { question: "Which is a stable sorting algorithm?", options: ["Quick Sort", "Heap Sort", "Selection Sort", "Merge Sort"], answer: "Merge Sort" }, // B
  /* 67 */ { question: "Which protocol is used for email retrieval?", options: ["SMTP", "POP3", "FTP", "HTTP"], answer: "POP3" }, // C
  /* 68 */ { question: "Which algorithm is used for cycle detection in graph?", options: ["DFS", "BFS", "Kruskal", "Prim"], answer: "DFS" }, // D
  /* 69 */ { question: "Which file system supports journaling?", options: ["FAT32", "NTFS", "EXT4", "exFAT"], answer: "EXT4" }, // A
  /* 70 */ { question: "Which data structure is best for implementing a stack?", options: ["Queue", "Array", "Heap", "Linked List"], answer: "Array" }, // B
  /* 71 */ { question: "Which scheduling algorithm is preemptive?", options: ["FCFS", "Round Robin", "SJF Non-preemptive", "Priority Non-preemptive"], answer: "Round Robin" }, // C
  /* 72 */ { question: "Which is NOT a graph traversal?", options: ["DFS", "BFS", "Topological", "HeapSort"], answer: "HeapSort" }, // D
  /* 73 */ { question: "Which caching technique is write-back?", options: ["Write-back", "Write-through", "LRU", "FIFO"], answer: "Write-back" }, // A
  /* 74 */ { question: "Which is NOT a CPU scheduling algorithm?", options: ["FCFS", "SJF", "Round Robin", "Prim"], answer: "Prim" }, // B
  /* 75 */ { question: "Which is used in deadlock prevention?", options: ["Banker's algorithm", "Dijkstra", "Prim", "Kruskal"], answer: "Banker's algorithm" }, // C
  /* 76 */ { question: "Which data structure supports dynamic memory allocation?", options: ["Array", "Stack", "Heap", "Queue"], answer: "Heap" }, // D
  /* 77 */ { question: "Which algorithm is used in minimum spanning tree?", options: ["Prim", "DFS", "BFS", "Dijkstra"], answer: "Prim" }, // A
  /* 78 */ { question: "Which is a strongly connected component algorithm?", options: ["Tarjan", "Kruskal", "Prim", "Bellman-Ford"], answer: "Tarjan" }, // B
  /* 79 */ { question: "Which is NOT a linear data structure?", options: ["Array", "Stack", "Queue", "Graph"], answer: "Graph" }, // C
  /* 80 */ { question: "Which OS concept handles deadlock?", options: ["Process", "Thread", "Resource Allocation Graph", "Memory Management"], answer: "Resource Allocation Graph" }, // D
  /* 81 */ { question: "Which is used for shortest path in weighted graph?", options: ["DFS", "BFS", "Dijkstra", "Bellman-Ford"], answer: "Dijkstra" }, // A
  /* 82 */ { question: "Which scheduling algorithm is fair?", options: ["Priority", "FCFS", "Round Robin", "SJF"], answer: "Round Robin" }, // B
  /* 83 */ { question: "Which data structure is used for adjacency list?", options: ["Array", "Queue", "Linked List", "Heap"], answer: "Linked List" }, // C
  /* 84 */ { question: "Which is a preemptive priority scheduling?", options: ["SJF Non-preemptive", "Round Robin", "Priority Preemptive", "FCFS"], answer: "Priority Preemptive" }, // D
  /* 85 */ { question: "Which algorithm is used for topological sorting?", options: ["DFS", "BFS", "Kruskal", "Prim"], answer: "DFS" }, // A
  /* 86 */ { question: "Which technique ensures mutual exclusion?", options: ["Mutex", "Semaphore", "Both", "None"], answer: "Both" }, // B
  /* 87 */ { question: "Which is dynamic hashing method?", options: ["Extendible", "Linear", "Separate chaining", "Open addressing"], answer: "Extendible" }, // C
  /* 88 */ { question: "Which algorithm solves 0/1 Knapsack?", options: ["Greedy", "Dynamic Programming", "Divide and Conquer", "Backtracking"], answer: "Dynamic Programming" }, // D
  /* 89 */ { question: "Which is a greedy algorithm?", options: ["Prim", "DFS", "BFS", "MergeSort"], answer: "Prim" }, // A
  /* 90 */ { question: "Which scheduling algorithm prevents starvation?", options: ["FCFS", "SJF", "Priority with aging", "Round Robin"], answer: "Priority with aging" }, // B
  /* 91 */ { question: "Which search is used in AI pathfinding?", options: ["DFS", "BFS", "A*", "Greedy"], answer: "A*" }, // C
  /* 92 */ { question: "Which memory type is volatile?", options: ["ROM", "RAM", "EEPROM", "Flash"], answer: "RAM" }, // D
  /* 93 */ { question: "Which algorithm is used for network flow?", options: ["Dijkstra", "Ford-Fulkerson", "Prim", "Kruskal"], answer: "Ford-Fulkerson" }, // A
  /* 94 */ { question: "Which scheduling algorithm is non-preemptive?", options: ["FCFS", "Round Robin", "SJF Preemptive", "Priority Preemptive"], answer: "FCFS" }, // B
  /* 95 */ { question: "Which data structure is used for compiler symbol table?", options: ["Stack", "Queue", "Hash Table", "Linked List"], answer: "Hash Table" }, // C
  /* 96 */ { question: "Which algorithm is used in deadlock detection?", options: ["Banker's", "Dijkstra", "Prim", "DFS"], answer: "Banker's" }, // D
  /* 97 */ { question: "Which is a balanced binary search tree?", options: ["AVL", "Linked List", "Stack", "Queue"], answer: "AVL" }, // A
  /* 98 */ { question: "Which scheduling algorithm handles real-time tasks?", options: ["FCFS", "SJF", "Rate Monotonic", "Round Robin"], answer: "Rate Monotonic" }, // B
  /* 99 */ { question: "Which graph algorithm finds articulation points?", options: ["DFS", "BFS", "Tarjan", "Prim"], answer: "Tarjan" }, // C
  /* 100 */ { question: "Which memory management technique is used in OS?", options: ["Paging", "Segmentation", "Demand Paging", "Swapping"], answer: "Demand Paging" }, // D
];




export default function CoreCSETest3() {
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
    navigate("/core-cse-task", { replace: true });
  };

  /* ================= ON MOUNT ================= */
  useEffect(() => {
    // ❌ always start fresh
    localStorage.removeItem(STORAGE_KEY);

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);

    startNewTest();
  }, []);

  /* ================= BLOCK REFRESH / BACK ================= */
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
      const i = Math.floor(Math.random() * ALL_ADVANCED_QUESTIONS.length);
      if (!used.has(i)) {
        picked.push(ALL_ADVANCED_QUESTIONS[i]);
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
                    className={`w-full text-left px-4 py-3 rounded-lg border ${selected === opt
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
            <div className="text-center py-10">
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
                      state: { type: "core" , level : "advanced" },
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
                    onClick={() => navigate("/core-cse-task")}
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
