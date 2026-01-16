import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React from "react";

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
    speed: 3000,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,

    slidesToShow: 4,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          centerPadding: "40px",
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1.4,
          centerMode: true,
          centerPadding: "30px",
        },
      },
    ],
  };

  return (
    <section className="bg-black text-white py-16 overflow-hidden">
      <Slider {...settings}>
        {skills.map((s, i) => (
          <div key={i} className="px-2">
            <div className="h-20 flex items-center justify-center rounded-2xl
              bg-gradient-to-br from-emerald-500/20 to-cyan-500/20
              border border-white/10">
              <h4 className="font-semibold text-sm sm:text-base">{s}</h4>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}
