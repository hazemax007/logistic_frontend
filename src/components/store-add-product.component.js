import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Modal,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function AssignProductsToStore({ store, isOpen, onClose }) {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (isOpen && store) {
      fetchProducts();
    }
  }, [isOpen, store]);

  const handleProductChange = (event) => {
    setSelectedProducts(event.target.value);
  };

  const handleAssignProduct = async () => {
    try {
      await axios.post(`http://localhost:8080/api/stores/assign-products/${store.id}`, {
        productIds: selectedProducts,
      });
      // Handle success or update state as needed
      onClose(); // Close modal using onClose function provided by parent
    } catch (error) {
      console.error('Error assigning product to store:', error);
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <h2>Assign Products to Store</h2>
        <FormControl fullWidth>
          <InputLabel id="product-label">Select Product(s)</InputLabel>
          <Select
            labelId="product-label"
            id="product-select"
            multiple
            value={selectedProducts}
            onChange={handleProductChange}
            label="Select Product(s)"
            renderValue={(selected) => selected.join(', ')}
          >
            {products.map((product) => (
              <MenuItem key={product.id} value={product.id}>
                {product.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
          <Button variant="contained" color="primary" onClick={handleAssignProduct}>
            Assign
          </Button>
          <Button variant="contained" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Box>
    </Modal>
  );
}

export default AssignProductsToStore;

