// components/product-filter.component.js
import React, { useState } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Box } from "@mui/material";

const ProductFilter = ({ open, onClose, onFilter }) => {
  const [category, setCategory] = useState("");
  const [buyPrice, setBuyPrice] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  const handleFilter = () => {
    onFilter({ category, buyPrice, expiryDate });
    onClose();
  };

  const handleClear = () => {
    setCategory("");
    setBuyPrice("");
    setExpiryDate("");
    onFilter({ category: "", buyPrice: "", expiryDate: "" });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Filter Products</DialogTitle>
      <DialogContent>
        <Box mb={2}>
          <TextField
            select
            label="Category"
            fullWidth
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="category1">Category 1</MenuItem>
            <MenuItem value="category2">Category 2</MenuItem>
            <MenuItem value="category3">Category 3</MenuItem>
          </TextField>
        </Box>
        <Box mb={2}>
          <TextField
            label="Buy Price (Max)"
            type="number"
            fullWidth
            value={buyPrice}
            onChange={(e) => setBuyPrice(e.target.value)}
          />
        </Box>
        <Box mb={2}>
          <TextField
            label="Expiry Date"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }}
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClear} color="primary">
          Clear
        </Button>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleFilter} color="primary">
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFilter;
