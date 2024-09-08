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
  Chip
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
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);

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
        setError((prevErrors) => ({
          ...prevErrors,
          fetch: "Failed to load suppliers or stores",
        }));
        console.error(err);
      }
    };
    fetchSuppliersAndStores();
  }, []);

  const validate = () => {
    let tempErrors = {};
    const { ref, name, buyPrice, quantity, minStockLevel, expiryDate, selectedSuppliers, selectedStores } = productData;
    
    if (!ref) tempErrors.ref = "Reference is required.";
    if (!name) tempErrors.name = "Name is required.";
    if (!buyPrice || isNaN(buyPrice) || Number(buyPrice) <= 0) tempErrors.buyPrice = "A valid buying price (greater than 0) is required.";
    if (!quantity || isNaN(quantity) || Number(quantity) <= 0) tempErrors.quantity = "A valid quantity (greater than 0) is required.";
    if (!minStockLevel || isNaN(minStockLevel) || Number(minStockLevel) < 0) tempErrors.minStockLevel = "A valid minimum stock level (0 or more) is required.";
    if (!expiryDate) tempErrors.expiryDate = "Expiry date is required.";
    if (selectedSuppliers.length === 0) tempErrors.selectedSuppliers = "At least one supplier must be selected.";
    if (selectedStores.length === 0) tempErrors.selectedStores = "At least one store must be selected.";

    setError(tempErrors);
    return Object.keys(tempErrors).length === 0;
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
    if (!validate()) return; // Stop if validation fails

    setLoading(true);

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
      setError({});
      setOpen(false);
    } catch (error) {
      setError((prevErrors) => ({
        ...prevErrors,
        submit: "Failed to add product. Please try again later.",
      }));
      console.error("Error adding product:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => setOpen(true)}>
        Add Product
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="md" fullWidth>
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
              error={!!error.ref}
              helperText={error.ref}
            />
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={productData.name}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              error={!!error.name}
              helperText={error.name}
            />
            <TextField
              fullWidth
              label="Buying Price (DT)"
              name="buyPrice"
              value={productData.buyPrice}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              error={!!error.buyPrice}
              helperText={error.buyPrice}
            />
            <TextField
              fullWidth
              label="Quantity"
              name="quantity"
              value={productData.quantity}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              error={!!error.quantity}
              helperText={error.quantity}
            />
            <TextField
              fullWidth
              label="Minimum Stock Level"
              name="minStockLevel"
              value={productData.minStockLevel}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              error={!!error.minStockLevel}
              helperText={error.minStockLevel}
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
              error={!!error.expiryDate}
              helperText={error.expiryDate}
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
                onChange={(e) => setProductData({ ...productData, selectedSuppliers: e.target.value })}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {suppliers.map((supplier) => (
                  <MenuItem key={supplier.name} value={supplier.name}>
                    {supplier.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select at least one supplier</FormHelperText>
              {error.selectedSuppliers && (
                <FormHelperText error>{error.selectedSuppliers}</FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth margin="normal">
              <InputLabel>Stores</InputLabel>
              <Select
                multiple
                name="selectedStores"
                value={productData.selectedStores}
                onChange={(e) => setProductData({ ...productData, selectedStores: e.target.value })}
                renderValue={(selected) => (
                  <div>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </div>
                )}
              >
                {stores.map((store) => (
                  <MenuItem key={store.name} value={store.name}>
                    {store.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select at least one store</FormHelperText>
              {error.selectedStores && (
                <FormHelperText error>{error.selectedStores}</FormHelperText>
              )}
            </FormControl>
            {error.submit && <Box color="error.main">{error.submit}</Box>}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={loading || Object.keys(error).length > 0}
          >
            {loading ? "Adding..." : "Add Product"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductAdd;
