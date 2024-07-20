import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import axios from 'axios';

const OrderDetails = ({ open, onClose, order }) => {
  if (!order) return null;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleDownloadInvoice = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/api/orders/generate-invoice/${order.id}`, {
        responseType: 'blob', // Important for downloading files
      });

      // Create a link element to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `invoice_${order.ref}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Failed to download invoice:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Order Details</DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <Typography variant="subtitle2">Order Reference</Typography>
          <Typography variant="body1">{order.ref}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Order Value</Typography>
          <Typography variant="body1">₹{order.value}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Delivery Location</Typography>
          <Typography variant="body1">{order.deliveryLocation}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Delivery Date</Typography>
          <Typography variant="body1">{formatDate(order.deliveryDate)}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Status</Typography>
          <Typography variant="body1">{order.status}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button onClick={handleDownloadInvoice} color="secondary">
          Download Invoice
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetails;
