// src/context/AuthCartContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthCartContext = createContext();

export const AuthCartProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => localStorage.getItem("isLoggedIn") === "true"
  );

  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  // tính lại cartCount dựa vào cartItems
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // Đồng bộ isLoggedIn
  useEffect(() => {
    if (isLoggedIn) localStorage.setItem("isLoggedIn", "true");
    else localStorage.removeItem("isLoggedIn");
  }, [isLoggedIn]);

  // Đồng bộ cartItems mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Các method thêm/xóa/cập nhật vẫn như cũ
  const addToCart = (item) => {
    setCartItems((prev) => {
      const exists = prev.find((p) => p.id === item.id);
      if (exists) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };
  const updateQty = (id, qty) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };
  const resetCart = () => {
    setCartItems([]);
    setIsLoggedIn(false);
    localStorage.removeItem("cartItems");
  };

  return (
    <AuthCartContext.Provider
      value={{
        isLoggedIn,
        login: () => setIsLoggedIn(true),
        logout: () => resetCart(),
        cartItems,
        cartCount,
        addToCart,
        updateQty,
        removeFromCart,
        resetCart,
      }}
    >
      {children}
    </AuthCartContext.Provider>
  );
};


export const useAuthCart = () => useContext(AuthCartContext);
