import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import axios from "axios";

const CustomerAdd = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [customerData, setCustomerData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
    billingAddress: "",
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/customers", customerData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      onAdd(response.data);
      setCustomerData({
        firstname: "",
        lastname: "",
        address: "",
        phone: "",
        email: "",
        billingAddress: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Customer
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              fullWidth
              label="First Name"
              name="firstname"
              value={customerData.firstname}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastname"
              value={customerData.lastname}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={customerData.address}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={customerData.phone}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={customerData.email}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Billing Address"
              name="billingAddress"
              value={customerData.billingAddress}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
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

export default CustomerAdd;
