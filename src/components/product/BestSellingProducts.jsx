import React, { useState, useEffect } from "react";
import cartIcon from "../../icons/cart-shop.png";
import { useAuthCart } from "../../context/AuthCartContext";
import loveProduct from "../../icons/heart-shop.png";

// 🔸 Mock dữ liệu - sau này bạn chỉ cần replace bằng data từ API
const Categories = [
  { name: "Furniture", count: 21 },
  { name: "Food", count: 80 },
  { name: "Toys", count: 90 },
];

const Tags = ["Parrot", "Toys", "Chào máo"];

const PopularProducts = [
  { name: "Premium Dog Food", price: 99 },
  { name: "Premium Cat Food", price: 220 },
  { name: "Cat Bed", price: 50 },
  { name: "Dog Leash", price: 220 },
];

const ProductFilterPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(3); // sau này set từ API
  const [productsPerPage] = useState(9);
  const [totalResults] = useState(14); // sau này set từ API
  const startResult = (currentPage - 1) * productsPerPage + 1;
  const endResult = Math.min(currentPage * productsPerPage, totalResults);

  useEffect(() => {
    const mockData = Array.from({ length: 9 }, (_, index) => ({
      id: (currentPage - 1) * 9 + index + 1,
      name: `Product ${(currentPage - 1) * 9 + index + 1}`,
      price: (10 + index * 5).toFixed(2),
      imageUrl: "https://via.placeholder.com/270x270?text=Product",
    }));
    setProducts(mockData);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    let pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded ${
            currentPage === i
              ? "bg-orange-500 text-white"
              : "border border-gray-400 text-gray-800"
          }`}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  const { isLoggedIn, addToCart, addToWishlist } = useAuthCart();

  const handleAddToCart = () => {
    if (!isLoggedIn) {
      alert("Bạn phải đăng nhập để thêm vào giỏ hàng!");
      return;
    }
    addToCart();
  };

  const handleAddToWishlist = () => {
    if (!isLoggedIn) {
      alert("Bạn phải đăng nhập để thêm vào danh sách yêu thích!");
      return;
    }
    addToWishlist();
  };

  return (
    <div className="min-h-screen bg-white text-black py-10 px-4 md:px-12">
      <div className="max-w-[1414px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Sidebar Filter */}
        <div className="space-y-8">
          {/* Categories */}
          <div>
            <h2 className="text-xl font-bold mb-2">Filter by categories</h2>
            <ul className="space-y-2 text-gray-800">
              {Categories.map((bird) => (
                <li
                  key={bird.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span>{bird.name}</span>
                  </div>
                  <span className="bg-gray-100 text-orange-500 text-sm font-semibold px-2.5 py-0.5 rounded-full">
                    {bird.count}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price Filter */}
          <div>
            <h2 className="text-xl font-bold mb-2">Filter by Price</h2>
            <input
              type="range"
              min="9"
              max="399"
              className="w-full accent-orange-500"
            />
            <div className="flex items-center justify-between mt-2 gap-4">
              <div className="text-sm">Price: $9 - $399</div>
              <button className="px-4 py-1 bg-black text-white rounded-xl text-[16px] font-semibold">
                Apply
              </button>
            </div>
          </div>

          {/* Tags */}
          <div>
            <h2 className="text-xl font-bold mb-2">Filter by tags</h2>
            <div className="flex flex-wrap gap-2">
              {Tags.map((tag) => (
                <button
                  key={tag}
                  className="bg-gray-100 text-black px-3 py-1 rounded"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Popular products */}
          <div>
            <h2 className="text-xl font-bold mb-2">Popular products</h2>
            <div className="space-y-4">
              {PopularProducts.map((prod, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <img
                    src="https://via.placeholder.com/50"
                    alt={prod.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <div className="font-semibold text-sm">{prod.name}</div>
                    <div className="text-xs text-gray-600">${prod.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <span className="text-gray-500">
              Showing {startResult}–{endResult} of {totalResults} results
            </span>

            <select className="bg-white border border-gray-400 text-gray-800 px-4 py-2 rounded">
              <option>Sort by latest</option>
              <option>Sort by price</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <div
                key={p.id}
                className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm 
                hover:shadow-lg hover:-translate-y-1 transition duration-200"
                style={{ willChange: "transform" }}
              >
                <img
                  src={p.imageUrl}
                  alt={p.name}
                  className="w-full h-[200px] object-cover rounded-xl"
                />
                {/* --- info row (name + icons) --- */}
                <div className="mt-4 flex items-center justify-between">
                  <h3 className="font-semibold text-[16px] leading-5 max-w-[70%] truncate">
                    {p.name}
                  </h3>
                  <div className="flex gap-3 shrink-0">
                    <button
                      onClick={handleAddToWishlist}
                      className="hover:scale-110 transition-transform"
                    >
                      <img src={loveProduct} alt="heart" className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleAddToCart}
                      className="hover:scale-110 transition-transform"
                    >
                      <img src={cartIcon} alt="cart" className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 text-[15px] mt-1">${p.price}</p>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-10">
            {renderPageNumbers()}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border border-gray-400 text-gray-800 px-3 py-1 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilterPage;
