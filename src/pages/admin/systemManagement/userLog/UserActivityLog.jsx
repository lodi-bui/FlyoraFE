import React from "react";
import { FaSearch } from "react-icons/fa";

const logs = [
  {
    time: "01/01/2026 08:47:55",
    id: 1,
    username: "User1",
    role: "Customer",
    id: 2,
    username: "User2",
    role: "Admin",
    detail: "Thay đổi quyền truy cập của tài khoản User3",
  },
  {
    detail: "Đặt đơn hàng mã #DH2023 với 3 sản phẩm",
  },
  {
    time: "01/01/2026 08:47:55",
    time: "01/01/2026 08:47:55",
    id: 3,
    username: "User3",
    role: "Sale Staff",
    detail: "Cập nhật trạng thái đơn hàng #DH8899 sang 'Đang giao'",
  },
  {
    time: "01/01/2026 08:47:55",
    id: 4,
    username: "User4",
    role: "Shop Owner",
    detail: "Thêm sản phẩm mới 'Thức ăn cho chim hồng tước 2025' vào cửa hàng",
  },
  {
    time: "01/01/2026 08:47:55",
    id: 5,
    username: "User5",
    role: "Customer",
    detail: "Đặt đơn hàng mã #DH2023 với 4 sản phẩm",
  },
  {
    time: "01/01/2026 08:47:55",
    id: 6,
    username: "User6",
    role: "Sale Staff",
    detail: "Xóa sản phẩm 'lồng chim 2045'",
  },
  {
    time: "01/01/2026 08:47:55",
    id: 7,
    username: "User1",
    role: "Customer",
    detail: "Đánh giá sản phẩm 'Nhà nuôi chim đại bàng' - 5 sao",
  },
];

const UserActivityLog = () => {
  return (
    <div className="flex-1 bg-white p-6 overflow-x-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">User Activity Log</h2>
        <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="Search here"
            className="bg-transparent outline-none text-sm"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm border">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">TIME</th>
              <th className="p-2 border">ID</th>
              <th className="p-2 border">USERNAME</th>
              <th className="p-2 border">ROLE</th>
              <th className="p-2 border">THÔNG TIN CHI TIẾT</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="p-2 border">{log.time}</td>
                <td className="p-2 border">{log.id}</td>
                <td className="p-2 border">{log.username}</td>
                <td className="p-2 border">{log.role}</td>
                <td className="p-2 border">{log.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserActivityLog;
