import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container } from '@mui/material';
import axios from 'axios';

const TopCustomersTable = () => {
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    const fetchTopCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dashboard/getTopCustomers '); // Adjust the endpoint as needed
        setTopCustomers(response.data);
      } catch (error) {
        console.error('Error fetching top customers:', error);
      }
    };

    fetchTopCustomers();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Top Customers
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Total Spent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.id}</TableCell>
                <TableCell>{customer.lastname}</TableCell>
                <TableCell>{customer.totalSpent.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default TopCustomersTable;
