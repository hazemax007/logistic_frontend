import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { Typography } from '@mui/material';

// Function to fetch data from the API
const fetchProductStockLevels = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/dashboard/getProductStockLevels'); // Adjust the URL to your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching product stock levels:', error);
    throw error;
  }
};

// Component to render the chart
const ProductStockChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProductStockLevels = async () => {
      try {
        const result = await fetchProductStockLevels();
        setData(result);
      } catch (error) {
        setError('Failed to load product stock levels');
      } finally {
        setLoading(false);
      }
    };

    getProductStockLevels();
  }, []);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Product Stock Levels
      </Typography>
      <BarChart
        width={600}
        height={300}
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="quantity" fill="#8884d8" name="Quantity" />
        <Bar dataKey="minStockLevel" fill="#82ca9d" name="Min Stock Level" />
      </BarChart>
    </div>
  );
};

export default ProductStockChart;
