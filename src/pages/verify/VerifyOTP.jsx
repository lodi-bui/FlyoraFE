import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../../api/VerifyOTP";
import { useAuthCart } from "../../context/AuthCartContext";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthCart();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (otp.length !== 6) {
      setError("OTP phải có 6 số");
      return;
    }

    setLoading(true);

    try {
      const data = await verifyOTP(otp);

      const { token, userId, name, role, linkedId } = data;

      // Lưu JWT thật
      localStorage.setItem("token", token);

      // login context
      login({ userId, name, role, linkedId, token });

      // Xóa token tạm
      sessionStorage.removeItem("preAuthToken");

      // redirect theo role
      if (role === "Admin") {
        navigate("/admin-page");
      } else if (role === "ShopOwner" || role === "SalesStaff") {
        navigate("/shopowner");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("OTP không đúng hoặc đã hết hạn.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-700 to-green-400">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Xác thực OTP</h2>

        <p className="text-gray-500 mb-6">
          Nhập mã OTP đã được gửi đến email của bạn
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Nhập OTP (6 số)"
            maxLength={6}
            className="w-full px-4 py-3 text-center text-lg border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          {error && (
            <div className="text-red-500 text-sm font-semibold">{error}</div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-lg transition"
          >
            {loading ? "Đang xác thực..." : "Xác nhận OTP"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyOTP;
