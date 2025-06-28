import React, { useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import cartIcon from "../../icons/cart-shop.png";
// import loveProduct from "../../icons/heart-shop.png";
import toast from "react-hot-toast";
import { useAuthCart } from "../../context/AuthCartContext";
import { getProductsByCategory } from "../../api/Product";
import { getCategories } from "../../api/Categories";

const ProductFilterPage = () => {
  const { isLoggedIn, addToCart } = useAuthCart();
  const navigate = useNavigate();
  const location = useLocation();

  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = new URLSearchParams(location.search);
  const categoryId = params.get("categoryId");
  const search = params.get("search");

  // Lấy danh sách categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load categories.");
      }
    };
    fetchCategories();
  }, []);

  // Lấy danh sách sản phẩm theo category hoặc search
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const payload = {
          categoryId: categoryId ? parseInt(categoryId) : null,
          name: search || "",
          page: 0,
          size: 100,
        };

        const response = await getProductsByCategory(payload);
        setProduct(response.content || []);
      } catch (err) {
        console.error(err);
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [categoryId, search]);

  // Click vào category sẽ toggle chọn hoặc bỏ chọn
  const handleCategoryClick = (id) => {
    const isSelected = categoryId === String(id);
    const newParams = new URLSearchParams(location.search);

    if (isSelected) {
      newParams.delete("categoryId");
    } else {
      newParams.set("categoryId", id);
    }


    navigate(`/shop?${newParams.toString()}`);
  };

  const handleAddToCart = (id) => {
    if (!isLoggedIn) {
      toast.error("Bạn phải đăng nhập để thêm vào giỏ hàng!");
      return;
    }
    addToCart(id);
    toast.success("Đã thêm vào giỏ hàng! 🎉");
  };

  // const handleAddToWishlist = (id) => {
  //   if (!isLoggedIn) {
  //     alert("Bạn phải đăng nhập để thêm vào danh sách yêu thích!");
  //     return;
  //   }
  //   addToWishlist(id);
  // };

  return (
    <div className="min-h-screen bg-white text-black py-10 px-4 md:px-12">
      <div className="max-w-[1414px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Sidebar Filter */}
        <div className="space-y-8">
          <div>
            <h2 className="text-xl font-bold mb-2">Filter by categories</h2>
            <ul className="space-y-2 text-gray-800">

              {categories.map((cat) => {
                const isSelected = categoryId === String(cat.id);
                return (
                  <li key={cat.id}>
                    <button
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`w-full text-left ${
                        isSelected ? "font-bold text-orange-500" : ""
                      }`}
                    >
                      {cat.name}
                    </button>
                  </li>
                );
              })}

            </ul>
          </div>
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">

          {loading && (
            <div className="text-center text-gray-500 py-10">Loading...</div>
          )}
          {error && (
            <div className="text-center text-red-500 py-10">{error}</div>
          )}
          {!loading && !error && (
            <>
              <div className="flex justify-between items-center mb-6">
                <span className="text-gray-500">
                  Showing {product.length} products
                </span>
              </div>

              {product.length === 0 ? (
                <div className="text-center text-gray-500">
                  No products found.
                </div>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {product.map((p) => (
                    <NavLink
                      to={`/product/${p.id}`}
                      state={{ product: p }}
                      key={p.id}
                      className="block h-full"
                    >
                      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition flex flex-col h-full">

                        <img
                          src={p.imageUrl}
                          alt={p.name}
                          className="w-full h-[200px] object-cover rounded-xl"
                        />

                        <div className="mt-4 flex items-center justify-between">
                          <h3 className="font-semibold text-[16px] leading-5 max-w-[70%] truncate">
                            {p.name}
                          </h3>
                          <div className="flex gap-3 shrink-0">
                            <button
                              type="button"
                              tabIndex={-1}
                              // onClick={(e) => {
                              //   e.preventDefault();
                              //   handleAddToWishlist(p.id);
                              // }}
                              className="hover:scale-110 transition-transform"
                            >
                              {/* <img
                                src={loveProduct}
                                alt="heart"
                                className="w-5 h-5"
                              /> */}
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
                                className="w-5 h-5"
                              />
                            </button>
                          </div>
                        </div>
                        <p className="text-gray-600 text-[15px] mt-1">
                          {p.price} VND
                        </p>
                      </div>
                    </NavLink>
                  ))}

                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFilterPage;
