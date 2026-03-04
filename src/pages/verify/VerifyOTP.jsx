import React, { useState, useEffect } from "react";
import { Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { verifyOTP } from "../../api/VerifyOTP";
import { useAuthCart } from "../../context/AuthCartContext";
import { LoginAPI } from "../../api/Login";

const VerifyOTP = () => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuthCart(); // Countdown

  // useEffect(() => {
  //   if (countdown <= 0) {
  //     setExpired(true);
  //     return;
  //   }

  //   const timer = setTimeout(() => {
  //     setCountdown((prev) => prev - 1);
  //   }, 1000);

  //   return () => clearTimeout(timer);
  // }, [countdown]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading || success) return;

    setError("");

    if (otp.length !== 6) {
      setError("OTP phải có 6 số");
      return;
    }

    if (expired) {
      setError("Mã OTP đã hết hạn.");
      return;
    }

    try {
      setLoading(true);

      const data = await verifyOTP(otp);

      if (!data || !data.token) {
        throw new Error("OTP sai");
      }

      const { token, userId, name, linkedId } = data;

      // Lấy role từ sessionStorage (do Login.js truyền sang)
      const storedRole = sessionStorage.getItem("role");

      // Lưu token thật
      localStorage.setItem("token", token);

      // Lưu role vào localStorage để sử dụng sau này
      localStorage.setItem("role", storedRole);

      // Lưu vào context với storedRole chuẩn
      login({ userId, name, role: storedRole, linkedId, token });

      sessionStorage.removeItem("preAuthToken");

      setSuccess(true);
      setLoading(false);

      setTimeout(() => {
        if (storedRole === "Admin") {
          navigate("/admin-page");
        } else if (storedRole === "ShopOwner" || storedRole === "SalesStaff") {
          navigate("/shopowner");
        } else {
          navigate("/");
        }
      }, 1500);
    } catch (err) {
      setError("OTP không đúng hoặc đã hết hạn.");
      setLoading(false);
    }
  };
  // const handleResend = () => {
  //   if (loading) return;

  //   setOtp("");
  //   setError("");
  //   setExpired(false);
  //   setCountdown(300);
  //   setLoading(false);
  // };

  useEffect(() => {
    if (countdown <= 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const preAuthToken = sessionStorage.getItem("preAuthToken");
  const handleResend = async () => {
    if (!preAuthToken) {
      setError("Phiên đăng nhập không hợp lệ. Vui lòng đăng nhập lại.");
      return;
    }

    try {
      setError("");
      setExpired(false);

      await LoginAPI(null, null, preAuthToken);
      // hoặc gọi API resend nếu backend có

      setCountdown(60);
    } catch (err) {
      setError("Không thể gửi lại mã.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#083622] to-[#12ab3c] relative">
      {" "}
      {/* Popup Success {success && ( <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"> <div className="bg-white rounded-2xl p-6 w-80 text-center shadow-xl"> <div className="text-green-600 text-5xl mb-3">✓</div> <h3 className="text-lg font-bold text-gray-800 mb-2"> Xác minh thành công! </h3> <p className="text-gray-500 text-sm">Đang chuyển về trang chủ...</p> </div> </div> )} */}{" "}
      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 text-center">
        {" "}
        <div className="flex justify-center mb-6">
          {" "}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            {" "}
            <Mail className="text-green-600 w-8 h-8" />{" "}
          </div>{" "}
        </div>{" "}
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Xác thực OTP</h2>{" "}
        <p className="text-gray-500 mb-6">Bước xác minh bảo mật của bạn</p>{" "}
        <div className="bg-green-50 text-green-700 rounded-xl p-4 mb-4 text-sm">
          {" "}
          Nhập mã xác thực OTP đã được gửi từ email của bạn{" "}
        </div>{" "}
        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          <div>
            {" "}
            <label className="block text-left text-sm font-medium mb-2 text-gray-600">
              {" "}
              Mã OTP{" "}
            </label>{" "}
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
              maxLength={6}
              disabled={loading || success}
              className="w-full text-center text-3xl tracking-[10px] py-4 rounded-2xl border bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="------"
            />{" "}
          </div>{" "}
          <button
            type="submit"
            disabled={loading || expired || success}
            className="w-full py-3 rounded-xl font-semibold transition bg-orange-500 hover:bg-orange-600 text-white disabled:bg-gray-300 disabled:text-gray-500"
          >
            {" "}
            {loading ? "Đang xác thực..." : "Xác nhận OTP"}{" "}
          </button>{" "}
          <button
            type="button"
            onClick={handleResend}
            disabled={loading}
            className="w-full border border-green-600 text-green-600 py-3 rounded-xl font-semibold hover:bg-green-50 transition disabled:opacity-50"
          >
            {" "}
            Gửi lại mã{" "}
          </button>{" "}
          {!expired && !success && (
            <div className="text-sm text-gray-500">
              {" "}
              Mã có thể dùng trong {countdown}s{" "}
            </div>
          )}{" "}
          {expired && (
            <div className="text-red-600 text-sm">
              {" "}
              Mã đã hết hạn. Vui lòng yêu cầu mã mới.{" "}
            </div>
          )}{" "}
          {error && (
            <div className="text-red-600 text-sm font-medium">{error}</div>
          )}{" "}
        </form>{" "}
      </div>{" "}
    </div>
  );
};
export default VerifyOTP;
