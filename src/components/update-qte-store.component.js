import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

const UpdateQuantityDialog = ({ open, onClose, product, stores, onUpdate }) => {
  const [selectedStore, setSelectedStore] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [error, setError] = useState("");
  console.log("product", product);
  console.log("selectedStore", selectedStore);
  console.log("quantity", quantity);
  useEffect(() => {
    if (product) {
      setQuantity(0); // Reset quantity when product changes
      setError(""); // Reset error
    }
  }, [product, open]);

  const handleChangeStore = (e) => {
    setSelectedStore(e.target.value);
  };

  const handleChangeQuantity = (e) => {
    setQuantity(Number(e.target.value));
  };

  const handleSubmit = async () => {
  if (!selectedStore || !product || quantity <= 0) {
    setError("Please ensure all fields are filled correctly.");
    return;
  }

  try {
    const response = await axios.post("http://localhost:8080/api/products/update-store-product-quantity", {
      storeId: selectedStore,
      productId: product.id,
      quantity: quantity,
    });
    console.log("product.id", product.id);
    console.log("selectedStore.id", selectedStore.id);
    console.log("quantity", quantity);
    onUpdate(response.data.updatedProduct); // Ensure the response contains the updated product
    onClose();
  } catch (error) {
    setError("Failed to update quantity. " + (error.response?.data?.message || ""));
    console.error("Error updating quantity:", error);
  }
};

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Update Product Quantity in Store</DialogTitle>
      <DialogContent>
        <Box>
          <FormControl fullWidth margin="normal">
            <InputLabel>Store</InputLabel>
            <Select
              value={selectedStore}
              onChange={handleChangeStore}
              variant="outlined"
              fullWidth
            >
              {stores.map((store) => (
                <MenuItem key={store.id} value={store.id}>
                  {store.name}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>{error}</FormHelperText>
          </FormControl>
          <TextField
            type="number"
            label="Quantity"
            value={quantity}
            onChange={handleChangeQuantity}
            fullWidth
            margin="normal"
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateQuantityDialog;
