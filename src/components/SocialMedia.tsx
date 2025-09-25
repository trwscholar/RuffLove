import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const SocialMedia = () => {
  return (
    <section id="social" className="py-20 bg-red-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Title + Description */}
        <h2 className="text-4xl font-bold text-gray-900 text-center mb-6">
          Check Out Our <span className="text-red-500">Social Media</span>
        </h2>
        <p className="text-center text-gray-600 mb-10">
          Stay connected with Ruff Love Malaysia! Follow us on Instagram for
          updates, stories, and happy tails 🐾
        </p>

        {/* Slider */}
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          navigation={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Navigation]}
          className="social-swiper"
        >
          {/* Instagram Post 1 */}
          <SwiperSlide>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.instagram.com/p/DO3qte6k3yE/embed"
                width="100%"
                height="500"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                allow="encrypted-media"
              ></iframe>
            </div>
          </SwiperSlide>

          {/* Instagram Post 2 */}
          <SwiperSlide>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.instagram.com/p/DO5J-JqExWc/embed"
                width="100%"
                height="500"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                allow="encrypted-media"
              ></iframe>
            </div>
          </SwiperSlide>

          {/* Instagram Post 3 */}
          <SwiperSlide>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                src="https://www.instagram.com/p/DO52R8Jk5ve/embed"
                width="100%"
                height="500"
                frameBorder="0"
                scrolling="no"
                allowTransparency={true}
                allow="encrypted-media"
              ></iframe>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
};

export default SocialMedia;
