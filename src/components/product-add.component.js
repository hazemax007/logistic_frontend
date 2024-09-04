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
  Chip // Import Chip here
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
    category: "category1",
    imageFile: null,
    imageUrl: null,
    selectedSuppliers: [],
    selectedStores: [],
  });

  const [suppliers, setSuppliers] = useState([]);
  const [stores, setStores] = useState([]);
  const [error, setError] = useState(null);

  const categories = ["category1", "category2", "category3"];

  useEffect(() => {
    // Fetch suppliers and stores when the component mounts
    const fetchSuppliersAndStores = async () => {
      try {
        const [suppliersResponse, storesResponse] = await Promise.all([
          axios.get("http://localhost:8080/api/suppliers"),
          axios.get("http://localhost:8080/api/stores"),
        ]);
        setSuppliers(suppliersResponse.data);
        setStores(storesResponse.data);
      } catch (err) {
        setError("Failed to load suppliers or stores");
        console.error(err);
      }
    };
    fetchSuppliersAndStores();
  }, []);

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
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProductData((prevData) => ({
          ...prevData,
          imageFile: file,
          imageUrl: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("ref", productData.ref);
      formData.append("name", productData.name);
      formData.append("buyPrice", productData.buyPrice);
      formData.append("quantity", productData.quantity);
      formData.append("minStockLevel", productData.minStockLevel);
      formData.append("expiryDate", productData.expiryDate);
      formData.append("category", productData.category);
      formData.append("image", productData.imageFile);
      formData.append("supplierNames", productData.selectedSuppliers.join(","));
      formData.append("storeNames", productData.selectedStores.join(","));

      const response = await axios.post("http://localhost:8080/api/products/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      onAdd(response.data);

      setProductData({
        ref: "",
        name: "",
        buyPrice: "",
        quantity: "",
        minStockLevel: "",
        expiryDate: "",
        category: "category1",
        imageFile: null,
        imageUrl: null,
        selectedSuppliers: [],
        selectedStores: [],
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding product:", error);
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={productData.category}
                onChange={handleChange}
                variant="outlined"
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select a product category</FormHelperText>
            </FormControl>
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
                  Upload Image
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
            <FormControl fullWidth margin="normal">
              <InputLabel>Suppliers</InputLabel>
              <Select
                multiple
                name="selectedSuppliers"
                value={productData.selectedSuppliers}
                onChange={(e) =>
                  setProductData((prevData) => ({
                    ...prevData,
                    selectedSuppliers: e.target.value,
                  }))
                }
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                variant="outlined"
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.name} value={supplier.name}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select suppliers for the product</FormHelperText>
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Stores</InputLabel>
              <Select
                multiple
                name="selectedStores"
                value={productData.selectedStores}
                onChange={(e) =>
                  setProductData((prevData) => ({
                    ...prevData,
                    selectedStores: e.target.value,
                  }))
                }
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                variant="outlined"
              >
                {stores.map((store) => (
                  <MenuItem key={store.name} value={store.name}>
                    {store.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select stores for the product</FormHelperText>
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




