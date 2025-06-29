import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

const slides = [
  {
    image: "https://i.ibb.co/8DKHR8NP/img-1.jpg",
    text: "Conquer Your Next Marathon: Find and Register for Races Globally.",
  },
  {
    image: "https://i.ibb.co/1fsWkC3T/img-2.jpg",
    text: "Effortless Race Organization: Tools for Event Success.",
  },
  {
    image: "https://i.ibb.co/QjbQgx01/img-3.jpg",
    text: "Track Your Training, Set Your Goals, Achieve Greatness.",
  },
  {
    image: "https://i.ibb.co/VpLQ8gM7/img-4.jpg",
    text: "Your Ultimate Resource for Everything Marathon.",
  },
];

const Banner = () => {
  return (
    <div className="relative w-full h-[400px]">
      <Swiper
        modules={[Navigation, Autoplay, EffectFade]}
        navigation
        autoplay={{ delay: 2000 }}
        effect="fade"
        loop
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="relative w-full h-full bg-cover bg-center flex items-center justify-center"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <h2 className="relative z-10 text-white text-3xl md:text-5xl font-extrabold text-center w-10/12 mx-auto p-4 leading-tight drop-shadow-lg">
                {slide.text}
              </h2>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
