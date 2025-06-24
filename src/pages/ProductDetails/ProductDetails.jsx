import { StarIcon } from "lucide-react";
import React from "react";
import { Button } from "components/ui/Button";
import { Card, CardContent } from "components/ui/Card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "components/ui/Carousel";
import { Progress } from "components/ui/Progress";
import { Separator } from "components/ui/Separator";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "components/ui/Table";
import { Badge } from "components/ui/Badge";
import Header from "pages/navfoot/Header";
import Footer from "pages/navfoot/Footer";

export const ProductDetails = () => {
  // Product size options data
  const sizeOptions = [
    { size: "100 ml", pricePerUnit: "10.000 VND/Lit", selected: true },
    { size: "1 litre", pricePerUnit: "8.000 VND/Lit", selected: false },
    { size: "10 litere", pricePerUnit: "6.000 VND/Lit", selected: false },
  ];

  // Product details data
  const productDetails = [
    { label: "Indication", value: "Birds", bgColor: "bg-neutral-200" },
    { label: "Age", value: "...", bgColor: "bg-white" },
    { label: "...", value: "", bgColor: "bg-neutral-200" },
    { label: "Type", value: "Dry Food", bgColor: "bg-white" },
    {
      label: "Composition",
      value: "thành phần",
      bgColor: "bg-neutral-200",
      height: "h-[90px]",
    },
    { label: "...", value: "...", bgColor: "bg-white" },
  ];

  // Related products data
  const relatedProducts = [
    {
      id: 1,
      name: "Other Product",
      originalPrice: "300.000 VND",
      price: "180.000 VND",
      image: "https://c.animaapp.com/mc92jqp9VnnGN8/img/foto-3.png",
    },
    {
      id: 2,
      name: "Other Product",
      originalPrice: "300.000 VND",
      price: "180.000 VND",
      image: "https://c.animaapp.com/mc92jqp9VnnGN8/img/foto-3.png",
    },
    {
      id: 3,
      name: "Other Product",
      originalPrice: "300.000 VND",
      price: "180.000 VND",
      image: "https://c.animaapp.com/mc92jqp9VnnGN8/img/foto-3.png",
    },
    {
      id: 4,
      name: "Other Product",
      originalPrice: "R$ 7,00",
      price: "180.000 VND",
      image: "https://c.animaapp.com/mc92jqp9VnnGN8/img/foto-3.png",
    },
  ];

  // Rating data
  const ratings = [
    { stars: 5, percentage: "0%" },
    { stars: 4, percentage: "100%" },
    { stars: 3, percentage: "0%" },
    { stars: 2, percentage: "0%" },
    { stars: 1, percentage: "0%" },
  ];

  // Reviews data
  const reviews = [
    { name: "Abc", rating: 4, comment: "Good Product" },
    {
      name: "Def",
      rating: 4,
      comment: "The Product Is Great. Only Issue Is The Price.",
    },
  ];

  // Promotions data
  const promotions = [
    { id: 1, text: "......." },
    { id: 2, text: "......." },
    { id: 3, text: "......." },
  ];

  // Filter options
  const filterOptions = ["All", "5", "4", "3", "2", "1"];

  return (
    <>
      <Header />
      <div className="container mx-auto px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Product Image and Info Section */}
          <Card className="col-span-2 shadow-md overflow-hidden">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-4">
                  <div className="flex justify-center">
                    <img
                      className="w-full max-w-[267px] h-auto object-cover"
                      alt="Product"
                      src="https://c.animaapp.com/mc92jqp9VnnGN8/img/foto-7.png"
                    />
                  </div>
                  <div className="flex justify-center gap-4">
                    <img
                      className="w-[52px] h-[73px] object-cover"
                      alt="Product thumbnail"
                      src="https://c.animaapp.com/mc92jqp9VnnGN8/img/foto-7.png"
                    />
                    <img
                      className="w-[52px] h-[73px] object-cover"
                      alt="Product thumbnail"
                      src="https://c.animaapp.com/mc92jqp9VnnGN8/img/foto-7.png"
                    />
                    <img
                      className="w-[52px] h-[73px] object-cover"
                      alt="Product thumbnail"
                      src="https://c.animaapp.com/mc92jqp9VnnGN8/img/foto-7.png"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h1 className="font-medium text-[#4b4a4a] text-[25px]">
                      Product Name - 200 mL
                    </h1>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-[#ffd400] text-base">
                        Sale (340)
                      </span>
                      <img
                        className="w-[21px] h-[19px]"
                        alt="Star"
                        src="https://c.animaapp.com/mc92jqp9VnnGN8/img/estrela-738255-3.png"
                      />
                      <span className="font-medium text-[#ffd400] text-base">
                        (4)
                      </span>
                      <img
                        className="w-[30px] h-[27px]"
                        alt="Wishlist"
                        src="https://c.animaapp.com/mc92jqp9VnnGN8/img/pinclipart-1.png"
                      />
                    </div>
                  </div>
                  <div className="mt-6 space-y-2 font-medium text-black text-base">
                    <p>- Product details</p>
                    <p>- Product details</p>
                    <p>- Product details</p>
                    <p>- Product details</p>
                    <p>- Product details</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Product Purchase Section */}
          <Card className="shadow-md">
            <CardContent className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-[#807e7e] text-[19px] mb-2">
                    Choose a size:
                  </h3>
                  <div className="flex gap-2">
                    {sizeOptions.map((option, index) => (
                      <div
                        key={index}
                        className={`flex-1 p-2 rounded-[5px] border border-[#1286ce] shadow-md ${option.selected ? "bg-[#ecf9ff]" : "bg-white"}`}
                      >
                        <div className="flex flex-col items-center">
                          <span className="font-semibold text-[#535353] text-[19px]">
                            {option.size}
                          </span>
                          <span className="font-medium text-[#12a140] text-xs">
                            {option.pricePerUnit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium text-[#494444] text-[34px]">
                      100.000 VND
                    </p>
                    <p className="font-semibold text-[#ff3f3fbd] text-base line-through">
                      250.000 VND
                    </p>
                  </div>
                  <Badge className="bg-[#12a140] text-white text-sm py-2 px-3 h-auto">
                    40% OFF
                  </Badge>
                </div>

                <Separator />

                <div>
                  <h3 className="font-medium text-[#494444] text-[34px]">
                    Khuyến Mãi
                    <span className="block text-xl">(Áp dụng đến...)</span>
                  </h3>
                  <div className="mt-4 space-y-4">
                    {promotions.map((promo) => (
                      <div key={promo.id} className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-[33px] h-[33px] bg-[#2ac154] rounded-full">
                          <span className="font-semibold text-white text-[22px]">
                            {promo.id}
                          </span>
                        </div>
                        <span className="font-semibold text-black text-[22px]">
                          {promo.text}
                        </span>
                      </div>
                    ))}
                  </div>
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
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Details Section */}
        <div className="mt-10">
          <h2 className="font-medium text-[#494444] text-[25px] mb-4">Details</h2>
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

        {/* Related Products Section */}
        <div className="mt-10">
          <Carousel className="w-full">
            <CarouselContent>
              {relatedProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/4">
                  <Card className="h-80 shadow-md">
                    <CardContent className="flex flex-col items-center p-4">
                      <img
                        className="w-[108px] h-[122px] mt-4 object-cover"
                        alt="Product"
                        src={product.image}
                      />
                      <div className="mt-6 text-center">
                        <h3 className="font-medium text-black text-base mb-6">
                          {product.name}
                        </h3>
                        <p className="font-medium text-[#958f8f] text-sm line-through mb-1">
                          {product.originalPrice}
                        </p>
                        <p className="font-medium text-[#494444] text-xl">
                          {product.price}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-0 bg-white border border-[#cdcdcd] shadow-md rounded-full" />
            <CarouselNext className="right-0 bg-white border border-[#cdcdcd] shadow-md rounded-full" />
          </Carousel>
        </div>

        {/* Reviews Section */}
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
                  <p className="text-[#7f7f7f] font-light text-xl">2 Reviews</p>
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

          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-black text-xl">Filter Reviews</h3>
            <div className="relative">
              <select className="border border-black rounded-[10px] py-3 px-4 font-normal text-xl appearance-none pr-8">
                <option>Sort By: Newest</option>
              </select>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-6">
            {filterOptions.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={`rounded-[10px] border-2 h-[43px] min-w-[109px] ${option === "All" ? "border-[#119c39]" : "border-black"}`}
              >
                {option === "All" ? (
                  <span className="font-bold text-black text-xl">All</span>
                ) : (
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-black text-xl">{option}</span>
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
                      className={`w-6 h-6 ${i < review.rating ? "fill-current text-[#ffd400]" : "text-gray-300"}`}
                    />
                  ))}
                </div>
                <p className="font-normal text-black text-xl">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
