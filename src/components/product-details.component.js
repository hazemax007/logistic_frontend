import React from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

const ProductDetails = ({ open, onClose, product }) => {
  // Ensure product is defined before rendering
  if (!product) return null;
  

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{product.name}</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Primary Details
              </Typography>
              <Divider />
              <Box my={2}>
                <Typography variant="subtitle2">Product Name</Typography>
                <Typography variant="body1">{product.name}</Typography>
              </Box>
              <Box my={2}>
                <Typography variant="subtitle2">Product Reference</Typography>
                <Typography variant="body1">{product.ref}</Typography>
              </Box>
              <Box my={2}>
                <Typography variant="subtitle2">Product Category</Typography>
                <Typography variant="body1">{product.category}</Typography>
              </Box>
              <Box my={2}>
                <Typography variant="subtitle2">Expiry Date</Typography>
                <Typography variant="body1">
                  {product.expiryDate
                    ? new Date(product.expiryDate).toLocaleDateString()
                    : "N/A"}
                </Typography>
              </Box>
              <Box my={2}>
                <Typography variant="subtitle2">Buy Price</Typography>
                <Typography variant="body1">{product.buyPrice} DT</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} variant="outlined" sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Supplier Details
              </Typography>
              <Divider />
              <Box my={2}>
                <Typography variant="subtitle2">Supplier Name</Typography>
                <Typography variant="body1"> {product.suppliers[0].name} </Typography>
              </Box>
              <Box my={2}>
                <Typography variant="subtitle2">Contact Number</Typography>
                <Typography variant="body1">  {product.suppliers[0].phone} </Typography>
              </Box>
              <Typography variant="h6" gutterBottom mt={3}>
                Stock Information
              </Typography>
              <Divider />
              <Box my={2}>
                <Typography variant="subtitle2">Quantity</Typography>
                <Typography variant="body1">{product.quantity}</Typography>
              </Box>
              <Box my={2}>
                <Typography variant="subtitle2">Minimum Stock Level</Typography>
                <Typography variant="body1">{product.minStockLevel}</Typography>
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            {product.imagePath && (
              <Box my={3} display="flex" justifyContent="center">
                <img
                  src={`http://localhost:8080/${product.imagePath.replace(
                    /\\/g,
                    "/"
                  )}`}
                  alt={product.name}
                  style={{ maxWidth: "100%", maxHeight: "300px", objectFit: "contain" }}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductDetails;
