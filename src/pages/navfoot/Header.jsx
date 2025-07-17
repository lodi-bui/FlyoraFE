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

import { FaLocationDot } from "react-icons/fa6";
import { useAuthCart } from "../../context/AuthCartContext";

function Header() {
  const { cartCount, isLoggedIn, logout } = useAuthCart();
  const [showMenu, setShowMenu] = useState(false);
  const [showNav, setNav] = useState(false);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const customerId = localStorage.getItem("linkedId");

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
      else if (action === "wishlist")
        toast.error("Bạn cần đăng nhập để xem danh sách yêu thích!");
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

  return (
    <header className="relative w-full bg-white px-[200px]" >
      {/* draft */}
      <div className="flex justify-between items-center w-full">
        {/* Logo and Navigation */}
        <div>
          <img src={logoBird} alt="Flyora Logo" className="w-50" />
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
            <span className="absolute -top-2 -right-2 bg-orange-500 text-black text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
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

      {/* Mobile nav */}
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
      {/* Banner section */}
      <div className="w-full flex justify-center">
        <img src={bannerImg} alt="Banner" />
      </div>
    </header>
  );
}

export default Header;
