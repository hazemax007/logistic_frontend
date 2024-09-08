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

  const [errors, setErrors] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    email: "",
  });

  const [touched, setTouched] = useState({
    firstname: false,
    lastname: false,
    phone: false,
    email: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);

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

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const validateForm = () => {
    let newErrors = {};

    // First Name validation
    if (!customerData.firstname) {
      newErrors.firstname = "First name is required";
    } else {
      newErrors.firstname = "";
    }

    // Last Name validation
    if (!customerData.lastname) {
      newErrors.lastname = "Last name is required";
    } else {
      newErrors.lastname = "";
    }

    // Phone validation (Simple phone format check)
    const phonePattern = /^\d{8}$/;
    if (!customerData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!phonePattern.test(customerData.phone)) {
      newErrors.phone = "Phone number must be 8 digits";
    } else {
      newErrors.phone = "";
    }

    // Email validation (Simple email format check)
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!customerData.email) {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(customerData.email)) {
      newErrors.email = "Invalid email format";
    } else {
      newErrors.email = "";
    }

    setErrors(newErrors);

    // If no errors exist, form is valid
    setIsFormValid(
      !newErrors.firstname &&
      !newErrors.lastname &&
      !newErrors.phone &&
      !newErrors.email
    );
  };

  useEffect(() => {
    validateForm();
  }, [customerData]);

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
              onBlur={handleBlur}  // Trigger touch when input loses focus
              variant="outlined"
              margin="normal"
              error={touched.firstname && !!errors.firstname}  // Show error only if touched
              helperText={touched.firstname && errors.firstname}
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastname"
              value={customerData.lastname}
              onChange={handleChange}
              onBlur={handleBlur}  // Trigger touch when input loses focus
              variant="outlined"
              margin="normal"
              error={touched.lastname && !!errors.lastname}  // Show error only if touched
              helperText={touched.lastname && errors.lastname}
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
              onBlur={handleBlur}  // Trigger touch when input loses focus
              variant="outlined"
              margin="normal"
              error={touched.phone && !!errors.phone}  // Show error only if touched
              helperText={touched.phone && errors.phone}
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={customerData.email}
              onChange={handleChange}
              onBlur={handleBlur}  // Trigger touch when input loses focus
              variant="outlined"
              margin="normal"
              error={touched.email && !!errors.email}  // Show error only if touched
              helperText={touched.email && errors.email}
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
          <Button
            onClick={handleSubmit}
            color="primary"
            variant="contained"
            disabled={!isFormValid}  // Disable button if form is invalid
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CustomerAdd;
