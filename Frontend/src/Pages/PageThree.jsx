import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";
import { motion } from "framer-motion"; // ✅ MUST


export function NeoPageThree() {
const skills = [
"Frontend",
"Backend",
"AI / ML",
"Cyber Security",
"Data Science",
"DevOps",
];


const settings = {
infinite: true,
speed: 2500,
slidesToShow: 4,
slidesToScroll: 1,
autoplay: true,
autoplaySpeed: 0,
cssEase: "linear",
arrows: false,
pauseOnHover: false,
responsive: [
{ breakpoint: 1024, settings: { slidesToShow: 3 } },
{ breakpoint: 640, settings: { slidesToShow: 2 } },
],
};


return (
<section className="bg-black text-white py-16 overflow-hidden">
<Slider {...settings}>
{skills.map((s, i) => (
<div key={i} className="px-3">
<div className="rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 p-6 text-center border border-white/10">
<h4 className="font-semibold">{s}</h4>
</div>
</div>
))}
</Slider>
</section>
);
}