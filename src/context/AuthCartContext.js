import { createContext, useContext, useState } from "react";

const AuthCartContext = createContext();

export const AuthCartProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [user, setUser] = useState(null);  // 👉 Thêm user

  // ==== Auth ====
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // Lưu thông tin user bao gồm linkedId
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    resetCart();
    resetWishlist();
  };

  // ==== Cart & Wishlist ====
  const addToCart = () => setCartCount((n) => n + 1);
  const addToWishlist = () => setWishlistCount((n) => n + 1);
  const resetCart = () => setCartCount(0);
  const resetWishlist = () => setWishlistCount(0);

  return (
    <AuthCartContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        user,             // 👉 Truyền user ra ngoài context
        cartCount,
        wishlistCount,
        addToCart,
        addToWishlist,
        resetCart,
        resetWishlist,
      }}
    >
      {children}
    </AuthCartContext.Provider>
  );
};

export const useAuthCart = () => useContext(AuthCartContext);
