import { createContext, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export const Context = createContext();

const AppContext = ({ children }) => {
  const [categories, setCategories] = useState();
  const [products, setProducts] = useState();
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems")) || []
  );
  const [wishlistItems, setWishlistItems] = useState(
    JSON.parse(localStorage.getItem("wishlistItems")) || []
  );
  const [cartCount, setCartCount] = useState(0);
  const [cartSubTotal, setCartSubTotal] = useState(0);
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("user"));

  const login = (userData) => {
    Cookies.set("user", userData);
    setIsLoggedIn(true);
  };

  const logout = () => {
    Cookies.remove("user");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  useEffect(() => {
    let count = 0;
    cartItems.map((item) => (count += item.attributes.quantity));
    setCartCount(count);

    let subTotal = 0;
    cartItems.map(
      (item) => (subTotal += item.attributes.price * item.attributes.quantity)
    );
    setCartSubTotal(subTotal);

    // Save cart items to localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    // Save wishlist items to localStorage
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  const handleAddToCart = (product, quantity) => {
    let items = [...cartItems];
    let index = items.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      items[index].attributes.quantity += quantity;
    } else {
      product.attributes.quantity = quantity;
      items = [...items, product];
    }
    setCartItems(items);
  };

  const handleRemoveFromCart = (product) => {
    let items = [...cartItems];
    items = items.filter((p) => p.id !== product.id);
    setCartItems(items);
  };

  const handleCartProductQuantity = (type, product) => {
    let items = [...cartItems];
    let index = items.findIndex((p) => p.id === product.id);
    if (type === "inc") {
      items[index].attributes.quantity += 1;
    } else if (type === "dec") {
      if (items[index].attributes.quantity === 1) return;
      items[index].attributes.quantity -= 1;
    }
    setCartItems(items);
  };

  const handleClearCart = () => {
    setCartItems([]);
    setCartCount(0);
    setCartSubTotal(0);
  };

  const handleAddToWishlist = (product, quantity) => {
    setWishlistItems((prevItems) => {
      let items = [...prevItems];
      let index = items.findIndex((p) => p.id === product.id);
      if (index !== -1) {
        items[index] = {
          ...items[index],
          attributes: {
            ...items[index].attributes,
            quantity: items[index].attributes.quantity + quantity,
          },
        };
      } else {
        const newProduct = {
          ...product,
          attributes: {
            ...product.attributes,
            quantity: quantity,
          },
        };
        items = [...items, newProduct];
      }
      return items;
    });
  };

  const handleRemoveFromWishlist = (product) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((p) => p.id !== product.id)
    );
  };

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        login,
        logout,
        categories,
        setCategories,
        products,
        setProducts,
        cartItems,
        setCartItems,
        wishlistItems,
        setWishlistItems,
        cartCount,
        setCartCount,
        cartSubTotal,
        setCartSubTotal,
        location,
        handleAddToCart,
        handleRemoveFromCart,
        handleCartProductQuantity,
        handleClearCart,
        handleAddToWishlist,
        handleRemoveFromWishlist,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default AppContext;
