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

const SupplierDetails = ({ open, onClose, supplier }) => {
  if (!supplier) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Supplier Details</DialogTitle>
      <DialogContent dividers>
        <Box mb={2}>
          <Typography variant="subtitle2">Name</Typography>
          <Typography variant="body1">{supplier.name}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Phone</Typography>
          <Typography variant="body1">{supplier.phone}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Email</Typography>
          <Typography variant="body1">{supplier.email}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Location</Typography>
          <Typography variant="body1">{supplier.location}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Payment Terms</Typography>
          <Typography variant="body1">{supplier.paymentTerms}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Delivery Terms</Typography>
          <Typography variant="body1">{supplier.deliveryTerms}</Typography>
        </Box>
        <Box mb={2}>
          <Typography variant="subtitle2">Special Agreements</Typography>
          <Typography variant="body1">{supplier.specialAgreements}</Typography>
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

export default SupplierDetails;
