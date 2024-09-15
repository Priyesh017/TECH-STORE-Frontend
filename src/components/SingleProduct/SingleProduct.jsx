import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SingleProduct.scss";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPinterest,
  FaCartPlus,
} from "react-icons/fa";
import RelatedProducts from "./RelatedProducts/RelatedProducts";
import useFetch from "../../hooks/useFetch";
import { useParams } from "react-router-dom";
import { Context } from "../../utils/context";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

const SingleProduct = () => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate(`/order`);
  };

  const { wishlistItems, handleAddToWishlist, handleRemoveFromWishlist } =
    useContext(Context);

  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const { data } = useFetch(`/api/products?populate=*&[filters][id]=${id}`);

  const { handleAddToCart } = useContext(Context);

  const increment = () => {
    setQuantity((prevState) => prevState + 1);
  };
  const decrement = () => {
    setQuantity((prevState) => {
      if (prevState === 1) {
        return 1;
      }
      return prevState - 1;
    });
  };

  const isInWishlist = (itemId) => {
    return wishlistItems.some((wishlistItem) => wishlistItem.id === itemId);
  };

  const handleWishlistClick = (item) => {
    if (isInWishlist(item.id)) {
      handleRemoveFromWishlist(item);
    } else {
      handleAddToWishlist(item, 1);
    }
  };

  if (!data || !data.data || data.data.length === 0) {
    return null;
  }
  const product = data?.data?.[0]?.attributes;
  const item = data.data[0];

  return (
    <div className="single-product-main-content">
      <div className="layout">
        <div className="single-product-page">
          <div className="left">
            <img
              src={
                process.env.REACT_APP_DEV_URL +
                (product.img?.data[0]?.attributes?.url || "")
              }
              alt=""
            />
          </div>
          <div className="right">
            <span className="name">{product.title}</span>
            <span className="price">&#8377;{product.price}</span>
            <span className="desc">{product.desc}</span>
            <div className="cart-button">
              <div className="quantity-buttons">
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                <span onClick={increment}>+</span>
              </div>
              <button
                className="add-to-cart-button"
                onClick={() => {
                  handleAddToCart(data.data[0], quantity);
                  setQuantity(1);
                }}
              >
                <FaCartPlus size={20} />
                ADD TO CART
              </button>
              <button
                className="add-to-cart-button"
                onClick={() => {
                  handleAddToCart(data.data[0], quantity);
                  handleCheckout();
                  setQuantity(1);
                }}
              >
                {/* <FaCartPlus size={20} /> */}
                BUY
              </button>
            </div>
            <span className="divider" />
            <div className="info-item">
              <span className="text-bold">
                Category:{" "}
                <span>{product.categories.data[0].attributes.title}</span>
              </span>
              <span className="text-bold">
                Share:
                <span className="social-icons">
                  <FaFacebookF size={16} />
                  <FaTwitter size={16} />
                  <FaInstagram size={16} />
                  <FaLinkedinIn size={16} />
                  <FaPinterest size={16} />
                </span>
              </span>
              <center>
                <button className="btn">
                  <div
                    className="wishlist"
                    onClick={() => handleWishlistClick(item)}
                  >
                    <span>Wishlist</span>
                    <span className="like">
                      {isInWishlist(item.id) ? (
                        <AiFillHeart />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </span>
                  </div>
                </button>
              </center>
            </div>
          </div>
        </div>
        <RelatedProducts
          productId={id}
          categoryId={product.categories.data[0].id}
        />
      </div>
    </div>
  );
};

export default SingleProduct;
