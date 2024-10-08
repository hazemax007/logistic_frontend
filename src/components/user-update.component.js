import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Box,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

const UpdateUser = ({ user, roles, onUpdate, onClose }) => {
  const [updatedUser, setUpdatedUser] = useState(user);
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [error, setError] = useState('');

  // Sync user data and roles when the component mounts
  useEffect(() => {
    setUpdatedUser(user);
    if (user.roles) {
      // Synchronize the selected roles when editing a user
      setSelectedRoles(user.roles.map((role) => role.name));
    }
  }, [user]);

  const handleRoleChange = (event) => {
    const role = event.target.value;
    setSelectedRoles((prevSelectedRoles) =>
      event.target.checked
        ? [...prevSelectedRoles, role]
        : prevSelectedRoles.filter((r) => r !== role)
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userToUpdate = {
      ...updatedUser,
      roles: selectedRoles, // Updated selected roles
    };

    axios
      .put(`http://localhost:8080/api/test/users/${user.id}`, userToUpdate)
      .then((response) => {
        // Update the parent component with the newly updated user data
        onUpdate(response.data);

        // Close the dialog after updating
        onClose();
      })
      .catch((error) => setError(error.message));
  };

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>Update User</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Username"
            value={updatedUser.username || ''}
            onChange={(e) => setUpdatedUser({ ...updatedUser, username: e.target.value })}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={updatedUser.email || ''}
            onChange={(e) => setUpdatedUser({ ...updatedUser, email: e.target.value })}
            margin="normal"
          />
          <Typography variant="h6" component="h3" gutterBottom>
            Roles
          </Typography>
          <FormGroup>
            {roles.map((role) => (
              <FormControlLabel
                key={role}
                control={
                  <Checkbox
                    value={role}
                    checked={selectedRoles.includes(role)} // Dynamically set checked value
                    onChange={handleRoleChange}
                  />
                }
                label={role}
              />
            ))}
          </FormGroup>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UpdateUser;
