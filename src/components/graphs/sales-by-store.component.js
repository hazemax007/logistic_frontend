import React, { useEffect, useState } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import axios from 'axios';
import { Container, Typography } from '@mui/material';

const SalesByStoreChart = () => {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dashboard/getSalesByStore'); // Adjust the endpoint as needed
        setSalesData(response.data.map(item => ({
          id: item.store.id,
          name: item.store.name,
          totalSales: item.totalSales
        })));
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Sales by Store
      </Typography>
      <ScatterChart width={1000} height={400} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          type="category"
          dataKey="name"
          name="Store Name"
          tick={{ angle: 0, textAnchor: 'end' }}
        />
        <YAxis
          type="number"
          dataKey="totalSales"
          name="Total Sales"
          unit="DT"
        />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Store Sales" data={salesData} fill="#8884d8" />
      </ScatterChart>
    </Container>
  );
};

export default SalesByStoreChart;

