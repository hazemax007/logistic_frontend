import React, { useState } from 'react';
import { Modal, Box, TextField, Button } from '@mui/material';
import axios from 'axios';

const StoreAdd = ({ open, handleClose, onAddStore }) => {
  const [formData, setFormData] = useState({
    ref: '',
    name: '',
    location: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setFormData((prevData) => ({ ...prevData, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append('ref', formData.ref);
    form.append('name', formData.name);
    form.append('location', formData.location);
    if (formData.image) {
      form.append('image', formData.image);
    }

    try {
      const response = await axios.post('http://localhost:8080/api/stores', form, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Store added successfully:', response.data);
      onAddStore(response.data); // Call the callback function with the new store data
      handleClose();
    } catch (error) {
      console.error('Error adding store:', error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        component="form"
        onSubmit={handleSubmit}
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
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <TextField
          label="Reference"
          name="ref"
          value={formData.ref}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          fullWidth
          required
        />
        <Button variant="contained" component="label">
          Upload Image
          <input type="file" hidden onChange={handleImageChange} />
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Add Store
        </Button>
      </Box>
    </Modal>
  );
};

export default StoreAdd;
