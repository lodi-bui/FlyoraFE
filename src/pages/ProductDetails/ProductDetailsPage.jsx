import Footer from "../navfoot/Footer";
import Header from "../navfoot/Header";
import { ProductDetails } from './ProductDetails';
import ProductFilterPage from './../shop/FiltersProducts';

const ProductDetailsPage = () => {
  return (
    <>
      <Header />
      <ProductDetails />
      <Footer />
    </>
  );
};

export default ProductDetailsPage;