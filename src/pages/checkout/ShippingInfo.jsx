import React from "react";
import { FaTruck } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";

const ShippingInfo = ({ data, onChange }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Thông tin giao hàng</h2>

    <div className="flex items-center border-b pb-2 mb-6">
      <FaTruck className="text-green-500 text-2xl mr-2" />
      <span className="text-green-500 font-medium">Giao Hàng Tận Nơi</span>
      <MdLocationOn className="text-orange-500 text-2xl ml-auto" />
    </div>

    <div className="space-y-4">
      {[
        ["name", "Họ và Tên"],
        ["phone", "Số Điện Thoại"],
        ["email", "Email"],
        ["address", "Địa chỉ, tên đường"],
        ["city", "Tỉnh/TP, Quận/Huyện, Phường/Xã"],
      ].map(([key, placeholder]) => (
        <input
          key={key}
          name={key}
          value={data[key]}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border rounded-lg px-4 py-3 placeholder-gray-400"
        />
      ))}
    </div>
  </div>
);

export default ShippingInfo;
