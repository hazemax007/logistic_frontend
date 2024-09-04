import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const fetchTopProductsByQuantity = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/dashboard/topProductsByQuantity'); // Adjust the URL to your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching top products by quantity:', error);
    throw error;
  }
};

const TopProductsByQuantityTable = () => {
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getTopProducts = async () => {
      try {
        const data = await fetchTopProductsByQuantity();
        setTopProducts(data);

      } catch (error) {
        setError('Failed to load top products by quantity');
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
        Top Products by Quantity Sold
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Total Quantity</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topProducts.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell align="right">{product.totalQuantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TopProductsByQuantityTable;
