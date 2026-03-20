import React from "react";

const sections = [
  {
    title: "Why AI is Important Today 🚀",
    text: `AI is transforming every industry — from healthcare to finance.

It helps automate repetitive tasks, analyze huge data instantly, and make faster decisions.

Companies are not just using AI, they are building entire systems around it.

In today's world, knowing AI is no longer optional — it's a competitive advantage.`,
    img: "https://images.unsplash.com/photo-1677756119517-756a188d2d94?w=800",
  },
  {
    title: "Why Prompting is a Powerful Skill 🧠",
    text: `Prompting is the ability to communicate effectively with AI.

The better your prompt, the better output you get.

It’s like giving instructions to a super-intelligent assistant.

Today, prompt engineering is becoming a real skill in tech jobs.`,
    img: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=800",
  },
  {
    title: "AI is Changing Jobs, Not Ending Them ❌",
    text: `AI is not replacing developers or professionals.

Instead, it's changing how they work.

A developer using AI can build faster, debug quicker, and learn rapidly.

The future belongs to people who can work WITH AI, not against it.`,
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
  },
  {
    title: "AI in Web Development 💻 & Other Skills 🌍",
    text: `AI helps developers generate code, fix bugs, design UI, and optimize performance.

Tools like ChatGPT and Copilot are speeding up development.

Developers now focus more on logic and creativity instead of repetitive coding.

AI is used in marketing, content writing, video editing, cybersecurity, and more.

It helps generate ideas, automate workflows, and improve productivity.

No matter your field, AI can enhance your skillset and efficiency.`,
    img: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800",
  },
];

export default function AiPage() {
  return (
    <div className="bg-black text-white">

      {/* HERO */}
      <div className="mt-16 px-4 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 leading-tight">
          AI is the Future of IT 🔥
        </h1>
        <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
          Learn AI, understand prompting, and adapt to the changing tech world.
        </p>
      </div>

      {/* SECTIONS */}
      <div className="space-y-30 px-4 sm:px-6 md:px-16 py-12">
        {sections.map((sec, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-2 gap-6 md:gap-10 items-center"
          >
            {/* IMAGE */}
            <div className={`w-full ${index % 2 !== 0 ? "md:order-2" : ""}`}>
              <img
                src={sec.img}
                alt="ai"
                className="w-full h-[300px] sm:h-[300px] md:h-[300px] object-cover rounded-xl shadow-md"
              />
            </div>

            {/* CONTENT */}
            <div className="w-full">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-3">
                {sec.title}
              </h2>

              <div className="text-gray-400 space-y-3 leading-6 text-sm sm:text-base">
                {sec.text.split("\n").map((line, i) => (
                  <p key={i}>{line.trim()}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="text-center pb-10 px-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">
          Adapt with AI or get left behind ⚡
        </h2>
      </div>
    </div>
  );
}