import React from "react";
import { motion } from "framer-motion"; // ✅ MUST

export function NeoPageTwo() {
return (
<section className="relative bg-black text-white py-24">
<div className="max-w-7xl mx-auto px-6">
<motion.h2
initial={{ opacity: 0, y: 20 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
className="text-3xl md:text-4xl font-bold mb-12 text-center"
>
Compete. Improve. Dominate.
</motion.h2>


<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
{[{
title: "Timed Tests",
desc: "Real pressure. Real performance.",
},{
title: "Global Ranking",
desc: "See exactly where you stand.",
},{
title: "Instant Analysis",
desc: "Know strengths & weaknesses instantly.",
}].map((c, i) => (
<motion.div
key={i}
whileHover={{ y: -8 }}
className="rounded-2xl bg-white/10 backdrop-blur border border-white/10 p-6 shadow-lg"
>
<h3 className="font-semibold text-lg mb-2 text-emerald-400">
{c.title}
</h3>
<p className="text-sm text-gray-300">{c.desc}</p>
</motion.div>
))}
</div>
</div>
</section>
);
}

