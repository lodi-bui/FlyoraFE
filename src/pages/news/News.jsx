import React, { useState, useEffect } from "react";

// Hàm format ngày kiểu Việt
const formatDateVN = (isoDate) => {
  const d = new Date(isoDate);
  return `${d.getDate()} tháng ${d.getMonth() + 1} năm ${d.getFullYear()}`;
};

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [sortType, setSortType] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Gọi API lấy danh sách bài viết
  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("https://flyora-backend.onrender.com/api/v1/news")
      .then((res) => res.json())
      .then((data) => setNewsList(Array.isArray(data) ? data : []))
      .catch(() => setError("Không tải được danh sách bài viết"))
      .finally(() => setLoading(false));
  }, []);

  // Sắp xếp bài viết theo sortType
  const sortedNews = [...newsList].sort((a, b) => {
    if (sortType === "latest") return new Date(b.date) - new Date(a.date);
    return new Date(a.date) - new Date(b.date);
  });

  return (
    <div className="min-h-screen bg-white px-4 py-10 border">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Tin tức mới nhất</h1>
          <div>
            <select
              value={sortType}
              onChange={(e) => setSortType(e.target.value)}
              className="border px-3 py-2 rounded text-sm focus:outline-none"
            >
              <option value="latest">Sort by latest</option>
              <option value="oldest">Sort by oldest</option>
            </select>
          </div>
        </div>

        {/* Loading, error, empty state */}
        {loading && <div className="text-center py-10">Đang tải...</div>}
        {error && <div className="text-center text-red-500 py-10">{error}</div>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-14">
            {sortedNews.length === 0 ? (
              <div className="col-span-2 text-center text-gray-500">
                Chưa có bài viết nào.
              </div>
            ) : (
              sortedNews.map((news) => (
                <div key={news.id || news._id}>
                  <a
                    href={news.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <div className="flex flex-col h-full">
                      <img
                        src={news.imageUrl}
                        alt={news.title}
                        className="w-full h-72 object-cover rounded bg-gray-100"
                      />
                    </div>
                    {/* ) : ( */}
                      <div className="w-full aspect-square bg-gray-200 rounded" />
                    {/* )} */}
                    <div className="mt-4">
                      <h3 className="font-medium underline underline-offset-2 group-hover:underline text-lg leading-snug text-black hover:underline cursor-pointer">
                        {news.title}
                      </h3>
                      <div className="mt-2 text-gray-400 text-[15px]">
                        {formatDateVN(news.createdAt)}
                      </div>
                    </div>
                  </a>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default News;
