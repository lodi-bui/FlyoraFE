import Footer from "../navfoot/Footer";
import Header from "../navfoot/Header";
import FiltersProducts from "./FiltersProducts";
import PriceFilter from "./PriceFilter";

const ShopPage = () => {
  return (
    <>
      <Header />
      <FiltersProducts />
      <PriceFilter />
      <Footer />
    </>
  );
};

export default ShopPage;
