// import React, { useState } from "react";
// import { NavLink, Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";

// // import logoBlack from "../../icons/logo_black.png";
// import searchIcon from "../../icons/search.png";
// import cartIcon from "../../icons/cart.png";
// import loginIcon from "../../icons/login.png";
// import logoBird from "../../icons/bird_logo.png";

// import { FaLocationDot } from "react-icons/fa6";

// import { useAuthCart } from "../../context/AuthCartContext";

// function Header() {
//   const { cartCount, isLoggedIn, logout } = useAuthCart();
//   const [showMenu, setShowMenu] = useState(false);
//   const [showNav, setNav] = useState(false);
//   const navigate = useNavigate();
//   const [searchQuery, setSearchQuery] = useState("");

//   const customerId = localStorage.getItem("linkedId"); // Lấy linkedId từ localStorage

//   const navItems = [
//     { name: "Home", href: "/" },
//     { name: "Shop", href: "/shop" },
//     { name: "About Us", href: "/about-us" },
//     { name: "Contact Us", href: "/contact-us" },
//   ];

//   const handleProtectedClick = (action) => {
//     if (!isLoggedIn) {
//       if (action === "cart") toast.error("Bạn cần đăng nhập để xem giỏ hàng!");
//       else if (action === "wishlist")
//         toast.error("Bạn cần đăng nhập để xem danh sách yêu thích!");
//       else toast.error("Bạn cần đăng nhập để truy cập!");
//     } else {
//       navigate(`/${action}`);
//     }
//   };

//   const handleSearch = () => {
//     if (searchQuery.trim() !== "") {
//       navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
//     }
//   };

//   return (
//     <header>
//       {/* <header className="relative w-full bg-gradient-to-tr from-[#12AB3C] to-[#083622] overflow-visible pb-10 md:pb-16"> */}
//       {/* Top contact bar */}
//       <div className="w-full mx-auto py-4 md:py-7 px-4 mt-0">
//         <div className="flex flex-col md:flex-row justify-evenly items-center w-full max-w-7xl mx-auto gap-4 md:gap-0 text-black">
//           <div className="flex items-center gap-2">
//             <FaLocationDot />
//             <span className="font-medium text-black text-sm md:text-base">
//               12 Hoàng Hoa Thám, Q.3, TP.HCM
//             </span>
//           </div>
//         </div>
//       </div>

//       {/* Main navigation bar with higher z-index */}
//       <div className="relative z-20 bg-white rounded-full shadow-lg flex items-center justify-around px-4 md:px-8 my-4 md:mx-auto w-full max-w-4xl md:max-w-6xl mt-2 md:my-10 h-16 md:h-20">
//         <img src={logoBird} alt="Logo" />
//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-6 text-lg md:text-xl font-semibold z-20">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.href}
//               to={item.href}
//               end
//               className={({ isActive }) =>
//                 isActive
//                   ? "text-orange-500 border-b-2 border-orange-500 pb-1"
//                   : "text-black hover:text-orange-500"
//               }
//             >
//               {item.name}
//             </NavLink>
//           ))}
//         </nav>

//         {/* Right Section */}
//         <div className="flex items-center space-x-3 md:space-x-5 z-20">
//           {/* Search */}
//           <div className="relative">
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter") handleSearch();
//               }}
//               className="border rounded-full px-3 py-1 w-32 sm:w-40 md:w-64 lg:w-80 pr-16 text-sm md:text-base"
//             />

//             {/* Nút clear (X) */}
//             {searchQuery && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setSearchQuery("");
//                   navigate("/shop");
//                 }}
//                 className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
//               >
//                 ✕
//               </button>
//             )}

//             {/* Icon search */}
//             <img
//               src={searchIcon}
//               alt="Search"
//               onClick={handleSearch}
//               className="absolute right-2 top-1/2 -translate-y-1/2 h-5 md:h-6 cursor-pointer"
//             />
//           </div>

//           {/* Cart */}
//           <button
//             type="button"
//             onClick={() => handleProtectedClick("cart")}
//             className="relative z-20"
//           >
//             <img src={cartIcon} alt="Cart" className="w-6 h-6" />
//             <span className="absolute -top-2 -right-2 bg-orange-500 text-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
//               {cartCount}
//             </span>
//           </button>

//           {/* Login Menu with proper z-index */}
//           <div className="relative z-30">
//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               className="z-30 relative"
//             >
//               <img src={loginIcon} alt="Login" className="w-6 h-6" />
//             </button>

//             {showMenu && (
//               <div className="absolute right-0 mt-2 w-44 bg-black shadow-lg rounded-md z-50 border">
//                 {!isLoggedIn ? (
//                   <>
//                     <NavLink
//                       to="/login"
//                       onClick={() => setShowMenu(false)}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
//                     >
//                       Login
//                     </NavLink>
//                     <NavLink
//                       to="/register"
//                       onClick={() => setShowMenu(false)}
//                       className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
//                     >
//                       Register
//                     </NavLink>
//                   </>
//                 ) : (
//                   <>
//                     <Link
//                       to={`/order-history?customerId=${customerId}`}
//                       onClick={() => setShowMenu(false)}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
//                     >
//                       Lịch sử đơn hàng
//                     </Link>

