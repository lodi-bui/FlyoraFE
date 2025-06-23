// import React, { useState, useEffect } from "react";
// import { NavLink } from "react-router-dom";

// const BackgroundSection = () => {
//   const [birdCategories, setBirdCategories] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     // Giả sử API endpoint của bạn là /api/bird-categories
//     fetch("/api/bird-categories")
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((data) => {
//         setBirdCategories(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("Không tải được dữ liệu");
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <section className="relative w-full h-[306px] bg-neutral-700 flex items-center justify-center">
//         <span className="text-white">Đang tải…</span>
//       </section>
//     );
//   }

//   if (error) {
//     return (
//       <section className="relative w-full h-[306px] bg-neutral-700 flex items-center justify-center">
//         <span className="text-red-400">{error}</span>
//       </section>
//     );
//   }

//   return (
//     <section className="relative w-full h-[306px] bg-neutral-700">
//       <div className="container mx-auto flex justify-center items-end h-full">
//         <div className="grid grid-cols-4 gap-8 mb-8">
//           {birdCategories.map((bird, index) => (
//             <div key={bird.id ?? index} className="flex flex-col items-center">
//               <div className="relative mb-4">
//                 {/* Dùng Tailwind aspect-ratio plugin để khoá tỷ lệ 1:1 */}
//                 <div className="w-[250px] aspect-[1/1] overflow-hidden">
//                   <img
//                     src={bird.image}
//                     alt={bird.name}
//                     className="object-cover w-full h-full rounded-full"
//                   />
//                 </div>
//               </div>
//               <NavLink
//                 to={bird.link}
//                 className={`text-white font-bold text-demotemplatemonstercomwhite text-2xl text-center tracking-[0] leading-[29px] whitespace-nowrap ${
//                   index === 3
//                     ? "[font-family:'Times_New_Roman-Bold',Helvetica]"
//                     : "font-demo-templatemonster-com-semantic-link-upper"
//                 }`}
//               >
//                 {bird.name}
//               </NavLink>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };
// export default BackgroundSection;

import React from "react";

const BackgroundSection = () => {
  // Data for bird categories
  const birdCategories = [
    {
      name: "PARAKEETS",
      image: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/link.png",
      link: "https://livedemo00.template-help.com/muse_57607/read-more.html",
    },
    {
      name: "BEE-EATERS",
      image: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/link-1.png",
      link: "https://livedemo00.template-help.com/muse_57607/read-more.html",
    },
    {
      name: "SUN PARAKEETS",
      image: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/link-2.png",
      link: "https://livedemo00.template-help.com/muse_57607/read-more.html",
    },
    {
      name: "AMAZON PARROTS",
      image: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/link-3.png",
      link: "https://livedemo00.template-help.com/muse_57607/read-more.html",
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
                  className="object-cover w-full h-full"
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
