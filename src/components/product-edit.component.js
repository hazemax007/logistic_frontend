import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

const ProductEdit = ({ open, onClose, product, onUpdate }) => {
  const [productData, setProductData] = useState({
    ref: "",
    name: "",
    buyPrice: "",
    quantity: "",
    minStockLevel: "",
    expiryDate: "",
    category: "category1", // Default category
  });

  const categories = ["category1", "category2", "category3"];

  useEffect(() => {
    if (product) {
      setProductData({
        ...product,
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/products/${product.id}`,
        productData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Product</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            fullWidth
            label="Reference"
            name="ref"
            value={productData.ref}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={productData.name}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Buying Price (DT)"
            name="buyPrice"
            value={productData.buyPrice}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Quantity"
            name="quantity"
            value={productData.quantity}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Minimum Stock Level"
            name="minStockLevel"
            value={productData.minStockLevel}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Expiry Date"
            name="expiryDate"
            type="date"
            value={productData.expiryDate}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            select
            fullWidth
            label="Category"
            name="category"
            value={productData.category}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
          >
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductEdit;
