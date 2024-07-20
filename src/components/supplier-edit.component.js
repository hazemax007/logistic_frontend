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

const SupplierEdit = ({ open, onClose, supplier, onUpdate }) => {
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
    if (supplier) {
      setSupplierData({
        ...supplier,
      });
    }
  }, [supplier]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/suppliers/${supplier.id}`,
        supplierData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating supplier:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Supplier</DialogTitle>
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

export default SupplierEdit;

