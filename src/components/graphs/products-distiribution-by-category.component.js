import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button, List, ListItem, ListItemText } from '@mui/material';    

// Function to fetch data from the API
const fetchProductCategories = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/dashboard/getProductCategories'); // Adjust the URL to your API endpoint
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching product categories:', error);
    throw error;
  }
};

// Component to render the pie chart
const ProductCategoriesPieChart = () => {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [productDetails, setProductDetails] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await axios.get('http://localhost:8080/api/dashboard/getProductCategories');
              setData(response.data);
              console.log(data);
          } catch (error) {
              console.error('Error fetching order status distribution:', error);
          }
      };
      
      fetchData();
  }, []);

  const handlePieClick = async (entry) => {
      setSelectedCategory(entry.name);
      try {
          const response = await axios.get(`http://localhost:8080/api/dashboard/getProductsByCategory/${entry.name}`);
          setProductDetails(response.data);
      } catch (error) {
          console.error('Error fetching product details:', error);
      }
      setOpenDialog(true);
  };

  const handleCloseDialog = () => {
      setOpenDialog(false);
      setProductDetails([]); // Clear order details on close
  };

  const formattedData = data.map(category => ({
      name: category.category,
      value: parseInt(category.productCount, 10),
  }));

  return (
      <Box sx={{ width: '100%', padding: 2 }}>
          <Typography variant="h5" component="h2" gutterBottom textAlign="center">
              Product Distribution By Category
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                  <Pie
                      data={formattedData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      fill="#8884d8"
                      label
                      onClick={handlePieClick}
                  >
                      {formattedData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
              </PieChart>
          </ResponsiveContainer>
          <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
              <DialogTitle>Order Details for {selectedCategory}</DialogTitle>
              <DialogContent>
                  <List>
                      {productDetails.length ? (
                          productDetails.map(product => (
                              <ListItem key={product.id}>
                                  <ListItemText 
                                      primary={`Product REF: ${product.ref}`}
                                      secondary={`Price: ${(product.buyPrice).toFixed(2)} DT, Quantity: ${product.quantity}, Min Stock Level: ${product.minStockLevel} , Expiry Date: ${new Date(product.expiryDate).toLocaleDateString()}`}
                                  />
                              </ListItem>
                          ))
                      ) : (
                          <ListItem>
                              <ListItemText primary="No Products found." />
                          </ListItem>
                      )}
                  </List>
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                      Close
                  </Button>
              </DialogActions>
          </Dialog>
      </Box>
  );
};

export default ProductCategoriesPieChart;
