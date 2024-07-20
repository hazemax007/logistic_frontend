import React, { useState } from "react";
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

const ProductAdd = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [productData, setProductData] = useState({
    ref: "",
    name: "",
    buyPrice: "",
    quantity: "",
    minStockLevel: "",
    expiryDate: "",
    category: "category1", // Default category
    imageFile: null,
    imageUrl: null,
  });

  const categories = ["category1", "category2", "category3"];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Display the selected image preview
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData((prevData) => ({
          ...prevData,
          imageFile: file,
          imageUrl: reader.result, // Set image URL for preview
        }));
      };
      reader.readAsDataURL(file); // Read file as data URL
    }
  };

  const handleSubmit = async () => {
    try {
      // Create form data to send as multipart/form-data
      const formData = new FormData();
      formData.append("ref", productData.ref);
      formData.append("name", productData.name);
      formData.append("buyPrice", productData.buyPrice);
      formData.append("quantity", productData.quantity);
      formData.append("minStockLevel", productData.minStockLevel);
      formData.append("expiryDate", productData.expiryDate);
      formData.append("category", productData.category);
      formData.append("image", productData.imageFile); // Append image file

      const response = await axios.post("http://localhost:8080/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Call the onAdd function passed as prop to handle adding the new product
      onAdd(response.data);

      // Reset the form fields and close the modal
      setProductData({
        ref: "",
        name: "",
        buyPrice: "",
        quantity: "",
        minStockLevel: "",
        expiryDate: "",
        category: "category1", // Reset to default category
        imageFile: null,
        imageUrl: null,
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
      // Handle error, e.g., show error message to the user
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Product
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Product</DialogTitle>
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
            <FormControl fullWidth margin="normal">
              
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                style={{ display: "none" }}
                id="imageFileInput"
              />
              <label htmlFor="imageFileInput">
                <Button
                  variant="outlined"
                  component="span"
                  style={{ marginTop: "10px" }}
                >
                  Upload
                </Button>
              </label>
              <FormHelperText>Upload a product image</FormHelperText>
              {productData.imageUrl && (
                <img
                  src={productData.imageUrl}
                  alt="Uploaded Product"
                  style={{ marginTop: "10px", maxWidth: "100%", maxHeight: "300px" }}
                />
              )}
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductAdd;



