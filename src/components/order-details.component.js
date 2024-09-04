import React , {useState} from "react";
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
  const [invoiceMessage, setInvoiceMessage] = useState('');
  const [invoiceFilePath, setInvoiceFilePath] = useState('');
  if (!order) return null;
  //console.log(order);
  

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleGenerateInvoice = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/orders/generate-invoice/${order.id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/pdf'
        }
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `invoice_${order.id}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      } else {
        console.error('Error generating invoice:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
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
        <Button onClick={handleGenerateInvoice} color="secondary">
          Download Invoice
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default OrderDetails;
