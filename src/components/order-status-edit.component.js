import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from "@mui/material";
import axios from "axios";

const OrderStatusUpdate = ({ open, onClose, order, onUpdate, onReload }) => {
  const [orderData, setOrderData] = useState({
    status: "",
    type: "",
    weight: "",
    purchaseDate: "",
    paymentMethod: "",
    feedback: ""
  });

  useEffect(() => {
    if (order) {
      setOrderData({
        ...order,
        type: "",
        weight: "",
        purchaseDate: "",
        paymentMethod: "",
        feedback: ""
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
      const dataToSubmit = { status: orderData.status };
      if (orderData.status === "shipped") {
        dataToSubmit.type = orderData.type;
        dataToSubmit.weight = orderData.weight;
      } else if (orderData.status === "delivered") {
        dataToSubmit.purchaseDate = orderData.purchaseDate;
        dataToSubmit.paymentMethod = orderData.paymentMethod;
        dataToSubmit.feedback = orderData.feedback;
      }

      const response = await axios.put(
        `http://localhost:8080/api/orders/${order.id}/status`,
        dataToSubmit,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      onUpdate(response.data);
      onClose();
      onReload();
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
            <MenuItem value="fulfilled">Fulfilled</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
          </TextField>
          {orderData.status === "shipped" && (
            <>
              <TextField
                fullWidth
                label="Type"
                name="type"
                value={orderData.type}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                fullWidth
                label="Weight"
                name="weight"
                value={orderData.weight}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
            </>
          )}
          {orderData.status === "delivered" && (
            <>
              <TextField
                fullWidth
                label="Purchase Date"
                name="purchaseDate"
                type="date"
                value={orderData.purchaseDate}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                fullWidth
                label="Payment Method"
                name="paymentMethod"
                value={orderData.paymentMethod}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              />
              <TextField
                select
                fullWidth
                label="Feedback"
                name="feedback"
                value={orderData.feedback}
                onChange={handleChange}
                variant="outlined"
                margin="normal"
              >
                <MenuItem value="awkward">Awkward</MenuItem>
                <MenuItem value="bad">Bad</MenuItem>
                <MenuItem value="okay">Okay</MenuItem>
                <MenuItem value="good">Good</MenuItem>
                <MenuItem value="top">Top</MenuItem>
              </TextField>
            </>
          )}
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

export default OrderStatusUpdate;

