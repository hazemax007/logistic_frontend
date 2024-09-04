import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/617b5b4039efc5a1c32182c5863e22598081548c958dc6d5d0cee6db65cd3794?apiKey=2af2801656554d03b3578dfa85dbd1f8&",
  },
  {
    name: "Inventory",
    path: "/inventory",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/92bb417e88930cc69815a3444f419cfd4a50891b44865bad5a1db928dfad75e1?apiKey=2af2801656554d03b3578dfa85dbd1f8&",
  },
  {
    name: "Customers",
    path: "/customers",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/11db26cf0612d0e42addc57b0106962d2090f9fa3578d18a1df7ec75b125027d?apiKey=2af2801656554d03b3578dfa85dbd1f8&",
  },
  {
    name: "Suppliers",
    path: "/suppliers",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/85d8cb76c43f333d15c299ce162cf79615ae17ec9dc29f8a27d461566828a46c?apiKey=2af2801656554d03b3578dfa85dbd1f8&",
  },
  {
    name: "Orders",
    path: "/orders",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/85f9e2508fb3b5874e65de4ee54f23f7f77a36c3390528e226de3a5f72ab48a0?apiKey=2af2801656554d03b3578dfa85dbd1f8&",
  },
  {
    name: "Stores",
    path: "/stores",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/19c1cc5b09486d6041039e205589e8dee355193b5d7fec4120879e6fad411f10?apiKey=2af2801656554d03b3578dfa85dbd1f8&",
  },
  {
    name: "Users",
    path: "/users",
    icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/7c69a3d23bd1f4de3af94198c4f580585b6334116c12de8d41eca483cd620475?apiKey=2af2801656554d03b3578dfa85dbd1f8&",
  },
];

const Sidebar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  //const history = useHistory();
  //console.log(userGoogle)
  

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }

    const handleLogout = () => {
      logOut();
    };

    EventBus.on("logout", handleLogout);

    return () => {
      EventBus.remove("logout", handleLogout);
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    history.push("/login");
  };

  /*const logout = () => {
		window.open(`${process.env.REACT_APP_API_URL}/auth/logout`, "_self");
    localStorage.removeItem("userGoogle");
    history.push("/login")
	};*/

  return (
    <div className="sidebar">
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/bc45a8af310ca706c2d9262c94db78dc1643d8ec0793bda359ebbb74acf30257?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
        className="logo"
        alt="Logo"
      />
      
      <div className="menu">
        {menuItems.map((item, index) => (
          <Link to={item.path} key={index} className="menu-item">
            <img loading="lazy" src={item.icon} className="icon" alt={item.name} />
            <div className="label">{item.name}</div>
          </Link>
        ))}
        {currentUser && (
          <div className="menu-item logout-item">
            <a href="/login" className="nav-link" onClick={logOut}>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/387f86b2849c1506911efa036df37217a0f3618ff98be1364ae946c831841f03?apiKey=2af2801656554d03b3578dfa85dbd1f8&"
              className="icon"
              alt="Log Out"
            />
            <div className="label">Log Out</div>
            </a>
            
          </div>
        )}
        
      </div>
      <style jsx>{`
        .sidebar {
          display: flex;
          flex-direction: column;
          
          border-radius: 0px 8px 8px 0px;
          border-right: 1px solid rgba(240, 241, 243, 1);
          background-color: #fff;
          max-width: 280px;
          font-size: 16px;
          color: #5d6679;
          font-weight: 500;
          line-height: 150%;
          padding: 24px 24px 28px;
        }

        .logo {
          aspect-ratio: 1.33;
          object-fit: contain;
          object-position: center;
          width: 68px;
        }

        .menu {
          display: flex;
          flex-direction: column;
          margin-top: 32px;
          padding: 8px 16px;
        }

        .menu-item {
          display: flex;
          gap: 16px;
          margin-top: 44px;
          align-items: center;
          white-space: nowrap;
          cursor: pointer;
        }

        .icon {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 24px;
        }

        .logout-item {
          cursor: pointer;
          color: red;
        }

        @media (max-width: 991px) {
          .sidebar {
            max-width: 100%;
            padding: 16px;
          }

          .menu-item {
            margin-top: 24px;
          }

          .menu {
            padding: 8px;
          }
        }
      `}</style>
    </div>
  );
};

export default Sidebar;