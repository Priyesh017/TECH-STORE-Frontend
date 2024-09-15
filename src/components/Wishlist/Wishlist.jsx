import { MdClose } from "react-icons/md";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../utils/context";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./Wishlist.scss";

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlistItems, setWishlistItems, handleRemoveFromWishlist } =
    useContext(Context);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Retrieve user ID from cookies
    const user = Cookies.get("user");
    if (user) {
      setUserId(JSON.parse(user).id);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      // Fetch the user's wishlist from the server
      const fetchWishlist = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:1337/api/wishlist/${userId}`
          );
          const data = await response.json();
          setWishlistItems(data.wishlistItems);
        } catch (error) {
          console.error("Failed to fetch wishlist", error);
        }
      };

      fetchWishlist();
    }
  }, [userId, setWishlistItems]);

  const handleItemClick = (id) => {
    navigate("/product/" + id);
  };

  const handleRemoveClick = (item) => {
    // Remove item from the wishlist
    const updatedWishlist = wishlistItems.filter(
      (wishlistItem) => wishlistItem.id !== item.id
    );
    setWishlistItems(updatedWishlist);

    // Call the context function to handle wishlist removal
    handleRemoveFromWishlist(item);
  };

  return (
    <div className="wishlist-products">
      <h1>Your Wishlist</h1>
      <div className="cart-products">
        {wishlistItems.length > 0 ? (
          wishlistItems.map((item) => {
            const imageUrl =
              process.env.REACT_APP_DEV_URL +
              (item.attributes.img?.data[0]?.attributes?.url ||
                "/default-image.jpg");

            return (
              <div
                key={item.id}
                className="cart-product"
                onClick={() => handleItemClick(item.id)}
              >
                <div className="img-container">
                  <img
                    src={imageUrl}
                    alt={item.attributes.title || "Product"}
                  />
                </div>
                <div
                  className="prod-details"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="name">{item.attributes.title}</span>
                  <MdClose
                    className="close-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveClick(item);
                    }}
                  />
                  <div className="text">
                    <span>&#8377;{item.attributes.price}</span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty-wishlist">Your wishlist is empty.</div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
