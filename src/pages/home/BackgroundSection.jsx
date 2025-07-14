import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BackgroundSection = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (tagName) => {
    const newParams = new URLSearchParams(location.search);
    newParams.set("tag", tagName);
    navigate(`/shop?${newParams.toString()}`);
  };

  // Data for bird categories
  const birdCategories = [
    {
      name: "Chào Mào",
      image: "https://i.postimg.cc/pVQ7qM1k/Link.png",
    },
    {
      name: "Vẹt Xích",
      image: "https://i.postimg.cc/j506J6C8/vetxich.png",
    },
    {
      name: "Yến Phụng",
      image: "https://i.postimg.cc/xTRsDZq9/yenphung.png",
    },
    {
      name: "Chích Chòe",
      image: "https://i.postimg.cc/sXNn8G27/chichchoe.png",
    },
  ];

  return (
    <section className="relative w-full h-[306px] bg-neutral-700">
      <div className="container mx-auto flex justify-center items-end h-full">
        <div className="grid grid-cols-4 gap-8 mb-8 -mt-[60px]">
          {birdCategories.map((bird, index) => (
            <div key={index} className="flex flex-col items-center">
              {/* Dùng Tailwind aspect-square để đạt tỉ lệ 1:1 */}
              <div className="w-[250px] aspect-square overflow-hidden rounded-full mb-4">
                <img
                  src={bird.image}
                  alt={bird.name}
                  className="object-cover w-full h-full cursor-pointer"
                  onClick={() => handleClick(bird.name)}
                />
              </div>
              <a
                href={bird.link}
                rel="noopener noreferrer"
                target="_blank"
                className={`text-white font-bold text-2xl text-center leading-[29px] whitespace-nowrap ${
                  index === 3
                    ? "[font-family:'Times_New_Roman-Bold',Helvetica]"
                    : "font-demo-templatemonster-com-semantic-link-upper"
                }`}
              >
                {bird.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BackgroundSection;
