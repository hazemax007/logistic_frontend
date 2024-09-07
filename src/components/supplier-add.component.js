import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
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

const SupplierAdd = ({ onAdd }) => {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [supplierData, setSupplierData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    paymentTerms: "",
    deliveryTerms: "",
    specialAgreements: "",
  });

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:8080/api/suppliers/user/${currentUser.id}`, supplierData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      onAdd(response.data);
      setSupplierData({
        name: "",
        phone: "",
        email: "",
        location: "",
        paymentTerms: "",
        deliveryTerms: "",
        specialAgreements: "",
      });
      setOpen(false);
    } catch (error) {
      console.error("Error adding supplier:", error);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add Supplier
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>Add New Supplier</DialogTitle>
        <DialogContent>
          <Box>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={supplierData.name}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Phone"
              name="phone"
              value={supplierData.phone}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={supplierData.email}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Location"
              name="location"
              value={supplierData.location}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Payment Terms"
              name="paymentTerms"
              value={supplierData.paymentTerms}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Delivery Terms"
              name="deliveryTerms"
              value={supplierData.deliveryTerms}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
            />
            <TextField
              fullWidth
              label="Special Agreements"
              name="specialAgreements"
              value={supplierData.specialAgreements}
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

export default SupplierAdd;
