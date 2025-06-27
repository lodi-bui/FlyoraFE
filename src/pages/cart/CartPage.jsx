import React, { useState, useEffect, useMemo } from "react";
import Header from "../navfoot/Header";
import Footer from "../navfoot/Footer";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";

const CartPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch giỏ hàng khi mount
  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      try {
        // TODO: gọi API GET /cart và setItems(res.data.items)
        setItems([
          {
            id: 3,
            name: "Product 3",
            img: "/images/product3.jpg",
            price: 50000,
            originalPrice: 65000,
            qty: 2,
            selected: true,
          },
          {
            id: 7,
            name: "Product 7",
            img: "/images/product7.jpg",
            price: 60000,
            originalPrice: 75000,
            qty: 1,
            selected: true,
          },
          {
            id: 8,
            name: "Product 8",
            img: "/images/product8.jpg",
            price: 100000,
            originalPrice: 115000,
            qty: 1,
            selected: true,
          },
          {
            id: 13,
            name: "Product 13",
            img: "/images/product13.jpg",
            price: 150000,
            originalPrice: 165000,
            qty: 2,
            selected: false,
          },
        ]);
      } catch (err) {
        console.error("Lỗi fetch cart:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  // 2. Handlers
  const toggleSelect = (id) =>
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, selected: !it.selected } : it))
    );

  const changeQty = (id, newQty) => {
    if (newQty < 1) {
      // nếu số lượng giảm dưới 1 thì xoá item
      removeItem(id);
    } else {
      setItems((prev) =>
        prev.map((it) => (it.id === id ? { ...it, qty: newQty } : it))
      );
    }
    // TODO: gọi API PATCH hoặc DELETE tương ứng
  };

  const removeItem = (id) =>
    setItems((prev) => prev.filter((it) => it.id !== id));

  // 3. Select All
  const allSelected = items.length > 0 && items.every((it) => it.selected);
  const toggleSelectAll = () =>
    setItems((prev) => prev.map((it) => ({ ...it, selected: !allSelected })));

  // 4. Tính tổng
  const selectedItems = useMemo(
    () => items.filter((it) => it.selected),
    [items]
  );
  const total = useMemo(
    () => selectedItems.reduce((sum, it) => sum + it.price * it.qty, 0),
    [selectedItems]
  );

  if (loading) {
    return <p className="text-center py-20">Đang tải giỏ hàng...</p>;
  }

  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto p-8 bg-white shadow my-12">
        <h1 className="text-2xl font-bold text-center mb-4">Giỏ Hàng</h1>
        <hr />

        {/* Select All */}
        <div className="flex items-center space-x-4 mt-6 mb-4">
          <button
            onClick={toggleSelectAll}
            className="text-2xl focus:outline-none"
          >
            {allSelected ? (
              <MdRadioButtonChecked className="text-green-500" />
            ) : (
              <MdRadioButtonUnchecked className="text-gray-400" />
            )}
          </button>
          <span className="text-lg">Select All</span>
        </div>

        {/* Danh sách CartItem */}
        <div>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onToggleSelect={toggleSelect}
              onQtyChange={changeQty}
              onRemove={removeItem}
            />
          ))}
        </div>

        {/* Tổng cộng + nút Mua Hàng */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <span className="text-lg font-semibold">Tổng Cộng</span>
            <span className="ml-4 text-xl font-bold text-red-500">
              {total.toLocaleString()}₫
            </span>
          </div>

          <button
            disabled={selectedItems.length === 0}
            className={`px-6 py-3 rounded-lg text-white font-medium shadow transition ${
              selectedItems.length
                ? "bg-red-400 hover:bg-red-500"
                : "bg-gray-300 cursor-not-allowed"
            }`}
            onClick={() => navigate("/checkout")}
            /* TODO: gọi API checkout với selectedItems */
          >
            Mua Hàng ({selectedItems.length})
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
