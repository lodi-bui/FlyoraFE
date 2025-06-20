import { createContext, useContext, useState } from "react";

const AuthCartContext = createContext();

export const AuthCartProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);      // 👤
  const [cartCount, setCartCount] = useState(0);            // 🛒
  const [wishlistCount, setWishlistCount] = useState(0);    // 💓

  // auth
  const login  = () => setIsLoggedIn(true);
  const logout = () => setIsLoggedIn(false);

  // cart & wishlist
  const addToCart      = () => setCartCount((n) => n + 1);
  const addToWishlist  = () => setWishlistCount((n) => n + 1);
  const resetCart      = () => setCartCount(0);
  const resetWishlist  = () => setWishlistCount(0);

  return (
    <AuthCartContext.Provider
      value={{
        isLoggedIn,
        login,
        logout,
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
