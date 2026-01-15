import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const STORAGE_KEY = "core_security_test_progress";
const TEST_TIME = 10 * 60;
const PASS_SCORE = 7;

/* ================= QUESTIONS SAME ================= */

export const INTERMEDIATE_CSE_QUESTIONS = [
    { question: "What is a compiler in programming?", options: ["Converts code to machine language", "Designs UI", "Manages databases", "Handles network"], answer: "Converts code to machine language" },
    { question: "Which data structure uses FIFO?", options: ["Queue", "Stack", "Linked List", "Tree"], answer: "Queue" },
    { question: "Which data structure uses LIFO?", options: ["Stack", "Queue", "Graph", "Hash Table"], answer: "Stack" },
    { question: "Time complexity of binary search?", options: ["O(log n)", "O(n)", "O(n^2)", "O(1)"], answer: "O(log n)" },
    { question: "Which is a non-linear data structure?", options: ["Tree", "Array", "Queue", "Stack"], answer: "Tree" },
    { question: "Which is used to implement recursion?", options: ["Stack", "Queue", "Array", "Linked List"], answer: "Stack" },
    { question: "Best case of linear search?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: "O(1)" },
    { question: "Worst case of linear search?", options: ["O(n)", "O(1)", "O(log n)", "O(n^2)"], answer: "O(n)" },
    { question: "Which graph traversal uses queue?", options: ["BFS", "DFS", "Dijkstra", "Prim"], answer: "BFS" },
    { question: "Which graph traversal uses stack or recursion?", options: ["DFS", "BFS", "Dijkstra", "Kruskal"], answer: "DFS" },
    { question: "Which is a greedy algorithm example?", options: ["Prim's algorithm", "Merge sort", "Binary search", "DFS"], answer: "Prim's algorithm" },
    { question: "Which sorting is divide and conquer?", options: ["Merge Sort", "Bubble Sort", "Insertion Sort", "Selection Sort"], answer: "Merge Sort" },
    { question: "Which sorting is adaptive?", options: ["Insertion Sort", "Quick Sort", "Merge Sort", "Heap Sort"], answer: "Insertion Sort" },
    { question: "Which is stable sorting?", options: ["Merge Sort", "Quick Sort", "Heap Sort", "Selection Sort"], answer: "Merge Sort" },
    { question: "Which is unstable sorting?", options: ["Quick Sort", "Merge Sort", "Insertion Sort", "Bubble Sort"], answer: "Quick Sort" },
    { question: "Hash table uses which technique?", options: ["Hash function", "Linear search", "Binary search", "DFS"], answer: "Hash function" },
    { question: "Collision in hash table solved by?", options: ["Chaining", "DFS", "BFS", "Heap"], answer: "Chaining" },
    { question: "AVL tree is?", options: ["Self-balancing BST", "Graph", "Heap", "Queue"], answer: "Self-balancing BST" },
    { question: "Red-Black tree is?", options: ["Balanced BST", "Stack", "Queue", "Array"], answer: "Balanced BST" },
    { question: "BFS time complexity?", options: ["O(V+E)", "O(V^2)", "O(E^2)", "O(log n)"], answer: "O(V+E)" },
    { question: "DFS time complexity?", options: ["O(V+E)", "O(V^2)", "O(E^2)", "O(log n)"], answer: "O(V+E)" },
    { question: "Dijkstra algorithm finds?", options: ["Shortest path", "Maximum flow", "Minimum spanning tree", "Cycle detection"], answer: "Shortest path" },
    { question: "Prim’s algorithm finds?", options: ["MST", "Shortest path", "DFS traversal", "BFS traversal"], answer: "MST" },
    { question: "Kruskal’s algorithm finds?", options: ["MST", "DFS", "BFS", "Shortest path"], answer: "MST" },
    { question: "Time complexity of BFS in adjacency matrix?", options: ["O(V^2)", "O(V+E)", "O(log n)", "O(n)"], answer: "O(V^2)" },
    { question: "Time complexity of BFS in adjacency list?", options: ["O(V+E)", "O(V^2)", "O(n log n)", "O(n^2)"], answer: "O(V+E)" },
    { question: "Which memory allocation is done at runtime?", options: ["Dynamic", "Static", "Compile time", "None"], answer: "Dynamic" },
    { question: "Which memory allocation is done at compile time?", options: ["Static", "Dynamic", "Heap", "Stack"], answer: "Static" },
    { question: "Stack memory stores?", options: ["Function call info", "Heap objects", "Global vars", "Cache"], answer: "Function call info" },
    { question: "Heap memory stores?", options: ["Dynamically allocated objects", "Function call info", "Registers", "Instructions"], answer: "Dynamically allocated objects" },
    { question: "Which is pointer in C?", options: ["Variable storing address", "Variable storing value", "Array element", "Function"], answer: "Variable storing address" },
    { question: "Which operator gives address of variable in C?", options: ["&", "*", "+", "-"], answer: "&" },
    { question: "Which operator dereferences pointer in C?", options: ["*", "&", "+", "-"], answer: "*" },
    { question: "Which data structure used in BFS?", options: ["Queue", "Stack", "Tree", "Graph"], answer: "Queue" },
    { question: "Which data structure used in DFS?", options: ["Stack", "Queue", "Tree", "Graph"], answer: "Stack" },
    { question: "Which complexity is O(1)?", options: ["Accessing array element", "Searching in array", "Inserting in array", "Deleting in array"], answer: "Accessing array element" },
    { question: "Which complexity is O(n)?", options: ["Linear search", "Binary search", "Heap insertion", "BST search"], answer: "Linear search" },
    { question: "Which is non-linear data structure?", options: ["Graph", "Array", "Queue", "Stack"], answer: "Graph" },
    { question: "Queue implemented by array is?", options: ["Linear Queue", "Circular Queue", "Priority Queue", "Deque"], answer: "Linear Queue" },
    { question: "Which is circular queue?", options: ["Rear connected to front", "Linear queue", "Stack", "Heap"], answer: "Rear connected to front" },
    { question: "Queue implemented by linked list is?", options: ["Dynamic Queue", "Linear Queue", "Circular Queue", "Priority Queue"], answer: "Dynamic Queue" },
    { question: "Priority queue implemented by?", options: ["Heap", "Stack", "Array", "Linked list"], answer: "Heap" },
    { question: "Min-heap gives?", options: ["Minimum element first", "Maximum element first", "Random element", "None"], answer: "Minimum element first" },
    { question: "Max-heap gives?", options: ["Maximum element first", "Minimum element first", "Random element", "None"], answer: "Maximum element first" },
    { question: "Which is stable sort?", options: ["Merge Sort", "Quick Sort", "Heap Sort", "Selection Sort"], answer: "Merge Sort" },
    { question: "Which is unstable sort?", options: ["Quick Sort", "Merge Sort", "Bubble Sort", "Insertion Sort"], answer: "Quick Sort" },
    { question: "Which search is faster in sorted array?", options: ["Binary search", "Linear search", "DFS", "BFS"], answer: "Binary search" },
    { question: "Which search works on unsorted array?", options: ["Linear search", "Binary search", "Heap search", "DFS"], answer: "Linear search" },
    { question: "Which complexity is O(n log n)?", options: ["Merge Sort", "Bubble Sort", "Linear search", "Stack operation"], answer: "Merge Sort" },
    { question: "Which complexity is O(n^2)?", options: ["Bubble Sort", "Merge Sort", "Binary search", "Stack operation"], answer: "Bubble Sort" },
    { question: "Which tree traversal uses recursion?", options: ["Inorder", "BFS", "Queue", "Heap"], answer: "Inorder" },
    { question: "Which tree traversal uses queue?", options: ["Level-order", "Preorder", "DFS", "Stack"], answer: "Level-order" },
    { question: "Which is full binary tree?", options: ["All nodes have 0 or 2 children", "Every node has 1 child", "No children", "Only root"], answer: "All nodes have 0 or 2 children" },
    { question: "Which is complete binary tree?", options: ["All levels filled except last left to right", "Full binary tree", "Heap", "BST"], answer: "All levels filled except last left to right" },
    { question: "BST search time complexity?", options: ["O(log n)", "O(n)", "O(n^2)", "O(1)"], answer: "O(log n)" },
    { question: "BST insertion time complexity?", options: ["O(log n)", "O(n)", "O(n^2)", "O(1)"], answer: "O(log n)" },
    { question: "BST deletion time complexity?", options: ["O(log n)", "O(n)", "O(n^2)", "O(1)"], answer: "O(log n)" },
    { question: "Which is sparse matrix?", options: ["Matrix with many zeros", "Matrix with all non-zeros", "Matrix with one row", "Diagonal matrix"], answer: "Matrix with many zeros" },
    { question: "Which is adjacency matrix?", options: ["Represents graph edges in matrix", "Matrix operations", "Sparse array", "Queue"], answer: "Represents graph edges in matrix" },
    { question: "Which is adjacency list?", options: ["Represents graph using linked list", "Matrix", "Array", "Heap"], answer: "Represents graph using linked list" },
    { question: "Which is topological sort used for?", options: ["DAG dependencies", "Shortest path", "Heapify", "DFS"], answer: "DAG dependencies" },
    { question: "Which algorithm detects cycle in graph?", options: ["DFS", "BFS", "Dijkstra", "Prim"], answer: "DFS" },
    { question: "Dynamic programming solves?", options: ["Overlapping subproblems", "Heap insertion", "Stack operations", "Queue operations"], answer: "Overlapping subproblems" },
    { question: "Fibonacci using DP time complexity?", options: ["O(n)", "O(2^n)", "O(n^2)", "O(log n)"], answer: "O(n)" },
    { question: "Memoization stores?", options: ["Intermediate results", "Stack frames", "Queue elements", "Heap nodes"], answer: "Intermediate results" },
    { question: "Tabulation in DP is?", options: ["Bottom-up approach", "Top-down approach", "Recursion", "Stack"], answer: "Bottom-up approach" },
    { question: "Greedy algorithm chooses?", options: ["Local optimum", "Random value", "Backtracking", "DFS"], answer: "Local optimum" },
    { question: "Which is NP problem?", options: ["Subset sum", "Binary search", "Merge Sort", "DFS"], answer: "Subset sum" },
    { question: "Time complexity of Prim’s using adjacency matrix?", options: ["O(V^2)", "O(E log V)", "O(V+E)", "O(n^2)"], answer: "O(V^2)" },
    { question: "Time complexity of Kruskal’s using union-find?", options: ["O(E log V)", "O(V^2)", "O(V+E)", "O(E^2)"], answer: "O(E log V)" },
    { question: "DFS used to find?", options: ["Connected components", "Shortest path", "Heap", "Queue"], answer: "Connected components" },
    { question: "BFS used to find?", options: ["Shortest path", "Connected components", "Heap", "DFS"], answer: "Shortest path" },
    { question: "Which is strongly connected graph?", options: ["Every vertex reachable from every other", "Tree", "Heap", "Sparse graph"], answer: "Every vertex reachable from every other" },
    { question: "Which is bipartite graph?", options: ["Vertices can be split in 2 sets", "Cycle graph", "Complete graph", "Tree"], answer: "Vertices can be split in 2 sets" },
    { question: "Which is minimum spanning tree?", options: ["Subgraph connecting all vertices with minimum weight", "Shortest path", "Heap", "Queue"], answer: "Subgraph connecting all vertices with minimum weight" },
    { question: "Which is maximum flow problem?", options: ["Push-relabel", "DFS", "BFS", "Heap"], answer: "Push-relabel" },
    { question: "Dijkstra works on which edges?", options: ["Non-negative weights", "Negative weights", "All weights", "Random weights"], answer: "Non-negative weights" },
    { question: "Bellman-Ford algorithm detects?", options: ["Negative cycles", "Positive cycles", "Heap", "DFS"], answer: "Negative cycles" },
    { question: "Floyd-Warshall algorithm finds?", options: ["All pairs shortest path", "Single source shortest path", "MST", "DFS"], answer: "All pairs shortest path" },
    { question: "Which is strongly typed language?", options: ["Java", "C", "Python", "C++"], answer: "Java" },
    { question: "Which is weakly typed language?", options: ["JavaScript", "Java", "C#", "C++"], answer: "JavaScript" },
    { question: "Which is interpreted language?", options: ["Python", "C", "C++", "Java"], answer: "Python" },
    { question: "Which is compiled language?", options: ["C", "Python", "JavaScript", "Ruby"], answer: "C" },
    { question: "Which is high-level language?", options: ["Python", "Assembly", "Machine code", "C"], answer: "Python" },
    { question: "Which is low-level language?", options: ["Assembly", "Python", "C++", "Java"], answer: "Assembly" },
    { question: "Which is procedural language?", options: ["C", "Python", "JavaScript", "Java"], answer: "C" },
    { question: "Which is object-oriented language?", options: ["Java", "C", "C++", "Assembly"], answer: "Java" },
    { question: "Which is functional language?", options: ["Haskell", "C", "Python", "Java"], answer: "Haskell" },
    { question: "Which is scripting language?", options: ["JavaScript", "C", "Java", "C++"], answer: "JavaScript" },
    { question: "Which is declarative language?", options: ["SQL", "C", "Python", "Java"], answer: "SQL" },
    { question: "Which of these is a deadlock prevention technique?", options: ["Wait-Die Scheme", "Banker's Algorithm", "Peterson's Algorithm", "Round Robin"], answer: "Wait-Die Scheme" },
    { question: "What is external fragmentation in memory management?", options: ["Unused memory scattered", "Memory overflow", "CPU scheduling delay", "Paging error"], answer: "Unused memory scattered" },
    { question: "Which protocol is used for reliable data transfer in TCP/IP?", options: ["TCP", "UDP", "ICMP", "ARP"], answer: "TCP" },
    { question: "Which data structure is used for recursive function calls?", options: ["Stack", "Queue", "Linked List", "Graph"], answer: "Stack" },
    { question: "Which scheduling algorithm minimizes average waiting time?", options: ["SJF", "FCFS", "Round Robin", "Priority"], answer: "SJF" },
    { question: "Which of these is a non-preemptive scheduling algorithm?", options: ["FCFS", "Round Robin", "Priority Preemptive", "SRTF"], answer: "FCFS" },
    { question: "What is internal fragmentation?", options: ["Unused memory inside allocated block", "Memory leaks", "Cache miss", "CPU stall"], answer: "Unused memory inside allocated block" },
    { question: "Which page replacement algorithm uses least recently used page?", options: ["LRU", "FIFO", "Optimal", "Random"], answer: "LRU" },
    { question: "What is a semaphore used for?", options: ["Process synchronization", "Memory allocation", "File transfer", "Database indexing"], answer: "Process synchronization" },
    { question: "Which method resolves collisions in hash tables?", options: ["Chaining", "Open addressing", "Both", "None"], answer: "Both" },

];


export default function CoreCSETest2() {
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
            const i = Math.floor(Math.random() * INTERMEDIATE_CSE_QUESTIONS.length);
            if (!used.has(i)) {
                picked.push(INTERMEDIATE_CSE_QUESTIONS[i]);
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
                                            state: { type: "core" , level : "intermediate" },
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
