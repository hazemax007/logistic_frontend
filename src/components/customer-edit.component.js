import React, { useState, useEffect } from "react";
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

const CustomerEdit = ({ open, onClose, customer, onUpdate }) => {
  const [customerData, setCustomerData] = useState({
    firstname: "",
    lastname: "",
    address: "",
    phone: "",
    email: "",
    billingAddress: "",
  });

  useEffect(() => {
    if (customer) {
      setCustomerData({
        ...customer,
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/customers/${customer.id}`,
        customerData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating customer:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Customer</DialogTitle>
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

export default CustomerEdit;
