import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "pages/navfoot/Header";
import Footer from "pages/navfoot/Footer";
import { getProductDetail } from "api/ProductDetail";
import { getProductsByCategory } from "api/Product";
import { getPromotions } from "api/Promotions";
import { submitReview, getReviewsByProductId } from "api/Review";
import { Card, CardContent } from "components/ui/Card";
import { Button } from "components/ui/Button";
import { Badge } from "components/ui/Badge";
import { Separator } from "components/ui/Separator";
import { Table, TableBody, TableCell, TableRow } from "components/ui/Table";
import { StarIcon } from "lucide-react";
import toast from "react-hot-toast";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "components/ui/Carousel";
import { Link } from "react-router-dom";
import { useAuthCart } from "context/AuthCartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [promotions, setPromotions] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { isLoggedIn, addToCart, user } = useAuthCart(); // Single destructuring
  const customerId = Number(localStorage.getItem("linkedId"));

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  // Map category string to categoryId
  const categoryMap = {
    FOODS: 1,
    TOYS: 2,
    FURNITURE: 3,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const productRes = await getProductDetail(id);
        setProduct(productRes);

        console.log("productRes:", productRes);

        const promotionsRes = await getPromotions(customerId);
        setPromotions(
          promotionsRes.filter((promo) => promo.productId === Number(id))
        );

        // Lấy categoryId từ map dựa vào category string
        const categoryId = categoryMap[productRes.category];

        const relatedRes = await getProductsByCategory({
          categoryId,
          name: "",
        });
        setRelatedProducts(relatedRes);

        const reviewRes = await getReviewsByProductId(id);
        setReviews(reviewRes);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [customerId, id]);

  const handleSubmitReview = async () => {
    if (!customerId) {
      toast.error("Bạn cần đăng nhập để đánh giá");
      return;
    }

    if (rating === 0) {
      toast.error("Vui lòng chọn số sao");
      return;
    }

    if (!comment.trim()) {
      toast.error("Vui lòng nhập nội dung đánh giá");
      return;
    }

    try {
      const payload = {
        customerId,
        productId: id,
        rating,
        comment: comment.trim(),
      };

      await submitReview(payload);
      toast.success("Đánh giá thành công!");

      setRating(0);
      setComment("");

      const updatedReviews = await getReviewsByProductId(id);
      setReviews(updatedReviews);
    } catch (err) {
      console.error("Lỗi khi gửi đánh giá:", err);
      toast.error("Lỗi khi gửi đánh giá. Vui lòng thử lại.");
    }
  };

  const translateCategory = (category) => {
    switch (category) {
      case "FOODS":
        return "Thức ăn";
      case "TOYS":
        return "Đồ chơi";
      case "FURNITURE":
        return "Phụ kiện";
      default:
        return category;
    }
  };

  const productDetails = [
    { label: "Tên", value: product?.name, bgColor: "bg-neutral-200" },
    {
      label: "Loại",
      value: translateCategory(product?.category?.name || product?.category),
      bgColor: "bg-white",
    },
    {
      label: "Chỉ định",
      value: product?.birdType?.name || product?.birdType || "N/A",
      bgColor: "bg-neutral-200",
    },
    { label: "Tồn kho", value: product?.stock || 0, bgColor: "bg-white" },
    {
      label: "Mô tả",
      value: product?.description || "Chưa có mô tả",
      bgColor: "bg-neutral-200",
    },
  ];

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error)
    return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product)
    return <div className="text-center py-20">Sản phẩm không tồn tại.</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 py-8 bg-gray-50 min-h-screen">
        <div className="flex justify-center items-center mt-8 mb-12">
          <Card className="w-3/4 shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-8">
                {/* ẢNH */}

                <div className="flex justify-center w-full md:w-auto">
                  <img
                    className="w-full max-w-[300px] h-auto object-cover rounded-xl"
                    alt={product.name}
                    src={product.imageUrl}
                  />
                </div>

                {/* THÔNG TIN CHI TIẾT */}
                <div className="flex-1 space-y-6">
                  {/* TÊN + MÔ TẢ */}
                  <div>
                    <h1 className="font-bold text-[#4b4a4a] text-3xl mb-4">
                      {product.name}
                    </h1>
                    <h1 className="font-medium text-[#12a140] text-2xl">
                      {product.price.toLocaleString()} VND
                    </h1>
                  </div>

                  {/* CHI TIẾT SẢN PHẨM */}
                  <div>
                    <h3 className="font-semibold text-[#494444] text-xl mb-2">
                      Chi tiết sản phẩm
                    </h3>
                    <div className="flex gap-2">
                      <div className="flex-1 p-2 rounded-[8px] border border-[#1286ce] bg-[#ecf9ff] shadow-md">
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-[#535353] text-[16px]">
                            Mặc định
                          </span>
                          <span className="font-medium text-[#12a140] text-[14px]">
                            {product.price.toLocaleString()} VNĐ
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h2 className="font-medium text-[#807e7e] text-2xl mb-4">
                      Khuyến mãi
                    </h2>
                    <div className="space-y-4">
                      {promotions.length > 0 ? (
                        promotions.map((promo) => (
                          <div
                            key={promo.id}
                            className="p-4 bg-gradient-to-r from-[#f0fff4] to-[#e6fffa] rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
                          >
                            <p className="text-lg font-semibold text-[#494444]">
                              Mã khuyến mãi:{" "}
                              <span className="text-[#12a140]">
                                {promo.code}
                              </span>{" "}
                              - Giảm giá:{" "}
                              <span className="text-[#12a140]">
                                {promo.discount} VND
                              </span>
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-base text-gray-600 text-center">
                          Không có khuyến mãi nào.
                        </p>
                      )}
                    </div>
                  </div>
                  <Separator className="my-6" />
                  <div className="flex gap-4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        if (!isLoggedIn) {
                          toast.error(
                            "Bạn cần đăng nhập để thêm vào giỏ hàng!"
                          );
                          return;
                        }
                        addToCart(product.id);
                        toast.success("Đã thêm vào giỏ hàng! 🎉");
                      }}
                      className="w-[50%] bg-[#12a140] hover:bg-[#0e8a34] text-white font-bold text-[18px] h-[56px] rounded-[10px]"
                    >
                      Thêm vào giỏ hàng
                    </button>
                    <button
                      onClick={() => {
                        if (!isLoggedIn) {
                          toast.error("Bạn cần đăng nhập để mua hàng!");
                          return;
                        }
                        const cartItem = [{ id: product.id, qty: 1 }];
                        localStorage.setItem("cart", JSON.stringify(cartItem));
                        window.location.href = "/checkout";
                      }}
                      className="w-[50%] bg-[#12a140] hover:bg-[#0e8a34] text-white font-bold text-[18px] h-[56px] rounded-[10px]"
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg rounded-2xl overflow-hidden">
            <CardContent className="p-6 space-y-6">
              <h3 className="font-medium text-[#807e7e] text-[18px] mb-2">
                Thông tin chi tiết
              </h3>
              <Table>
                <TableBody>
                  {productDetails.map((detail, index) => (
                    <TableRow key={index} className={detail.bgColor}>
                      <TableCell className="font-semibold text-[#494444] text-lg p-4 w-[180px]">
                        {detail.label}
                      </TableCell>
                      <TableCell className="font-normal text-[#494444] text-lg p-4">
                        {detail.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Other Products */}
        <div className="mt-16">
          <h2 className="text-center font-bold text-black text-[32px] mb-6">
            Sản phẩm khác
          </h2>
          <Carousel>
            <CarouselContent>
              {relatedProducts.map((item) => (
                <CarouselItem key={item.id} className="basis-1/2 md:basis-1/4">
                  <Link to={`/product/${item.id}`}>
                    <Card className="p-4 shadow-md rounded-xl h-full hover:shadow-lg transition-shadow duration-300">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-[180px] w-full object-cover rounded-lg"
                      />
                      <h3 className="font-semibold mt-3 text-lg">
                        {item.name}
                      </h3>
                      <p className="text-base text-gray-600">
                        {item.price.toLocaleString("vi-VN")} VND
                      </p>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="mt-16">
          <h2 className="text-center font-bold text-black text-[32px] mb-6">
            Đánh giá
          </h2>

          <div className="mb-8 space-y-6">
            <div className="flex gap-3 justify-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-7 h-7 cursor-pointer ${
                    star <= rating ? "fill-[#ffd400]" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              rows={4}
              placeholder="Viết đánh giá của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 rounded-xl p-4 text-lg"
            />
            <Button
              className="bg-[#12a73b] hover:bg-[#0e8a34] text-white font-bold text-xl h-14 px-12 rounded-xl mx-auto block"
              onClick={handleSubmitReview}
            >
              Gửi đánh giá
            </Button>
          </div>

          <div className="space-y-10">
            {reviews.length === 0 && (
              <p className="text-gray-500 text-center text-xl">
                Chưa có đánh giá nào
              </p>
            )}
            {reviews.map((review, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-md">
                <h4 className="font-bold text-black text-2xl mb-3">
                  {review.name || `Người dùng ${review.customerId}`}
                </h4>
                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-6 h-6 ${
                        i < review.rating ? "fill-[#ffd400]" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-normal text-black text-lg">
                  {review.comment}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetails;
