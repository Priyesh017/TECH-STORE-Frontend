import { useEffect, useContext } from "react";

import "./Categories.scss";

import Category from "../Home/Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";

const Categories = () => {
  const { categories, setCategories, products, setProducts } =
    useContext(Context);
  useEffect(() => {
    getProducts();
    getCategories();
  }, []);

  const getProducts = async () => {
    const res = await fetchDataFromApi("/api/products?populate=*");
      console.log(res);
      setProducts(res);
  };

  const getCategories = async () => {
    const res = await fetchDataFromApi("/api/categories?populate=*");
      console.log(res);
      setCategories(res);
  };

  return (
    <div className="home">
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />
          {/* <Products products={products} headingText={"Popular Products"} /> */}
        </div>
      </div>
    </div>
  );
};

export default Categories;
