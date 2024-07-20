import React, { useState, useEffect } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Divider,
  Paper,
} from "@mui/material";
import axios from "axios";

const StoreDetails = ({ open, onClose, store }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (store) {
      setProducts(store.products);
    }
  }, [store]);

  const handleDeleteProduct = async (storeId, productId) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/stores/${storeId}/products/${productId}`);
      if (response.status === 200) {
        setProducts(products.filter((product) => product.id !== productId));
        console.log('Product removed from store successfully');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  if (!store) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{store.name}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          {/* Display products list */}
          <Grid item xs={12}>
            <Paper elevation={3} variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Products Available
              </Typography>
              <Divider />
              <Grid container spacing={2}>
                {products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product.id}>
                    <Box display="flex" alignItems="center" justifyContent="center" flexDirection="column">
                      <img
                        src={`http://localhost:8080/${product.imagePath.replace(/\\/g, "/")}`}
                        alt={product.name}
                        style={{ maxWidth: "100%", maxHeight: "150px", objectFit: "contain" }}
                      />
                      <Typography variant="subtitle2">{product.name}</Typography>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleDeleteProduct(store.id, product.id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
          
          {/* Display store details and store image */}
          <Grid item xs={12}>
            <Paper elevation={3} variant="outlined" sx={{ p: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    Store Details
                  </Typography>
                  <Divider />
                  <Box my={2}>
                    <Typography variant="subtitle2">Store Name</Typography>
                    <Typography variant="body1">{store.name}</Typography>
                  </Box>
                  <Box my={2}>
                    <Typography variant="subtitle2">Store Reference</Typography>
                    <Typography variant="body1">{store.ref}</Typography>
                  </Box>
                  <Box my={2}>
                    <Typography variant="subtitle2">Store Location</Typography>
                    <Typography variant="body1">{store.location}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                  {store.imagePath && (
                    <Box my={3} display="flex" justifyContent="center">
                      <img
                        src={`http://localhost:8080/${store.imagePath.replace(/\\/g, "/")}`}
                        alt={store.name}
                        style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain" }}
                      />
                    </Box>
                  )}
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreDetails;
