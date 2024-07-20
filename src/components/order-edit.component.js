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

const OrderEdit = ({ open, onClose, order, onUpdate }) => {
  const [orderData, setOrderData] = useState({
    ref: "",
    value: "",
    deliveryLocation: "",
    deliveryDate: "",
    status: "pending",
  });

  useEffect(() => {
    if (order) {
      setOrderData({
        ...order,
      });
    }
  }, [order]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/orders/${order.id}`,
        orderData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Edit Order</DialogTitle>
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
            label="Order Value"
            name="value"
            value={orderData.value}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            type="number"
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
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="fulfilled">Fulfilled</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </TextField>
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

export default OrderEdit;
