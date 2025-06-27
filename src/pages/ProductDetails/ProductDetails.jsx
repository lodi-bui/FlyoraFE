import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "pages/navfoot/Header";
import Footer from "pages/navfoot/Footer";
import { getProductDetail } from "api/ProductDetail";
import { getProductsByCategory } from "api/Product";
import { Card, CardContent } from "components/ui/Card";
import { Button } from "components/ui/Button";
import { Badge } from "components/ui/Badge";
import { Separator } from "components/ui/Separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/ui/Carousel";
import { Table, TableBody, TableCell, TableRow } from "components/ui/Table";
import { Progress } from "components/ui/Progress";
import { StarIcon } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const ratings = [
    { stars: 5, percentage: "0%" },
    { stars: 4, percentage: "100%" },
    { stars: 3, percentage: "0%" },
    { stars: 2, percentage: "0%" },
    { stars: 1, percentage: "0%" },
  ];
  const reviews = [
    { name: "User A", rating: 4, comment: "Good Product" },
    {
      name: "User B",
      rating: 4,
      comment: "The Product Is Great. Only Issue Is The Price.",
    },
  ];
  const filterOptions = ["All", "5", "4", "3", "2", "1"];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await getProductDetail(id);
        setProduct(res);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product");
      } finally {
        setLoading(false);
      }
    };

    const fetchRelated = async () => {
      try {
        const payload = {
          categoryId: null,
          name: "",
          page: 0,
          size: 4,
        };
        const res = await getProductsByCategory(payload);
        setRelatedProducts(res.content || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProduct();
    fetchRelated();
  }, [id]);

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
    {
      label: "Type",
      value: translateCategory(product?.category),
      bgColor: "bg-white",
    },
    { label: "Indication", value: product?.birdType, bgColor: "bg-neutral-200" },
    { label: "Stock", value: product?.stock, bgColor: "bg-white" },
    {
      label: "Description",
      value: product?.description,
      bgColor: "bg-neutral-200",
    },
  ];

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 py-6">
        {/* ================= Product Info ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Image and Info */}
          <Card className="col-span-2 shadow-md overflow-hidden">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    <img
                      className="w-full max-w-[267px] h-auto object-cover"
                      alt={product.name}
                      src={product.imageUrl}
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h1 className="font-medium text-[#4b4a4a] text-[25px]">
                      {product.name}
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#ffd400] text-base">
                        Sale
                      </span>
                      <StarIcon className="w-5 h-5 fill-[#ffd400]" />
                      <span className="font-medium text-[#ffd400] text-base">
                        (4)
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2 font-medium text-black text-base">
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Purchase Section */}
          <Card className="shadow-md">
            <CardContent className="p-6 space-y-6">
              <div>
                <h3 className="font-medium text-[#807e7e] text-[19px] mb-2">
                  Size:
                </h3>
                <div className="flex gap-2">
                  <div className="flex-1 p-2 rounded-[5px] border border-[#1286ce] bg-[#ecf9ff] shadow-md">
                    <div className="flex flex-col items-center">
                      <span className="font-semibold text-[#535353] text-[19px]">
                        Default
                      </span>
                      <span className="font-medium text-[#12a140] text-xs">
                        {product.price} VND
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-[#494444] text-[34px]">
                    {product.price} VND
                  </p>
                </div>
                <Badge className="bg-[#12a140] text-white text-sm py-2 px-3 h-auto">
                  Sale
                </Badge>
              </div>

              <Separator />

              <div className="flex gap-4">
                <Button className="flex-1 bg-[#12a140] hover:bg-[#0e8a34] text-white font-medium text-xl py-6">
                  ADD TO CART
                </Button>
                <Button className="bg-[#12a140] hover:bg-[#0e8a34] text-white font-medium text-2xl py-6">
                  BUY
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ================= Details ================= */}
        <div className="mt-10">
          <h2 className="font-medium text-[#494444] text-[25px] mb-4">
            Details
          </h2>
          <Table>
            <TableBody>
              {productDetails.map((detail, index) => (
                <TableRow
                  key={index}
                  className={`${detail.bgColor} ${detail.height || "h-10"}`}
                >
                  <TableCell className="font-semibold text-[#494444] text-lg w-[155px]">
                    {detail.label}
                  </TableCell>
                  <TableCell className="font-normal text-[#494444] text-base">
                    {detail.value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Separator className="my-8" />

        {/* ================= Related Products ================= */}
        <div className="mt-10">
          <h2 className="font-medium text-[#494444] text-[25px] mb-4">
            Other Products
          </h2>
          <Carousel className="w-full">
            <CarouselContent>
              {relatedProducts.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/4">
                  <Link to={`/product/${item.id}`}>
                    <Card className="h-80 shadow-md cursor-pointer hover:shadow-lg">
                      <CardContent className="flex flex-col items-center p-4">
                        <img
                          className="w-[108px] h-[122px] mt-4 object-cover"
                          alt={item.name}
                          src={item.imageUrl}
                        />
                        <div className="mt-6 text-center">
                          <h3 className="font-medium text-black text-base mb-6">
                            {item.name}
                          </h3>
                          <p className="font-medium text-[#494444] text-xl">
                            {item.price} VND
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white border border-[#cdcdcd] shadow-md rounded-full" />
            <CarouselNext className="right-0 bg-white border border-[#cdcdcd] shadow-md rounded-full" />
          </Carousel>
        </div>

        {/* ================= Reviews ================= */}
        <div className="mt-16">
          <h2 className="text-center font-bold text-black text-[40px] mb-6">
            Reviews
          </h2>

          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold text-black text-[32px] mb-4">
                    Average Rating
                  </h3>
                  <div className="flex items-center gap-2 mb-4">
                    <StarIcon className="w-6 h-6 fill-current text-[#ffd400]" />
                    <span className="font-bold text-black text-[32px]">4</span>
                    <span className="font-bold text-black text-base">/5</span>
                  </div>
                  <p className="text-[#7f7f7f] font-light text-xl">
                    {reviews.length} Reviews
                  </p>
                </div>

                <div className="space-y-3">
                  {ratings.map((rating, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="font-bold text-black text-2xl w-4">
                        {rating.stars}
                      </span>
                      <StarIcon className="w-6 h-6 fill-current text-[#ffd400]" />
                      <Progress
                        className="h-2 flex-1"
                        value={rating.stars === 4 ? 100 : 0}
                      />
                      <span className="font-bold text-black text-xl w-12">
                        {rating.percentage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap gap-4 mb-6">
            {filterOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`rounded-[10px] border-2 h-[43px] min-w-[109px] ${
                  option === "All" ? "border-[#119c39]" : "border-black"
                }`}
              >
                {option === "All" ? (
                  <span className="font-bold text-black text-xl">All</span>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-black text-xl">
                      {option}
                    </span>
                    <StarIcon className="w-5 h-5 fill-current text-[#ffd400]" />
                  </div>
                )}
              </Button>
            ))}
          </div>

          <Button className="bg-[#12a73b] hover:bg-[#0e8a34] text-white font-bold text-2xl h-[70px] px-10 rounded-[20px] mb-8">
            Leave A Review
          </Button>

          <div className="space-y-8">
            {reviews.map((review, index) => (
              <div key={index} className="mb-6">
                <h4 className="font-bold text-black text-2xl mb-2">
                  {review.name}
                </h4>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`w-6 h-6 ${
                        i < review.rating
                          ? "fill-current text-[#ffd400]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-normal text-black text-xl">
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
