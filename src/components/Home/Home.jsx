import { useEffect, useContext, useState } from "react";

import "./Home.scss";

import Banner from "./Banner/Banner";
import Category from "./Category/Category";
import Products from "../Products/Products";
import { fetchDataFromApi } from "../../utils/api";
import { Context } from "../../utils/context";
import { useNavigate, useLocation } from "react-router-dom";

const Home = () => {
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

  // render the homepage once
  const [shouldReload, setShouldReload] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const reloaded = queryParams.get("reloaded");

    if (!reloaded && shouldReload) {
      queryParams.set("reloaded", "true");
      navigate(`${location.pathname}?${queryParams.toString()}`, {
        replace: true,
      });
      window.location.reload();
    } else {
      setShouldReload(false);
    }
  }, [shouldReload, navigate, location]);

  return (
    <div className="home">
      <Banner />
      <div className="main-content">
        <div className="layout">
          <Category categories={categories} />
          <Products products={products} headingText={"Popular Products"} />
        </div>
      </div>
    </div>
  );
};

export default Home;
