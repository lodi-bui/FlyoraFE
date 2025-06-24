import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import phoneIcon from "../../icons/phone.png";
import mailIcon from "../../icons/mail.png";
import locationIcon from "../../icons/location.png";
import logoChim from "../../icons/logo-chim.png";
import logoBlack from "../../icons/logo_black.png";
import searchIcon from "../../icons/search.png";
import sunIcon from "../../icons/sun.png";
import cartIcon from "../../icons/cart.png";
import loginIcon from "../../icons/login.png";
import heartIcon from "../../icons/heart.png";
import { useAuthCart } from "../../context/AuthCartContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { cartCount, wishlistCount, isLoggedIn, logout } = useAuthCart();
  const [showMenu, setShowMenu] = useState(false);
  const [showNav, setNav] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", href: "/home" },
    { name: "Shop", href: "/shop" },
    { name: "About Us", href: "/about-us" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const starIcons = [
    {
      src: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-19.svg",
      className:
        "hidden md:block absolute w-[93px] h-[102px] top-[116px] left-[1241px]",
    },
    {
      src: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-20-1.svg",
      className:
        "hidden md:block absolute w-[93px] h-[102px] top-60 left-[1303px]",
    },
    {
      src: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-17.svg",
      className:
        "hidden md:block absolute w-[93px] h-[102px] top-[357px] left-[1340px]",
    },
    {
      src: "https://c.animaapp.com/mbqa0l7wK0NJ0W/img/star-16.svg",
      className:
        "hidden md:block absolute w-[93px] h-[102px] top-[419px] left-[1225px]",
    },
  ];

  // Xử lý bấm vào icon, nếu chưa login thì toast error, nếu đã login thì đi tới trang
  const handleProtectedClick = (action) => {
    if (!isLoggedIn) {
      if (action === "cart") toast.error("Bạn cần đăng nhập để xem giỏ hàng!");
      else if (action === "wishlist")
        toast.error("Bạn cần đăng nhập để xem danh sách yêu thích!");
      else toast.error("Bạn cần đăng nhập để truy cập!");
    } else {
      window.location.href = `/${action}`;
    }
  };

  return (
    <header className="relative w-full bg-gradient-to-tr from-[#12AB3C] to-[#083622] overflow-hidden pb-10 md:pb-16">
      {/* Top contact bar */}
      <div className="w-full mx-auto py-4 md:py-7 px-4 mt-0">
        <div className="flex flex-col md:flex-row justify-evenly items-center w-full max-w-7xl mx-auto gap-4 md:gap-0">
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            {[
              {
                icon: phoneIcon,
                text: "+84 3367 8915",
                label: "Phone number +84 3367 8915",
              },
              {
                icon: mailIcon,
                text: "ntrang21102005@gmail.com",
                label: "Email address ntrang21102005@gmail.com",
              },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <img src={item.icon} alt={item.label} className="w-5 h-5" />
                <span className="font-medium text-white text-sm md:text-base">
                  {item.text}
                </span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <img src={locationIcon} alt="Location icon" className="w-5 h-5" />
            <span className="font-medium text-white text-sm md:text-base whitespace-nowrap">
              12 Hoàng Hoa Thám, Q.3, TP.HCM
            </span>
          </div>
        </div>
      </div>

      <img
        src={sunIcon}
        alt="Decorative sun"
        className="hidden md:block absolute left-[35%] top-[15%] h-32 md:h-48 z-0"
      />

      <div
        className="relative z-10 bg-white rounded-full shadow-lg flex items-center justify-around px-4 
      md:px-8 my-4 md:mx-auto w-full max-w-4xl md:max-w-6xl mt-2 md:my-10 h-16 md:h-20"
      >
        <div className="flex items-center">
          <img
            src={logoBlack}
            alt="Flyora logo"
            className="w-22 md:w-26 h-auto"
          />
        </div>

        {/* Hamburger button for mobile */}
        <button
          className="md:hidden flex items-center"
          onClick={() => setNav(!showNav)}
          aria-label="Toggle mobile navigation"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={showNav ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation for desktop */}
        <nav
          className="hidden md:flex items-center space-x-6 text-lg md:text-xl font-semibold"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              end
              className={({ isActive }) =>
                isActive
                  ? "text-orange-500 border-b-2 border-orange-500 pb-1"
                  : "text-black hover:text-orange-500"
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Icons section */}
        <div className="flex items-center space-x-3 md:space-x-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              aria-label="Search products"
              className="border rounded-full px-3 py-1 w-32 sm:w-40 md:w-64 lg:w-80 pr-8 text-sm md:text-base"
            />
            <img
              src={searchIcon}
              alt="Search icon"
              className="absolute right-2 top-1.5 md:top-2 h-5 md:h-6"
            />
          </div>

          {/* Wishlist icon */}
          <button
            type="button"
            className="relative cursor-pointer"
            onClick={() => handleProtectedClick("wishlist")}
            aria-label="View wishlist"
          >
            <img src={heartIcon} alt="Wishlist icon" className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center">
              {wishlistCount}
            </span>
          </button>

          {/* Cart icon */}
          <button
            type="button"
            className="relative cursor-pointer"
            onClick={() => handleProtectedClick("cart")}
            aria-label="View cart"
          >
            <img src={cartIcon} alt="Cart icon" className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold w-4 h-4 md:w-5 md:h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Login menu */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="focus:outline-none"
              aria-haspopup="true"
              aria-expanded={showMenu}
              aria-label="User menu"
            >
              <img src={loginIcon} alt="User menu icon" className="w-6 h-6" />
            </button>

            {showMenu && (
              <div
                className="absolute right-0 mt-2 w-44 bg-white shadow-lg rounded-md z-50"
                role="menu"
              >
                {!isLoggedIn ? (
                  <>
                    <NavLink
                      to="/login"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 font-semibold"
                    >
                      Login
                    </NavLink>
                    <NavLink
                      to="/register"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100"
                    >
                      Register
                    </NavLink>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        setShowMenu(false);
                        toast.success("Đăng xuất thành công!");
                        navigate("/");
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 bg-white"
                      role="menuitem"
                    >
                      Đăng xuất
                    </button>
                    <NavLink
                      to="/orders"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Tra cứu đơn hàng
                    </NavLink>
                    <NavLink
                      to="/profile"
                      onClick={() => setShowMenu(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Thông tin cá nhân
                    </NavLink>
                    
                  </>
                )}
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Mobile navigation */}
      {showNav && (
        <nav
          className="md:hidden bg-white shadow-lg mx-4 rounded-md py-4"
          aria-label="Mobile navigation"
        >
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

      <div className="relative px-4 md:px-20 pt-4 md:pt-10 z-10">
        <div className="max-w-2xl mx-auto md:ml-20 md:mx-0">
          <img
            src={logoChim}
            alt="Flyora logo orange"
            className="w-40 md:w-64 mx-auto md:mx-0 mb-8 md:mb-12"
          />
          <h1 className="text-white text-3xl md:text-4xl font-bold leading-tight text-center md:text-left  mb-4 -mt-4 md:-mt-6">
            A pet store with <br /> everything you need
          </h1>
          <p className="text-white mt-4 text-sm md:text-base text-center md:text-left">
            Sociis blandit et pellentesque aliquet at quisque tortor lacinia
            nullam. Mattis aenean scelerisque dui libero
          </p>
        </div>
      </div>

      {starIcons.map((star) => (
        <img
          key={star.src}
          className={`${star.className} z-0 pointer-events-none`}
          alt="Decorative star"
          src={star.src}
        />
      ))}
    </header>
  );
}

export default Header;
