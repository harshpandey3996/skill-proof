import React from "react";
import { motion } from "framer-motion"; // ✅ MUST

export function NeoPageOne() {
return (
<section className="relative bg-black text-white py-24 overflow-hidden">
<div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-emerald-500/20 blur-[140px] rounded-full" />
<div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">


<motion.div
initial={{ opacity: 0, x: -40 }}
whileInView={{ opacity: 1, x: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.8 }}
>
<h2 className="text-3xl md:text-4xl font-extrabold mb-4">
Skills &gt; Degrees
</h2>
<p className="text-gray-300 mb-4">
Companies don’t hire certificates, they hire problem solvers.
SkillProof focuses on hands-on challenges that reflect real work.
</p>
<p className="text-gray-400">
Every assessment is designed to test logic, speed, and clarity —
not memorization.
</p>
</motion.div>


<motion.div
initial={{ opacity: 0, scale: 0.9 }}
whileInView={{ opacity: 1, scale: 1 }}
viewport={{ once: true }}
transition={{ duration: 0.8 }}
className="relative rounded-3xl overflow-hidden"
>
<img
src="https://images.unsplash.com/photo-1555066931-4365d14bab8c"
className="w-full h-[320px] object-cover"
/>
<div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
</motion.div>
</div>
</section>
);
}


