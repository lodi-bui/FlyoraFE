// src/pages/cart/CartPage.jsx
import React, { useState, useEffect, useMemo } from "react";
import Header from "../navfoot/Header";
import Footer from "../navfoot/Footer";
import CartItem from "./CartItem";
import { useNavigate } from "react-router-dom";
import { MdRadioButtonUnchecked, MdRadioButtonChecked } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { getCart } from "../../api/Cart";

const CartPage = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [setEmptyCart] = useState(false);

  // ✅ Load từ localStorage và fetch thông tin sản phẩm từ API
  const location = useLocation();

  // ✅ Sử dụng useLocation để theo dõi thay đổi URL
  // ✅ Khi URL thay đổi, sẽ tự động gọi lại hàm fetchCartItems để cập nhật giỏ hàng

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true);
      try {
        const rawCart = JSON.parse(localStorage.getItem("cart")) || [];

        // ✅ Lọc bỏ item không hợp lệ (id undefined/null hoặc không có qty)

        const localCart = rawCart.filter(
          (item) =>
            item &&
            item.id !== undefined &&
            item.id !== null &&
            typeof item.id === "number" &&
            item.qty > 0
        );

        if (localCart.length === 0) {
          setItems([]);
          setLoading(false);
          return;
        }

        const productData = await getCart(localCart);

        const merged = productData.map((prod) => {
          const match = localCart.find(
            (c) => c.id === prod.id || c.id === prod.productId
          );
          return {
            id: prod.id || prod.productId,
            name: prod.name,
            img: prod.imageUrl,
            price: prod.price,
            originalPrice: prod.price * 1.2,
            qty: match ? match.qty : 1,
            selected: true,
          };
        });

        setItems(merged);
      } catch (err) {
        console.error("Lỗi khi fetch giỏ hàng:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, [location]);

  const syncToLocalStorage = (updated) => {
    const simplified = updated
      .filter((it) => typeof it.qty === "number" && it.qty > 0)
      .map(({ id, qty }) => ({ id, qty }));

    localStorage.setItem("cart", JSON.stringify(simplified));
  };

  const toggleSelect = (id) => {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, selected: !it.selected } : it))
    );
  };

  const changeQty = (id, newQty) => {
    if (!Number.isInteger(newQty) || newQty < 1) {
      removeItem(id); // Nếu số lượng không hợp lệ thì xóa luôn

    } else {
      const updated = items.map((it) =>
        it.id === id ? { ...it, qty: newQty } : it
      );
      setItems(updated);
      syncToLocalStorage(updated);
    }
  };

  const removeItem = (id) => {
    const updated = items.filter((it) => it.id !== id);
    setItems(updated);
    syncToLocalStorage(updated);
  };

  const toggleSelectAll = () => {
    const allSelected = items.every((it) => it.selected);
    setItems((prev) => prev.map((it) => ({ ...it, selected: !allSelected })));
  };

  const selectedItems = useMemo(
    () => items.filter((it) => it.selected),
    [items]
  );
  const total = useMemo(
    () => selectedItems.reduce((sum, it) => sum + it.price * it.qty, 0),
    [selectedItems]
  );

  // const handleCheckout = async () => {
  //   try {
  //     const payload = selectedItems.map((item) => ({
  //       productId: item.id,
  //       quantity: item.qty,
  //     }));

  //     await axios.post(
  //       "https://flyora-backend.onrender.com/api/v1/checkout",
  //       payload
  //     );

  //     navigate("/checkout");
  //   } catch (err) {
  //     console.error("Checkout error:", err);
  //     alert("Thanh toán thất bại!");
  //   }
  // };

  if (loading) return <p className="text-center py-20">Đang tải giỏ hàng...</p>;

  return (
    <>
      <Header />

      <div className="max-w-4xl mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-center mb-8">🛒 Giỏ Hàng</h1>

        {/* Select All */}
        <div className="flex items-center mb-4">
          <button onClick={toggleSelectAll} className="text-2xl mr-2">
            {items.every((it) => it.selected) ? (
              <MdRadioButtonChecked className="text-green-500" />
            ) : (
              <MdRadioButtonUnchecked className="text-gray-400" />
            )}
          </button>
          <span className="text-lg text-gray-700">Chọn tất cả</span>
        </div>

        {/* Danh sách sản phẩm */}
        <div className="space-y-6">
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

        {/* Tổng cộng và nút thanh toán */}
        <div className="mt-10 flex items-center justify-between border-t pt-6">
          <p className="text-xl font-medium">
            Tổng cộng:{" "}
            <span className="text-red-500 font-semibold">
              {total.toLocaleString()}₫
            </span>
          </p>

          <button
            // onClick={handleCheckout}
            onClick={() => {
              if (selectedItems.length === 0) {
                alert("Bạn cần thêm sản phẩm vào giỏ hàng!");
                return;
              }
              navigate("/checkout");
            }}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg shadow-md"
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
