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

const CustomerDetails = ({ open, onClose, customer }) => {
  if (!customer) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Customer Details</DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <Typography variant="subtitle2">First Name</Typography>
          <Typography variant="body1">{customer.firstname}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Last Name</Typography>
          <Typography variant="body1">{customer.lastname}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Address</Typography>
          <Typography variant="body1">{customer.address}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Phone</Typography>
          <Typography variant="body1">{customer.phone}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Email</Typography>
          <Typography variant="body1">{customer.email}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Billing Address</Typography>
          <Typography variant="body1">{customer.billingAddress}</Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomerDetails;
