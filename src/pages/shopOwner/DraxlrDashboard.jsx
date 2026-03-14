import React, { useState } from "react";
import DraxlrEmbed from "react-draxlr-embed";
import { analyzeDashboardData } from "../../api/OpenAIAssistant";

// OpenAI API key (keep this secure in production)

const OPENAI_API_KEY = "";

const DraxlrDashboard = () => {
  // AI analysis state
  const [aiAnalysis, setAiAnalysis] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [customData, setCustomData] = useState("");
  const [useCustomData, setUseCustomData] = useState(false);
  const [userQuestion, setUserQuestion] = useState("");
  const [products, setProducts] = useState([]);

  // Extract dashboard data for AI analysis
  const getDashboardAnalysisData = () => {
    return products.map(({ productId, productName, totalSold, price }) => ({
      productId,
      productName,
      totalSold,
      price,
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
        setAiAnalysis(
          "Dữ liệu nhập vào không hợp lệ. Vui lòng nhập đúng định dạng JSON.",
        );
        setAiLoading(false);
        return;
      }
    } else {
      data = getDashboardAnalysisData();
    }
    const result = await analyzeDashboardData(
      data,
      OPENAI_API_KEY,
      userQuestion,
    );
    setAiAnalysis(result);
    setAiLoading(false);
  };

  return (
    <div className="w-full">
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
              drillThrough: [],
            },
            filters: {},
          }}
          iframeStyle={{
            width: "100%",
            minHeight: "600px",
            maxHeight: "1200px",
          }}
          onBeforeLoad={() => console.log("Loading...")}
          onAfterLoad={() => console.log("Load complete")}
          onError={(error) => console.error("Error:", error)}
        />
        {/* AI Analysis Form and Result */}
        <div className="mt-6">
          <label className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={useCustomData}
              onChange={(e) => setUseCustomData(e.target.checked)}
              className="mr-2"
            />
            Nhập dữ liệu tuỳ chỉnh (JSON)
          </label>
          {useCustomData && (
            <textarea
              className="w-full p-2 border rounded mb-2 text-sm font-mono"
              rows={5}
              placeholder='[{"productId":1,"productName":"A","totalSold":100,"price":20000}]'
              // eslint-disable-next-line react/jsx-no-duplicate-props
              placeholders='[{"productId":2,"productName":"A","totalSold":100,"price":20000}]'
              value={customData}
              onChange={(e) => setCustomData(e.target.value)}
            />
          )}
          <input
            type="text"
            className="w-full p-2 border rounded mb-2"
            placeholder="Nhập câu hỏi hoặc yêu cầu phân tích (ví dụ: Sản phẩm nào nên tập trung marketing?)"
            value={userQuestion}
            onChange={(e) => setUserQuestion(e.target.value)}
          />
          <button
            onClick={handleAnalyze}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
            disabled={aiLoading}
          >
            {aiLoading ? "Đang phân tích AI..." : "Phân tích dữ liệu với AI"}
          </button>
          {aiAnalysis && (
            <div className="mt-4 p-4 bg-gray-100 rounded border border-gray-300 whitespace-pre-line">
              <strong>Kết quả phân tích AI:</strong>
              <div>{aiAnalysis}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DraxlrDashboard;
