// src/context/AuthCartContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthCartContext = createContext();

export const AuthCartProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);

  // Thêm hàm để đồng bộ cartCount từ localStorage
  const updateCartCountFromLocalStorage = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const count = cart.reduce((sum, item) => sum + (item.qty || 0), 0);
    setCartCount(count);
  };

 const addToCart = (id) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({ id, qty: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCountFromLocalStorage();
  };

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    updateCartCountFromLocalStorage(); // Khi login xong thì đồng bộ cartCount
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setCartCount(0); // Reset về 0 khi logout
    localStorage.removeItem("cart");
    localStorage.removeItem("token");
    localStorage.removeItem("linkedId");
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartCount(0);
  };

  useEffect(() => {
    updateCartCountFromLocalStorage(); // Gọi khi load lại page
  }, []);

  return (
    <AuthCartContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        cartCount,
        setCartCount,
        updateCartCountFromLocalStorage, // Export
        user,
        setUser,
        login,
        logout,
        clearCart,
        addToCart, 
      }}
    >
      {children}
    </AuthCartContext.Provider>
  );
};

export const useAuthCart = () => useContext(AuthCartContext);
