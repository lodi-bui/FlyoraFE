import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import cartIcon from "../../icons/cart-shop.png";
import loveProduct from "../../icons/heart-shop.png";
import { useAuthCart } from "../../context/AuthCartContext";

const mockProducts = [
  {
    id: 1,
    name: "Product 1",
    price: 10.0,
    imageUrl: "https://via.placeholder.com/300x300?text=Product+1",
  },
  {
    id: 2,
    name: "Product 2",
    price: 15.0,
    imageUrl: "https://via.placeholder.com/300x300?text=Product+2",
  },

  {
    id: 3,
    name: "Product 3",
    price: 14.0,
    imageUrl: "https://via.placeholder.com/300x300?text=Product+2",
  },
  {
    id: 4,
    name: "Product 4",
    price: 17.0,
    imageUrl: "https://via.placeholder.com/300x300?text=Product+2",
  },
];

const BestSellingProducts = () => {
  const [products, setProducts] = useState([]);
  const { isLoggedIn, addToCart, addToWishlist } = useAuthCart();

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const handleAddToCart = (id) => {
    if (!isLoggedIn) {
      alert("Bạn phải đăng nhập để thêm vào giỏ hàng!");
      return;
    }
    addToCart(id);
  };

  const handleAddToWishlist = (id) => {
    if (!isLoggedIn) {
      alert("Bạn phải đăng nhập để thêm vào danh sách yêu thích!");
      return;
    }
    addToWishlist(id);
  };

  return (
    <div className="py-12 px-4 bg-white">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
        Best selling products
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {products.map((p) => (
          <NavLink to={`/products/${p.id}`} key={p.id} className="block h-full">
            <div
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-200 flex flex-col min-h-[350px] aspect-[4/5] p-6"
              style={{ willChange: "transform" }}
            >
              <img
                src={p.imageUrl}
                alt={p.name}
                className="w-full h-[180px] object-contain rounded-xl bg-gray-50"
              />
              <div className="flex-1 flex flex-col justify-between mt-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-[17px] leading-5 group-hover:underline">
                    {p.name}
                  </h3>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToWishlist(p.id);
                      }}
                      className="hover:scale-110 transition-transform"
                    >
                      <img
                        src={loveProduct}
                        alt="heart"
                        className="w-6 h-6"
                        style={{
                          filter:
                            "invert(48%) sepia(95%) saturate(2496%) hue-rotate(359deg) brightness(104%) contrast(100%)",
                        }}
                      />
                    </button>
                    <button
                      type="button"
                      tabIndex={-1}
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart(p.id);
                      }}
                      className="hover:scale-110 transition-transform"
                    >
                      <img
                        src={cartIcon}
                        alt="cart"
                        className="w-6 h-6"
                        style={{
                          filter:
                            "invert(48%) sepia(95%) saturate(2496%) hue-rotate(359deg) brightness(104%) contrast(100%)",
                        }}
                      />
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 font-semibold text-base mt-2">
                  ${p.price.toFixed(2)}
                </p>
              </div>
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default BestSellingProducts;
