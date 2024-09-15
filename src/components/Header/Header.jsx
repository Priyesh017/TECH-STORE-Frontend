import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TbSearch } from "react-icons/tb";
import { CgShoppingCart } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";

import Search from "./Search/Search";
import Cart from "../Cart/Cart";
import { Context } from "../../utils/context";

import "./Header.scss";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { cartCount, isLoggedIn, logout } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 200);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout(); // Call the logout function from context
    navigate("/login"); // Redirect to the login page after logout
  };

  const toggleMenu = () => {
    const mobileMenu = document.querySelector(".mobile-menu");
    mobileMenu.classList.toggle("show");
  };

  const handleCartClick = () => {
    if (isLoggedIn) {
      setShowCart(true);
    } else {
      navigate("/login"); // Redirect to login if not logged in
    }
  };

  return (
    <>
      <header className={`main-header ${scrolled ? "sticky-header" : ""}`}>
        <div className="header-content">
          <ul className="left">
            <li onClick={() => navigate("/")}>Home</li>
            <li onClick={() => navigate("/profile")}>Profile</li>
            <li onClick={() => navigate("/categories")}>Category</li>
            <li onClick={() => navigate("/order")}>Order</li>
          </ul>
          <button className="hamburger-menu" onClick={toggleMenu}>
            ☰
          </button>
          <nav className="mobile-menu">
            <span className="close-btn" onClick={toggleMenu}>
              <MdClose size={20} />
            </span>
            <ul>
              <li
                onClick={() => {
                  navigate("/");
                  toggleMenu();
                }}
              >
                Home
              </li>
              <li
                onClick={() => {
                  setShowSearch(true);
                  toggleMenu();
                }}
              >
                Search
              </li>
              <li
                onClick={() => {
                  navigate("/categories");
                  toggleMenu();
                }}
              >
                Category
              </li>
              <li
                onClick={() => {
                  navigate("/wishlist");
                  toggleMenu();
                }}
              >
                Wishlist
              </li>
              <li
                onClick={() => {
                  navigate("/order");
                  toggleMenu();
                }}
              >
                Order
              </li>
              <li
                onClick={() => {
                  navigate("/profile");
                  toggleMenu();
                }}
              >
                Profile
              </li>
              {isLoggedIn && (
                <li
                  onClick={() => {
                    handleLogout();
                    toggleMenu();
                  }}
                >
                  Logout
                </li>
              )}
            </ul>
          </nav>
          <div className="center" onClick={() => navigate("/")}>
            TECH STORE
          </div>
          <div className="icons">
            <div className="right">
              {isLoggedIn && <FaSignOutAlt onClick={handleLogout} />}
              <TbSearch onClick={() => setShowSearch(true)} />
              <AiOutlineHeart onClick={() => navigate("/wishlist")} />
            </div>
            <span className="cart-icon" onClick={handleCartClick}>
              <CgShoppingCart />
              {!!cartCount && <span>{cartCount}</span>}
            </span>
          </div>
        </div>
      </header>
      {showCart && <Cart setShowCart={setShowCart} />}
      {showSearch && <Search setShowSearch={setShowSearch} />}
    </>
  );
};

export default Header;