//                     <NavLink
//                       to="/profile"
//                       onClick={() => setShowMenu(false)}
//                       className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
//                     >
//                       Thông tin cá nhân
//                     </NavLink>

//                     <button
//                       onClick={() => {
//                         logout();
//                         setShowMenu(false);
//                         toast.success("Đăng xuất thành công!");
//                         navigate("/");
//                       }}
//                       className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-semibold"
//                     >
//                       Đăng xuất
//                     </button>
//                   </>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Mobile nav with proper z-index */}
//       {showNav && (
//         <nav className="md:hidden bg-black shadow-lg mx-4 rounded-md py-4 relative z-40">
//           {navItems.map((item) => (
//             <NavLink
//               key={item.href}
//               to={item.href}
//               end
//               onClick={() => setNav(false)}
//               className={({ isActive }) =>
//                 isActive
//                   ? "block px-4 py-2 text-lg font-semibold text-orange-500 border-l-4 border-orange-500"
//                   : "block px-4 py-2 text-lg font-semibold text-black hover:text-orange-500"
//               }
//             >
//               {item.name}
//             </NavLink>
//           ))}
//         </nav>
//       )}
//     </header>
//   );
// }

// export default Header;
import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import logoBird from "../../icons/bird_logo.png";
import bannerImg from "../../icons/banner.png"; // Thêm đường dẫn đến hình banner
import searchIcon from "../../icons/search.png";
import cartIcon from "../../icons/cart.png";
import loginIcon from "../../icons/login.png";
import bird from "../../icons/bird_hi.png";


import { useAuthCart } from "../../context/AuthCartContext";
import { PhoneIcon } from "lucide-react";

