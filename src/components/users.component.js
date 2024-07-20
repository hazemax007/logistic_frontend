import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon, Visibility as VisibilityIcon } from "@mui/icons-material";
import UpdateUser from './user-update.component';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const usersPerPage = 10;

  const roles = ["admin", "manager", "paymaster"];

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/test/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleUpdateUser = (updatedUser) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8080/api/test/users/${userId}`);
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userId)
      );
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const blockUser = async (userId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/test/users/block/${userId}`);
      updateStatus(userId, response.data.status);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const unblockUser = async (userId) => {
    try {
      const response = await axios.post(`http://localhost:8080/api/test/users/unblock/${userId}`);
      updateStatus(userId, response.data.status);
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  };

  const updateStatus = (userId, newStatus) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const editUser = (user) => {
    const userWithRoles = { ...user, roles: user.roles || [] };
    setSelectedUser(userWithRoles);
    setIsEditModalOpen(true);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users.length / usersPerPage);

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Admin Control
        </Typography>
        <Divider />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User ID</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentUsers.map((user, index) => (
                <TableRow key={index}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.status}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => editUser(user)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteUser(user.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                    <Button
                      variant="outlined"
                      color={user.status === 'Active' ? "secondary" : "primary"}
                      onClick={() => {
                        if (user.status === 'Active') {
                          blockUser(user.id);
                        } else {
                          unblockUser(user.id);
                        }
                      }}
                    >
                      {user.status === 'Active' ? 'Block' : 'Unblock'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
          <Button variant="outlined" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Typography>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button variant="outlined" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </Box>
      </Box>

      {isEditModalOpen && selectedUser && (
        <UpdateUser
          user={selectedUser}
          roles={roles}
          onUpdate={handleUpdateUser}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </Container>
  );
};

export default Users;

