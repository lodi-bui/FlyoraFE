import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "pages/navfoot/Header";
import Footer from "pages/navfoot/Footer";
import { getProductDetail } from "api/ProductDetail";
import { getProductsByCategory } from "api/Product";
import { submitReview, getReviewsByProductId } from "api/Review";
import { Card, CardContent } from "components/ui/Card";
import { Button } from "components/ui/Button";
import { Badge } from "components/ui/Badge";
import { Separator } from "components/ui/Separator";
import { Table, TableBody, TableCell, TableRow } from "components/ui/Table";
import { StarIcon } from "lucide-react";
import toast from "react-hot-toast";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "components/ui/Carousel";
import { Link } from "react-router-dom";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  const customerId = Number(localStorage.getItem("linkedId"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const productRes = await getProductDetail(id);
        setProduct(productRes);

        const relatedRes = await getProductsByCategory({
          categoryId: null,
          name: "",
          page: 0,
          size: 4,
        });
        setRelatedProducts(relatedRes.content || []);

        const reviewRes = await getReviewsByProductId(id);
        setReviews(reviewRes);
      } catch (err) {
        console.error(err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

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

      // Reset form
      setRating(0);
      setComment("");

      // Reload reviews
      const updatedReviews = await getReviewsByProductId(id);
      setReviews(updatedReviews);
    } catch (err) {
      console.error("Lỗi khi gửi đánh giá:", err);
      toast.error("Lỗi khi gửi đánh giá");
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
    { label: "Name", value: product?.name, bgColor: "bg-neutral-200" },
    { label: "Type", value: translateCategory(product?.category), bgColor: "bg-white" },
    { label: "Indication", value: product?.birdType, bgColor: "bg-neutral-200" },
    { label: "Stock", value: product?.stock, bgColor: "bg-white" },
    { label: "Description", value: product?.description, bgColor: "bg-neutral-200" },
  ];

  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-20">Product not found.</div>;

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 py-6">

        {/* Product Info */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="col-span-2 shadow-md rounded-[12px]">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex justify-center">
                  <img
                    className="w-full max-w-[267px] h-auto object-cover rounded-[12px]"
                    alt={product.name}
                    src={product.imageUrl}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h1 className="font-bold text-[#4b4a4a] text-[28px]">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#ffd400] text-base">Sale</span>
                      <StarIcon className="w-5 h-5 fill-[#ffd400]" />
                      <span className="font-medium text-[#ffd400] text-base">(4)</span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2 font-medium text-black text-[16px]">
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-md rounded-[12px]">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-medium text-[#807e7e] text-[18px] mb-2">Size:</h3>
                <div className="flex gap-2">
                  <div className="flex-1 p-2 rounded-[8px] border border-[#1286ce] bg-[#ecf9ff] shadow-md">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-[#535353] text-[16px]">Default</span>
                      <span className="font-medium text-[#12a140] text-[14px]">
                        {product.price} VND
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-bold text-[#494444] text-[28px]">{product.price} VND</p>
                <Badge className="bg-[#12a140] text-white text-[16px] h-[56px] px-6 rounded-[10px] flex items-center justify-center">
                  Sale
                </Badge>
              </div>

              <Separator />

              <div className="flex gap-4">
                <Button className="w-[40%] bg-[#12a140] hover:bg-[#0e8a34] text-white font-bold text-[18px] h-[56px] rounded-[10px]">
                  Add to Cart
                </Button>
                <Button className="w-[60%] bg-[#12a140] hover:bg-[#0e8a34] text-white font-bold text-[18px] h-[56px] rounded-[10px]">
                  Buy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details */}
        <div className="mt-10">
          <h2 className="font-semibold text-[#494444] text-[28px] mb-4">Details</h2>
          <Table>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow key={index} className={detail.bgColor}>
                  <TableCell className="font-semibold text-[#494444] text-[16px] w-[155px]">
                    {detail.label}
                  </TableCell>
                  <TableCell className="font-normal text-[#494444] text-[16px]">
                    {detail.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Other Products */}
        <div className="mt-16">
          <h2 className="text-center font-bold text-black text-[32px] mb-6">Other Products</h2>
          <Carousel>
            <CarouselContent>
              {relatedProducts.map((item) => (
                <CarouselItem key={item.id} className="basis-1/2 md:basis-1/4">
                  <Link to={`/product/${item.id}`}>
                    <Card className="p-4 shadow-md h-full">
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="h-[150px] w-full object-cover rounded"
                      />
                      <h3 className="font-semibold mt-2">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.price} VND</p>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="text-center font-bold text-black text-[32px] mb-6">Reviews</h2>

          {/* Review Form */}
          <div className="mb-8 space-y-4">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`w-6 h-6 cursor-pointer ${
                    star <= rating ? "fill-[#ffd400]" : "text-gray-300"
                  }`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
            <textarea
              rows={3}
              placeholder="Viết đánh giá của bạn..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-3"
            />
            <Button
              className="bg-[#12a73b] hover:bg-[#0e8a34] text-white font-bold text-[18px] h-[50px] px-10 rounded-[10px]"
              onClick={handleSubmitReview}
            >
              Gửi đánh giá
            </Button>
          </div>

          {/* Review List */}
          <div className="space-y-8">
            {reviews.length === 0 && (
              <p className="text-gray-500 text-center">Chưa có đánh giá nào</p>
            )}
            {reviews.map((review, index) => (
              <div key={index}>
                <h4 className="font-bold text-black text-[20px] mb-2">
                  {review.name || `Người dùng ${review.customerId}`}
                </h4>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? "fill-[#ffd400]" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-normal text-black text-[16px]">{review.comment}</p>
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
