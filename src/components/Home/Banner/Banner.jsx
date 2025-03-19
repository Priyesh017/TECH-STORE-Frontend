import "./Banner.scss";
import { useNavigate } from "react-router-dom";
import BannerImg from "../../../assets/banner-img.png";

const Banner = () => {
  const navigate = useNavigate();
  const handleShopNow = () => {
    navigate("/category/1"); // Replace "/shop" with the path you want to navigate to
  };

  return (
    <div className="hero-banner">
      <div className="content">
        <div className="text-content">
          <h1>SALES</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias,
            mollitia labore repellendus cupiditate quas exercitationem illum
            saepe aliquid id similique, libero praesentium cumque neque impedit
            sequi sapiente, vitae odit porro?
          </p>
          <div className="ctas">
            <div className="banner-cta" onClick={handleShopNow}>
              Read More
            </div>
            <div className="banner-cta v2" onClick={handleShopNow}>
              Shop Now
            </div>
          </div>
        </div>
        <img
          className="banner-img"
          src={BannerImg}
          alt="bannerimg"
          onClick={handleShopNow}
        />
      </div>
    </div>
  );
};

export default Banner;
