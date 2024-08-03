import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import AuthService from "./services/auth.service";
import EventBus from "./common/EventBus";
import Sidebar from "./components/sidebar.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import BoardUser from "./components/board-user.component";
import BoardModerator from "./components/board-moderator.component";
import BoardAdmin from "./components/board-admin.component";
import Dashboard from "./components/dashboard.component";
import ForgetPassword from "./components/forget-password.component";
import ResetPassword from "./components/reset-password.component";
import Products from "./components/products.component";
import Orders from "./components/orders.component";
import Suppliers from "./components/suppliers.component";
import Customers from "./components/customers.component";
import Stores from "./components/stores.component";
import Users from "./components/users.component";
import VerifyUser from "./components/verify-user.component";
import { Inventory } from "@mui/icons-material";
import Dashboardd from "./components/statistics/general-stats.component";

const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentUserGoogle,setCurrentUserGoogle] = useState(undefined)

  /*const getUser = async () => {
		try {
			const url = `${process.env.REACT_APP_API_URL}/auth/login/success`;
			const { data } = await axios.get(url, { withCredentials: true });
			setCurrentUserGoogle(data.user._json);
      localStorage.setItem("userGoogle", JSON.stringify(currentUserGoogle));
		} catch (err) {
			console.log(err);
		}
	};*/

  useEffect(() => {

    //getUser()

    const user = AuthService.getCurrentUser();

    

    if (user) {
      setCurrentUser(user);
      setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
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
    setShowModeratorBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  return (
    <div className="app-container">
      {currentUser  && <Sidebar />}
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account-verification/:verifyToken" element={<VerifyUser />} />
          {currentUser && <Route path="/user" element={<BoardUser />} />}
          {showModeratorBoard && <Route path="/mod" element={<BoardModerator />} />}
          {showAdminBoard && <Route path="/admin" element={<BoardAdmin />} />}
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/stores" element={<Stores />} />
          <Route path="/users" element={<Users />} />

          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
};

export default App;

