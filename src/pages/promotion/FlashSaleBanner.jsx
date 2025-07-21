import React, { useEffect, useState } from "react";
import banner from "../../icons/Group37103.png"; // ảnh banner của bạn
import flower from "../../icons/flower.png";
import { useNavigate } from "react-router-dom";

const FlashSaleBanner = () => {
  const [timeLeft, setTimeLeft] = useState(82800); // 23:00:00 = 23*60*60 = 82800s
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto rounded-xl overflow-hidden">
      {/* Banner Background */}
      <img src={banner} alt="Flash Sale Banner" className="w-full h-auto" />

      {/* Timer */}

      <div className="flex items-center font-genos text-[45px] font-extrabold tracking-[.6em] text-black absolute top-[317px] left-[70%] transform -translate-x-1/2  rotate-[-3deg]">
        <span className="ml-6">{formatTime(timeLeft)}</span>
      </div>

      <button
        onClick={() => navigate("/shop")}
        className="absolute top-[250px] left-[815px] flex items-center gap-2 bg-black text-white px-5 py-3 rounded-[15px] text-[18px] font-bold shadow-lg hover:bg-white hover:text-black transition max-w-[160px]"
      >
        <img src={flower} alt="flower" className="w-5 h-5 flex-shrink-0" />
        <span className="break-words leading-tight text-center">
          Đặt Hàng Ngay
        </span>
      </button>
    </div>
  );
};

export default FlashSaleBanner;
