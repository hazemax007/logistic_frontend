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
  Select,
  InputLabel,
  FormControl,
  IconButton,
  Grid,
  Typography,
} from "@mui/material";
import { Add as AddIcon, Remove as RemoveIcon } from "@mui/icons-material";
import axios from "axios";

const OrderAdd = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState({
    ref: "",
    deliveryLocation: "",
    deliveryDate: "",
    status: "processing",
    customerInfo: {
      email: "",
    },
    storeInfo: {
      name: "",
    },
    productSelections: [],
  });

  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [stores, setStores] = useState([]);

  useEffect(() => {
    fetchProducts();
    fetchCustomers();
    fetchStores();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/customers");
      setCustomers(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const fetchStores = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/stores");
      setStores(response.data);
    } catch (error) {
      console.error("Error fetching stores:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("storeInfo.")) {
      const storeField = name.split(".")[1];
      setOrderData((prevData) => ({
        ...prevData,
        storeInfo: {
          ...prevData.storeInfo,
          [storeField]: value,
        },
      }));
    } else if (name.startsWith("customerInfo.")) {
      const customerField = name.split(".")[1];
      setOrderData((prevData) => ({
        ...prevData,
        customerInfo: {
          ...prevData.customerInfo,
          [customerField]: value,
        },
      }));
    } else {
      setOrderData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleProductChange = (index, field, value) => {
    const newProductSelections = [...orderData.productSelections];
    newProductSelections[index] = {
      ...newProductSelections[index],
      [field]: value,
    };

    if (field === "productId") {
      const selectedProduct = products.find((product) => product.id === value);
      if (selectedProduct) {
        newProductSelections[index].price = selectedProduct.buyPrice;
      }
    }

    setOrderData((prevData) => ({
      ...prevData,
      productSelections: newProductSelections,
    }));
  };

  const handleAddProductSelection = () => {
    setOrderData((prevData) => ({
      ...prevData,
      productSelections: [
        ...prevData.productSelections,
        { productId: "", quantity: 1, price: 0 },
      ],
    }));
  };

  const handleRemoveProductSelection = (index) => {
    const newProductSelections = orderData.productSelections.filter(
      (_, i) => i !== index
    );
    setOrderData((prevData) => ({
      ...prevData,
      productSelections: newProductSelections,
    }));
  };

  const handleSubmit = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).id;
    const { productSelections, ...orderPayload } = orderData;

    const orderProducts = productSelections.map(({ productId, quantity, price }) => ({
      productId,
      quantity,
      price,
    }));

    try {
      const response = await axios.post(
        `http://localhost:8080/api/orders`,
        { ...orderPayload, products: orderProducts },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onAdd(response.data);
      setOrderData({
        ref: "",
        deliveryLocation: "",
        deliveryDate: "",
        status: "processing",
        customerInfo: {
          email: "",
        },
        storeInfo: {
          name: "",
        },
        productSelections: [],
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Order
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Order</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              fullWidth
              label="Order Reference"
              name="ref"
              value={orderData.ref}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Delivery Location"
              name="deliveryLocation"
              value={orderData.deliveryLocation}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Delivery Date"
              name="deliveryDate"
              type="date"
              value={orderData.deliveryDate}
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
              label="Status"
              name="status"
              value={orderData.status}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            >
              <MenuItem value="processing">Processing</MenuItem>
              <MenuItem value="shipped">Shipped</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
              <MenuItem value="returned">Returned</MenuItem>
            </TextField>
            <Typography variant="h6" gutterBottom>
              Ordered Products
            </Typography>
            {orderData.productSelections.map((productSelection, index) => (
              <Grid container spacing={2} key={index}>
                <Grid item xs={5}>
                  <FormControl fullWidth variant="outlined" margin="normal">
                    <InputLabel>Product</InputLabel>
                    <Select
                      value={productSelection.productId}
                      onChange={(e) =>
                        handleProductChange(index, "productId", e.target.value)
                      }
                      label="Product"
                    >
                      {products.map((product) => (
                        <MenuItem key={product.id} value={product.id}>
                          {product.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Quantity"
                    type="number"
                    value={productSelection.quantity}
                    onChange={(e) =>
                      handleProductChange(index, "quantity", e.target.value)
                    }
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    label="Price"
                    type="number"
                    value={productSelection.price}
                    variant="outlined"
                    margin="normal"
                    disabled
                  />
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    onClick={() => handleRemoveProductSelection(index)}
                  >
                    <RemoveIcon />
                  </IconButton>
                </Grid>
              </Grid>
            ))}
            <Button
              onClick={handleAddProductSelection}
              startIcon={<AddIcon />}
              color="primary"
            >
              Add Product
            </Button>
            <Typography variant="h6" gutterBottom>
              To Customer
            </Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Customer Email</InputLabel>
              <Select
                value={orderData.customerInfo.email}
                onChange={handleChange}
                name="customerInfo.email"
                label="Customer Email"
              >
                {customers.map((customer) => (
                  <MenuItem key={customer.id} value={customer.email}>
                    {customer.email}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Typography variant="h6" gutterBottom>
              From Store
            </Typography>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel>Store name</InputLabel>
              <Select
                value={orderData.storeInfo.name}
                onChange={handleChange}
                name="storeInfo.name"
                label="Store Name"
              >
                {stores.map((store) => (
                  <MenuItem key={store.id} value={store.name}>
                    {store.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default OrderAdd;