function Header() {
  const { cartCount, isLoggedIn, logout } = useAuthCart();
  const [showMenu, setShowMenu] = useState(false);
  const [showNav, setNav] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const customerId = localStorage.getItem("linkedId"); // Lấy linkedId từ localStorage
  // Nếu không có linkedId, có thể đặt là null hoặc một giá trị mặc định
  // const customerId = null; // Hoặc một giá trị mặc định nếu không có


  const navItems = [
    { name: "Trang chủ", href: "/" },
    { name: "Sản phẩm", href: "/shop" },
    { name: "Khuyến mãi", href: "/promotions" },
    { name: "Tin tức", href: "/news" },
    { name: "Liên hệ", href: "/contact-us" },
  ];

  const handleProtectedClick = (action) => {
    if (!isLoggedIn) {
      if (action === "cart") toast.error("Bạn cần đăng nhập để xem giỏ hàng!");
      else toast.error("Bạn cần đăng nhập để truy cập!");
    } else {
      navigate(`/${action}`);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() !== "") {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const starIcons = [
    {
      src: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-19.svg",
      className:
        "hidden md:block absolute w-[73px] h-[82px] top-[100px] left-[1350px]",
    },
    {
      src: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-20-1.svg",
      className:
        "hidden md:block absolute w-[73px] h-[82px] top-60 left-[1303px]",
    },
    {
      src: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-17.svg",
      className:
        "hidden md:block absolute w-[73px] h-[82px] top-[357px] left-[1340px]",
    },
    {
      src: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-16.svg",
      className:
        "hidden md:block absolute w-[73px] h-[82px] top-[419px] left-[1225px]",
    },
  ];

  return (
    <header className="relative w-full [background:linear-gradient(336deg,rgba(8,54,34,1)_0%,rgba(18,171,60,1)_100%)] overflow-visible pb-10 md:pb-16">
      {/* className="relative w-full bg-gradient-to-tr from-[#12AB3C] to-[#083622] overflow-visible pb-10 md:pb-16" */}
      {/* Top contact bar */}
      <div className="w-full mx-auto py-4 md:py-7 px-4 mt-0">
        <div className="flex flex-col md:flex-row justify-evenly items-center w-full max-w-7xl mx-auto gap-4 md:gap-0">
          <div className="flex items-center">
            <img
              src={phoneIcon}
              alt="Phone"
              className="w-5 h-5 absolute left-[218px]"
            />
            <span className="font-medium text-white text-sm md:text-base absolute left-[240px]">
              +84 3367 8915
            </span>
          </div>
          <div className="flex items-center">
            <img
              src={mailIcon}
              alt="Mail"
              className="w-5 h-5 absolute left-[390px]"
            />
            <span className="font-medium text-white text-sm md:text-base absolute left-[418px]">
              ntrang21102005@gmail.com
            </span>
          </div>
          <div className="flex items-center">
            <img
              src={locationIcon}
              alt=""
              className="w-5 h-5 absolute right-[470px]"
            />
            <span className="font-medium text-white text-sm md:text-base absolute right-[220px]">
              12 Hoàng Hoa Thám, Q.3, TP.HCM
            </span>
          </div>
        </div>
      </div>
      {/* Sun icon with lower z-index */}
      <img
        src={sunIcon}
        alt=""
        className="hidden md:block absolute w-[170px] h-[181px] left-[35%] top-[9%] z-0 pointer-events-none"
      />
      {/* Main navigation bar with higher z-index */}
      <div className="relative z-20 bg-white rounded-full shadow-lg flex items-center top-[-40px] justify-around px-4 md:px-8 my-4 md:mx-auto w-full max-w-4xl md:max-w-6xl mt-2 md:my-10 h-16 md:h-20">
        <div className="flex items-center ">
          <img src={logoBlack} alt="Flyora" className="w-22 md:w-26 h-auto" />

        </div>
        <nav className="flex items-center space-x-5 bg-primary-orange rounded-full px-8 py-2 h-fit">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              ss
              end
              className={({ isActive }) =>
                isActive
                  ? "text-black font-semibold"
                  : "text-black hover:text-gray-700"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-5">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              className="border rounded-full px-3 py-2 pr-10 text-sm w-150"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  navigate("/shop");
                }}
                className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
              >
                ✕
              </button>
            )}
            <img
              src={searchIcon}
              alt="Search"
              onClick={handleSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 h-5 cursor-pointer"
            />
          </div>

          {/* Cart */}
          <button
            type="button"
            onClick={() => handleProtectedClick("cart")}
            className="relative"
          >
            <img src={cartIcon} alt="Cart" className="w-6 h-6" />
            {isLoggedIn && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}

          </button>

          {/* Login */}
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)}>
              <img src={loginIcon} alt="Login" className="w-6 h-6" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md border">
                {!isLoggedIn ? (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                    >
                      Đăng nhập
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                    >
                      Đăng ký
                    </NavLink>
                  </>
                ) : (
                  <>
                    <Link
                      to={`/order-history?customerId=${customerId}`}
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                    >
                      Lịch sử đơn hàng
                    </Link>
                    <NavLink
                      to="/profile"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                    >
                      Thông tin cá nhân
                    </NavLink>
                    <button
                      onClick={() => {
                        logout();
                        setShowMenu(false);
                        toast.success("Đăng xuất thành công!");
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 font-semibold"
                    >
                      Đăng xuất
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Mobile nav with proper z-index */}

      {showNav && (
        <nav className="md:hidden bg-black shadow-lg mx-4 rounded-md py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              onClick={() => setNav(false)}
              className={({ isActive }) =>
                isActive
                  ? "block px-4 py-2 text-lg font-semibold text-orange-500 border-l-4 border-orange-500"
                  : "block px-4 py-2 text-lg font-semibold text-black hover:text-orange-500"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      )}
      {/* Content section with lower z-index */}
      <div className="relative px-4 md:px-20 pt-4 md:pt-10 z-10">
        <div className="max-w-2xl mx-auto md:ml-20 md:mx-0">
          <img
            className="w-[1000px] h-[470px] right-[-50px] absolute top-0 z-0"
            alt="Group"
            src="https://c.animaapp.com/mbqa0l7wK0NJ0W/img/group-9-2.png"
          />
          <img
            src={logoChim}
            alt="Flyora"
            className="w-[362px] h-[172px] mx-auto md:mx-0 mb-4 md:mb-0"
          />

          {/* <img
                  className="absolute w-[108px] h-[113px] top-1.5 left-0.5 rotate-[-170.39deg]"
                  alt="Group"
                  src="https://c.animaapp.com/mbqa0l7wK0NJ0W/img/group-10.png"
                />
              </div>
              <div className="text-[32px] text-[#fd7e14] font-bold [font-family:'Inter',Helvetica]">
                Flyora Shop
              </div> */}

          <div className="flex items-center justify-start gap-4 md:gap-6">
            {/*chim anime/}
            {/* <img
              src={bird}
              alt="Bird"
              className="w-auto h-[80px] md:h-[96px] object-contain"
            /> */}

            <div>
              <p className="text-white text-sm md:text-base mb-1">
                Thế giới sản phẩm cho những chú chim cưng của bạn!
              </p>
              <h1 className="text-white text-2xl md:text-4xl font-bold leading-tight">
                Yêu Chim Cưng trọn niềm vui!
              </h1>
            </div>
          </div>
        </div>
      </div>
      <img
        alt="Bird"
        src="https://c.animaapp.com/mbqa0l7wK0NJ0W/img/img-4.png"
        className="hidden md:block absolute w-[120px] h-auto top-[150px] right-[550px] z-0 opacity-90 blur-[1px] pointer-events-none"
        //"hidden md:block absolute left-[35%] top-[15%] h-32 md:h-48 z-0 pointer-events-none"
        //"absolute w-[135px] h-[194px] top-[77px] left-1/2 -translate-x-1/2 opacity-10 blur-sm z-0"
      />

      {starIcons.map((star, index) => (
        <img
          key={`${star.src}-${index}`}
          className={`${star.className} z-0 pointer-events-none`}
          alt=""
          src={star.src}
        />
      ))}

    </header>
  );
}

export default Header;
