import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { useAuthCart } from "../../../context/AuthCartContext";
import Sidebar from "pages/admin/sidebar/Sidebar";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from "../../../api/AddNewProduct";
import { generateDescriptionAI } from "../../../api/GenerateDescription";

const AddProduct = () => {
  const { logout } = useAuthCart();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    categoryId: "",
    birdTypeId: "",
    material: "",
    origin: "",
    usageTarget: "",
    weight: "",
    color: "",
    dimensions: "",
    imageUrl: "",
  });
  const [loading, setLoading] = useState(false);

  //state loading AI
  const [aiLoading, setAiLoading] = useState(false);

  // const handleGenerateAI = async () => {
  //   if (!product.name.trim()) {
  //     alert("Vui lòng nhập tên sản phẩm trước!");
  //     return;
  //   }

  //   try {
  //     const token = localStorage.getItem("token");
  //     setAiLoading(true);

  //     const res = await generateDescriptionAI(token, {
  //       ...product,
  //       price: Number(product.price) || 0,
  //       stock: Number(product.stock) || 0,
  //       weight: Number(product.weight) || 0,
  //     });

  //     setProduct((prev) => ({
  //       ...prev,
  //       description: res.data?.data?.description || "",
  //     }));
  //   } catch (error) {
  //     alert("Không thể tạo mô tả bằng AI!");
  //   } finally {
  //     setAiLoading(false);
  //   }
  // };

  const handleGenerateAI = async () => {
    if (!product.name.trim()) {
      alert("Vui lòng nhập tên sản phẩm trước!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      setAiLoading(true);

      const res = await generateDescriptionAI(token, {
        ...product,
        price: Number(product.price) || 0,
        stock: Number(product.stock) || 0,
        weight: Number(product.weight) || 0,
      });

      console.log("AI RESPONSE:", res);

      const generatedText =
        res?.data?.data?.description ||
        res?.data?.description ||
        res?.data ||
        null;

      //  CHỈ update nếu có text thật sự
      if (generatedText && generatedText.trim() !== "") {
        setProduct((prev) => ({
          ...prev,
          description: generatedText,
        }));
      } else {
        alert("AI không trả về nội dung mô tả!");
      }
    } catch (error) {
      console.error(error);
      alert("Không thể tạo mô tả bằng AI!");
    } finally {
      setAiLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   try {
  //     const token = localStorage.getItem("token");
  //     await addNewProduct(token, product);
  //     alert("Thêm sản phẩm thành công!");
  //     navigate("/shopowner/products");
  //   } catch (error) {
  //     alert("Lỗi khi thêm sản phẩm!");
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }

  //   //kiểm tra không cho nhập số âm
  //   if (product.price < 0 || product.stock < 0) {
  //     alert("Giá và số lượng tồn kho không được là số âm!");
  //     setLoading(false);
  //     return;
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const price = Number(product.price);
    const stock = Number(product.stock);
    const weight = Number(product.weight);
    const categoryId = Number(product.categoryId);
    const birdTypeId = Number(product.birdTypeId);

    // Validate bắt buộc
    if (!categoryId || !birdTypeId) {
      alert("Vui lòng nhập categoryId và birdTypeId hợp lệ!");
      return;
    }

    if (price < 0 || stock < 0) {
      alert("Giá và số lượng tồn kho không được là số âm!");
      return;
    }

    if (!product.description.trim()) {
      alert("Vui lòng nhập hoặc tạo mô tả sản phẩm!");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const payload = {
        name: product.name.trim(),
        description: product.description.trim(),
        price,
        stock,
        categoryId,
        birdTypeId,
        material: product.material.trim(),
        origin: product.origin.trim(),
        usageTarget: product.usageTarget.trim(),
        weight: weight || 0,
        color: product.color.trim(),
        dimensions: product.dimensions.trim(),
        imageUrl: product.imageUrl.trim(),
      };

      console.log("FINAL PAYLOAD:", payload);

      await addNewProduct(token, payload);

      alert("Thêm sản phẩm thành công!");
      navigate("/shopowner/products");
    } catch (error) {
      console.error("ADD PRODUCT ERROR:", error.response?.data || error);
      alert("Lỗi khi thêm sản phẩm!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/shopowner/products");
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">
                Thêm sản phẩm
              </h1>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <div className="bg-white rounded-lg shadow p-6 w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Tên sản phẩm
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={product.name}
                    onChange={handleChange}
                    placeholder="Tên sản phẩm"
                    className="p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Giá
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={handleChange}
                    placeholder="Giá"
                    className="p-3 border border-gray-300 rounded-lg"
                    onInvalid={(e) =>
                      e.target.setCustomValidity("Giá phải lớn hơn hoặc bằng 0")
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    min="0"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Số lượng tồn kho
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={product.stock}
                    onChange={handleChange}
                    placeholder="Tồn kho"
                    className="p-3 border border-gray-300 rounded-lg"
                    onInvalid={(e) =>
                      e.target.setCustomValidity(
                        "Số lượng tồn kho phải lớn hơn hoặc bằng 0",
                      )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                    min="0"
                    required
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    {/*Loại Sản phẩm (categoryId: 1-Thức ăn, 2-Đồ chơi, 3-Nội thất)*/}
                    Loại Sản phẩm
                  </label>
                  {/* <input
                    type="text"
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleChange}
                    min="1"
                    placeholder="ID danh mục"
                    className="p-3 border border-gray-300 rounded-lg"
                    required
                  /> */}

                  <select
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="" disabled hidden>
                      -- Chọn danh mục --
                    </option>
                    <option value="1">Thức ăn</option>
                    <option value="2">Đồ chơi</option>
                    <option value="3">Nội thất</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    {/*Loại chim (birdTypeId: 1-Chào mào, 2-Vẹt Xích, 3-Yến Phụng, 4-Chích Chòe) /> */}
                    Loại chim
                  </label>
                  {/* <input
                    type="text"
                    name="birdTypeId"
                    value={product.birdTypeId}
                    onChange={handleChange}
                    placeholder="ID loại chim"
                    className="p-3 border border-gray-300 rounded-lg"
                  /> */}

                  <select
                    name="birdTypeId"
                    value={product.birdTypeId}
                    onChange={handleChange}
                    className="p-3 border border-gray-300 rounded-lg"
                    required
                  >
                    <option value="" disabled hidden>
                      -- Chọn loại chim --
                    </option>
                    <option value="1">Chào mào</option>
                    <option value="2">Vẹt Xích</option>
                    <option value="3">Yến Phụng</option>
                  </select>
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Chất liệu
                  </label>
                  <input
                    type="text"
                    name="material"
                    value={product.material}
                    onChange={handleChange}
                    placeholder="Chất liệu"
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Xuất xứ
                  </label>
                  <input
                    type="text"
                    name="origin"
                    value={product.origin}
                    onChange={handleChange}
                    placeholder="Xuất xứ"
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Đối tượng sử dụng
                  </label>
                  <input
                    type="text"
                    name="usageTarget"
                    value={product.usageTarget}
                    onChange={handleChange}
                    placeholder="Đối tượng sử dụng"
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Khối lượng(kg)
                  </label>
                  <input
                    type="text"
                    name="weight"
                    value={product.weight}
                    onChange={handleChange}
                    placeholder="Khối lượng"
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Màu sắc
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={product.color}
                    onChange={handleChange}
                    placeholder="Màu sắc"
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Kích thước
                  </label>
                  <input
                    type="text"
                    name="dimensions"
                    value={product.dimensions}
                    onChange={handleChange}
                    placeholder="Kích thước"
                    className="p-3 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="flex flex-col space-y-2">
                  <label className="block text-lg font-medium text-gray-700">
                    Link hình ảnh
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={product.imageUrl}
                    onChange={handleChange}
                    placeholder="Link hình ảnh"
                    className="p-3 border border-gray-300 rounded-lg"
                    required
                  />
                </div>
              </div>
              {/* <div className="flex flex-col space-y-2 mt-6">
              <label className="block text-lg font-medium text-gray-700">Mô tả sản phẩm</label>
              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Mô tả sản phẩm"
                className="p-3 border border-gray-300 rounded-lg h-24 resize-none"
                required
              />
            </div> */}

              <div className="flex flex-col space-y-3 mt-6">
                <div className="flex justify-between items-center">
                  <label className="block text-lg font-medium text-gray-700">
                    Mô tả sản phẩm
                  </label>

                  <button
                    type="button"
                    onClick={handleGenerateAI}
                    disabled={aiLoading || !product.name.trim()}
                    className={`px-4 py-2 rounded text-white text-sm transition
        ${
          aiLoading || !product.name.trim()
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
                  >
                    {aiLoading ? "Đang tạo..." : "Tạo mô tả nhanh"}
                  </button>
                </div>

                <textarea
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                  placeholder="Mô tả sản phẩm sẽ hiển thị ở đây. Bạn có thể chỉnh sửa lại."
                  className="p-4 border border-gray-300 rounded-lg h-40 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center"
                  disabled={loading}
                >
                  <X className="w-4 h-4 mr-2" />
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center"
                  disabled={loading}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {loading ? "Đang gửi..." : "Thêm sản phẩm"}
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddProduct;
