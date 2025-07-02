// src/context/AuthCartContext.js
import { createContext, useContext, useState, useEffect } from "react";

const AuthCartContext = createContext();

export const AuthCartProvider = ({ children }) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [user, setUser] = useState(null);  // 👉 Thêm user

  // ==== Auth ====
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData); // Lưu thông tin user bao gồm linkedId
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);

  };

  // ==== Cart & Wishlist ====
  // context/AuthCartContext.js
const addToCart = (productId) => {
  const current = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = current.find((item) => item.id === productId);

  if (existing) {
    existing.qty += 1;
  } else {
    current.push({ id: productId, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(current));

  // Cập nhật số lượng sản phẩm trong giỏ
  const totalQty = current.reduce((sum, item) => sum + item.qty, 0);
  setCartCount(totalQty);
};
useEffect(() => {
  const localCart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = localCart.reduce((sum, item) => sum + item.qty, 0);
  setCartCount(totalQty);
}, []);


  return (
    <AuthCartContext.Provider
      value={{
        isLoggedIn,


        login,
        logout,
        user,             // 👉 Truyền user ra ngoài context

        cartCount,
        addToCart,
        // updateQty,
        // removeFromCart,

      }}
    >
      {children}
      

    </AuthCartContext.Provider>
  );
};


export const useAuthCart = () => useContext(AuthCartContext);