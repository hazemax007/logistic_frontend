import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const fetchTopProducts = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/dashboard/topProductsBySales'); // Adjust the URL to your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching top products:', error);
    throw error;
  }
};

const TopProductsTable = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopProducts = async () => {
      try {
        const data = await fetchTopProducts();
        setTopProducts(data);
      } catch (error) {
        setError('Failed to load top products');
      } finally {
        setLoading(false);
      }
    };

    getTopProducts();
  }, []);

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper}>
      <Typography variant="h5" component="h2" gutterBottom>
        Top Products by Sales
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Total Sales</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell align="right">{product.totalSales.toFixed(2)} DT</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopProductsTable;
