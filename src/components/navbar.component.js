import React from "react";

const Navbar = () => {
    return (
      <>
        <div className="navbar">
          <div className="search">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/f6e793230881e2a3222aafdeb1da7184a77393d10ecffcb3b5331db02d2cbe75?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
              className="search-icon"
              alt="Search Icon"
            />
            <input
              type="text"
              placeholder="Search product, supplier, order"
              className="search-input"
            />
          </div>
          <div className="profile">
            <img
              loading="lazy"
              srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/61f0852a38e8ee67c2783e83bc679b08009ab4144e7f907e43e09ee868cd82a3?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/61f0852a38e8ee67c2783e83bc679b08009ab4144e7f907e43e09ee868cd82a3?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/61f0852a38e8ee67c2783e83bc679b08009ab4144e7f907e43e09ee868cd82a3?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/61f0852a38e8ee67c2783e83bc679b08009ab4144e7f907e43e09ee868cd82a3?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/61f0852a38e8ee67c2783e83bc679b08009ab4144e7f907e43e09ee868cd82a3?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/61f0852a38e8ee67c2783e83bc679b08009ab4144e7f907e43e09ee868cd82a3?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/61f0852a38e8ee67c2783e83bc679b08009ab4144e7f907e43e09ee868cd82a3?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/61f0852a38e8ee67c2783e83bc679b08009ab4144e7f907e43e09ee868cd82a3?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
              className="profile-img"
              alt="Profile Image"
            />
          </div>
        </div>
        <style jsx>{`
          .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 32px;
            background-color: #ffffff;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          }
  
          .search {
            display: flex;
            align-items: center;
          }
  
          .search-icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
          }
  
          .search-input {
            border: none;
            padding: 8px;
            border-radius: 4px;
            font-size: 16px;
            color: #5d6679;
            font-weight: 500;
            line-height: 150%;
            width: 240px;
          }
  
          .profile-img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            object-fit: cover;
          }
  
          @media (max-width: 991px) {
            .navbar {
              padding: 16px;
            }
  
            .search-input {
              width: 180px;
            }
          }
        `}</style>
      </>
    );
  };
  
  export default Navbar;