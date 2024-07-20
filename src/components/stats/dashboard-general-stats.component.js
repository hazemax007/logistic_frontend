import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faClipboardList, faMoneyBillAlt, faTruck, faWarehouse } from '@fortawesome/free-solid-svg-icons';
import './dashboard-general.component.css';

const DashboardGeneralStats = () => {
  const [stats, setStats] = useState({
    totalLabels: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCost: 0,
    totalQuantityInHand: 0,
    totalToBeReceived: 0,
    totalSuppliers: 0,
    totalCategories: 0,
    totalPurchases: 0
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dash/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">General Statistics</h2>
      <div className="stats-container">
        <div className="stat-box">
          <FontAwesomeIcon icon={faClipboardList} className="icon" />
          <div className="stat-info">
            <h3>Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
        </div>
        <div className="stat-box">
          <FontAwesomeIcon icon={faBox} className="icon" />
          <div className="stat-info">
            <h3>Labels</h3>
            <p>{stats.totalLabels}</p>
          </div>
        </div>
        <div className="stat-box">
          <FontAwesomeIcon icon={faMoneyBillAlt} className="icon" />
          <div className="stat-info">
            <h3>Revenue</h3>
            <p>DT {stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>
        <div className="stat-box">
          <FontAwesomeIcon icon={faTruck} className="icon" />
          <div className="stat-info">
            <h3>To be Received</h3>
            <p>{stats.totalToBeReceived}</p>
          </div>
        </div>
        <div className="stat-box">
          <FontAwesomeIcon icon={faWarehouse} className="icon" />
          <div className="stat-info">
            <h3>Quantity in Hand</h3>
            <p>{stats.totalQuantityInHand}</p>
          </div>
        </div>
        <div className="stat-box">
          <FontAwesomeIcon icon={faTruck} className="icon" />
          <div className="stat-info">
            <h3>Suppliers</h3>
            <p>{stats.totalSuppliers}</p>
          </div>
        </div>
        <div className="stat-box">
          <FontAwesomeIcon icon={faBox} className="icon" />
          <div className="stat-info">
            <h3>Purchases</h3>
            <p>{stats.totalPurchases}</p>
          </div>
        </div>
        <div className="stat-box">
          <FontAwesomeIcon icon={faMoneyBillAlt} className="icon" />
          <div className="stat-info">
            <h3>Cost</h3>
            <p>DT {stats.totalCost.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGeneralStats;



