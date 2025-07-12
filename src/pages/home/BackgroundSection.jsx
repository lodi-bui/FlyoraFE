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

import chaomao from "../../icons/chaomao.png";
import chichchoe from "../../icons/chichchoe.png";
import vetxich from "../../icons/vetxich.png";
import yenphung from "../../icons/yenphung.png";

const BackgroundSection = () => {
  // Data for bird categories
  const birdCategories = [
    {
      name: "Chào Mào",
      image: chaomao,
      link: "https://livedemo00.template-help.com/muse_57607/read-more.html",
      scientificName: "Pycnonotus jocosus",
    },
    {
      name: "Vẹt Xích",
      image: vetxich,
      link: "https://livedemo00.template-help.com/muse_57607/read-more.html",
      scientificName: "Alexandrine Parakeet",
    },
    {
      name: " Yến Phụng",
      image: yenphung,
      link: "https://livedemo00.template-help.com/muse_57607/read-more.html",
      scientificName: "Budgerigar",
    },
    {
      name: "Chích Chòe",
      image: chichchoe,
      link: "https://livedemo00.template-help.com/muse_57607/read-more.html",
      scientificName: "Magpie-robin"
    },
  ];

  // return (
  //   <section className="relative w-full h-[306px]">
  //     <div className="container mx-auto flex justify-center items-end h-full">
  //       <div className="grid grid-cols-4 gap-8 mb-8 -mt-[60px]">
  //         {birdCategories.map((bird, index) => (
  //           <div key={index} className="flex flex-col items-center">
  //             {/* Dùng Tailwind aspect-square để đạt tỉ lệ 1:1 */}
  //             <div className="w-[250px] aspect-square overflow-hidden rounded-full mb-4">
  //               <img
  //                 src={bird.image}
  //                 alt={bird.name}
  //                 className="object-cover w-full h-full"
  //               />
  //             </div>
  //             <a
  //               href={bird.link}
  //               rel="noopener noreferrer"
  //               target="_blank"
  //               className={` font-bold text-2xl text-center leading-[29px] whitespace-nowrap ${
  //                 index === 3
  //                   ? "[font-family:'Times_New_Roman-Bold',Helvetica]"
  //                   : "font-demo-templatemonster-com-semantic-link-upper"
  //               }`}
  //             >
  //               {bird.name}
  //             </a>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </section>
  // );
  return (
    <section className="py-8 bg-white">
      <div className="">
        <h2 className="text-2xl font-bold text-black mb-6">
          Chuyên sản phẩm cho các loại chim
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 flex justify-between ">
          {birdCategories.map((bird, index) => (
            <div key={index} className="bg-gray-100 rounded-lg shadow-md">
              <div className="w-full overflow-hidden rounded-lg">
                <img
                  src={bird.image}
                  alt={bird.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-4 py-2">
                <p className="text-md font-bold text-black">{bird.name}</p>
                <p className="text-primary-orange text-sm font-semibold">{bird.scientificName}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BackgroundSection;
