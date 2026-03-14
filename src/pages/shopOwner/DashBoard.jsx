import React, { useState, useEffect } from "react";
import { LogOut, BarChart3, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuthCart } from "../../context/AuthCartContext";
import toast from "react-hot-toast";
import { getDashboardData } from "../../api/DashBoard";

import DraxlrEmbed from 'react-draxlr-embed';
import { analyzeDashboardData } from '../../api/OpenAIAssistant';

// OpenAI API key (keep this secure in production)
const OPENAI_API_KEY = "";

const ITEMS_PER_PAGE = 8;

// Utility function to format currency
const formatCurrency = (amount) => {
  if (typeof amount !== "number") return amount;
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "VND",
    minimumFractionDigits: 0,
  });
};

const DashBoard = () => {
  const navigate = useNavigate();
  const { logout } = useAuthCart();
  const [products, setProducts] = useState([]);

  // AI analysis state
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [customData, setCustomData] = useState("");
  const [useCustomData, setUseCustomData] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");

  const [currentPage, setCurrentPage] = useState(1);

  // Extract dashboard data for AI analysis
  const getDashboardAnalysisData = () => {
    return products.map(({ productId, productName, totalSold, price }) => ({
      productId,
      productName,
      totalSold,
      price
    }));
  };

  // Trigger AI analysis
  const handleAnalyze = async () => {
    setAiLoading(true);
    setAiAnalysis("");
    let data;
    if (useCustomData && customData) {
      try {
        data = JSON.parse(customData);
      } catch (e) {
        setAiAnalysis("Dữ liệu nhập vào không hợp lệ. Vui lòng nhập đúng định dạng JSON.");
        setAiLoading(false);
        return;
      }
    } else {
      data = getDashboardAnalysisData();
    }
    const result = await analyzeDashboardData(data, OPENAI_API_KEY, userQuestion);
    setAiAnalysis(result);
    setAiLoading(false);
  };

  const totalPages = Math.ceil(products.length / ITEMS_PER_PAGE);

  const paginatedProducts = products.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token"); // Lấy token sau khi đăng nhập
      try {
        const res = await getDashboardData(token);
        if (Array.isArray(res)) {
          const mapped = res.map((p, index) => ({
            rank: index + 1,
            productId: p.productId,
            productName: p.productName,
            imageUrl: p.imageUrl,
            totalSold: p.totalSold,
            price: p.price,
          }));

          setProducts(mapped);
        }
      } catch (error) {
        console.error("Dashboard fetch error:", error);
      }
    };

    fetchData();
  }, []);

  return (

    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-green-600 text-white flex flex-col sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="flex items-center p-6 border-b border-green-500">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center">
              <span className="text-green-600 font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold">Flyora</span>
          </div>
        </div>

        {/* Navigation */}

        <nav className="mt-8 flex-1">
          <div className="px-4 mb-2">
            <span className="text-sm font-medium text-green-200">Main</span>
          </div>
          <ul className="space-y-2 px-4">
            <li>
              <a
                href="/shopowner/products"
                className="flex items-center px-4 py-3 text-green-100 hover:bg-green-500 rounded-lg transition-colors"
              >
                <Package className="w-5 h-5 mr-3" />
                <span>Product</span>
              </a>
            </li>
            <li>
              <a
                href="/shopowner/dashboard"
                className="flex items-center px-4 py-3 bg-green-500 rounded-lg"
              >
                <BarChart3 className="w-5 h-5 mr-3" />
                <span className="font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <button
                onClick={() => {
                  logout();
                  toast.success("Đăng xuất thành công!");
                  navigate("/");
                }}
                className="w-full text-left flex items-center px-4 py-3 text-red-200 hover:bg-green-500 rounded-lg font-medium transition-colors"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold text-gray-900">DashBoard</h1>
            </div>

            {/* Search */}
            <div className="flex items-center space-x-4">
              {/* User Profile */}
              <div className="flex items-center space-x-3">
                <div></div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow">
            {/* Top Products Header */}
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">

                Danh sách sản phẩm bán chạy
              </h2>
            </div>

              {/* Draxlr Dashboard Embed */}
              <div className="my-8">
                <DraxlrEmbed
                  id="69b4fdb1d41c4174c67d338f"
                  apiKey="gb5x8deyn3ta6oxbxl3elr0dsu6il8qiefy0y97n"
                  apiSecret="$2a$10$ic/R1YSOw/B82cPbTSyBDeWP0HjRhrvVkjpU1ndKFASbdeLCXe/hO"
                  type="dashboardGroup"
                  options={{
                    configuration: {
                      hideHeader: false,
                      showExport: false,
                      showExportPdf: false,
                      showExportExcel: false,
                      drillDownFields: {},
                      backgroundColor: "#ffffff",
                      cardBackgroundColor: null,
                      viewData: [],
                      drillThrough: []
                    },
                    filters: {}
                  }}
                  iframeStyle={{ width: '100%', minHeight: '600px', maxHeight: '1200px' }}
                  onBeforeLoad={() => console.log('Loading...')}
                  onAfterLoad={() => console.log('Load complete')}
                  onError={(error) => console.error('Error:', error)}
                />
                  {/* AI Analysis Form and Result */}
                  <div className="mt-6">
                    <label className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={useCustomData}
                        onChange={e => setUseCustomData(e.target.checked)}
                        className="mr-2"
                      />
                      Nhập dữ liệu tuỳ chỉnh (JSON)
                    </label>
                    {useCustomData && (
                      <textarea
                        className="w-full p-2 border rounded mb-2 text-sm font-mono"
                        rows={5}
                        placeholder='[{"productId":1,"productName":"A","totalSold":100,"price":20000}]'
                        value={customData}
                        onChange={e => setCustomData(e.target.value)}
                      />
                    )}
                    <input
                      type="text"
                      className="w-full p-2 border rounded mb-2"
                      placeholder="Nhập câu hỏi hoặc yêu cầu phân tích (ví dụ: Sản phẩm nào nên tập trung marketing?)"
                      value={userQuestion}
                      onChange={e => setUserQuestion(e.target.value)}
                    />
                    <button
                      onClick={handleAnalyze}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                      disabled={aiLoading}
                    >
                      {aiLoading ? 'Đang phân tích AI...' : 'Phân tích dữ liệu với AI'}
                    </button>
                    {aiAnalysis && (
                      <div className="mt-4 p-4 bg-gray-100 rounded border border-gray-300 whitespace-pre-line">
                        <strong>Kết quả phân tích AI:</strong>
                        <div>{aiAnalysis}</div>
                      </div>
                    )}
                  </div>
              </div>

            {/* Products Table */}
            <div className="overflow-x-auto">
              <table className="w-full table-fixed">
                <thead className="bg-gray-50 text-center">
                  <tr>
                    <th className="w-[50px] px-2 py-3 text-sm font-medium text-gray-700">

                      Top
                    </th>
                    <th className="w-[100px] px-2 py-3 text-sm font-medium text-gray-700">
                      ID
                    </th>
                    <th className="w-[200px] px-2 py-3 text-sm font-medium text-gray-700">
                      Tên sản phẩm
                    </th>
                    <th className="w-[100px] px-2 py-3 text-sm font-medium text-gray-700">
                      Hình ảnh
                    </th>
                    <th className="w-[180px] px-2 py-3 text-sm font-medium text-gray-700">
                      Độ phổ biến
                    </th>
                    <th className="w-[100px] px-2 py-3 text-sm font-medium text-gray-700">
                      Tổng số bán
                    </th>
                    <th className="w-[120px] px-2 py-3 text-sm font-medium text-gray-700">
                      Giá
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 text-center">
                  {paginatedProducts.map((product, index) => (
                    <tr
                      key={product.productId || index}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4">
                        {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                      </td>
                      <td className="px-6 py-4">#{product.productId}</td>
                      <td className="px-6 py-4">{product.productName}</td>

                      {/* 👇 Thêm cột hình ảnh */}
                      <td className="px-6 py-4">
                        <img
                          src={product.imageUrl}
                          alt={product.productName}
                          className="w-12 h-12 object-contain mx-auto rounded"
                        />
                      </td>

                      <td className="px-6 py-4">
                        <div className="w-28 mx-auto">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-400 h-2 rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min(
                                  (product.totalSold /
                                    Math.max(
                                      ...products.map((p) => p.totalSold),
                                      1
                                    )) *
                                    100,
                                  100
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-green-600">
                        {product.totalSold}
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {formatCurrency(product.price)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-col items-center px-6 py-4 border-t border-gray-200 space-y-2">
                <span className="text-sm text-gray-500">

                  Trang {currentPage} trên {totalPages}
                </span>
                <div className="flex items-center space-x-1">
                  <button
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                      currentPage === 1 
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    ←
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                        currentPage === i + 1
                          ? "bg-red-500 text-white"
                          : "text-gray-500 hover:bg-gray-100"
                      }`}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium ${
                      currentPage === totalPages
                        ? "text-gray-300 cursor-not-allowed"
                        : "text-gray-500 hover:bg-gray-100"
                    }`}
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashBoard;
