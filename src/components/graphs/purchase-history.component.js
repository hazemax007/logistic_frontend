import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Container, TextField, Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import axios from 'axios';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'; // Import date adapter

const PurchaseHistoryTable = () => {
  const [purchaseData, setPurchaseData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().startOf('day'));

  useEffect(() => {
    const fetchPurchaseHistory = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dashboard/getPurchaseHistory');
        setPurchaseData(response.data);
        filterDataByDate(response.data, selectedDate);
      } catch (error) {
        console.error('Error fetching purchase history:', error);
      }
    };

    fetchPurchaseHistory();
  }, [selectedDate]);

  const filterDataByDate = (data, date) => {
    const filtered = data.filter((purchase) =>
      dayjs(purchase.purchaseDate).isSame(date, 'day')
    );
    setFilteredData(filtered);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Container>
        <Typography variant="h4" gutterBottom>
          Purchase History
        </Typography>
        <Box mb={2}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newValue) => {
              setSelectedDate(dayjs(newValue).startOf('day'));
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Purchase Date</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Feedback</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredData.map((purchase) => (
                <TableRow key={purchase.id}>
                  <TableCell>{purchase.id}</TableCell>
                  <TableCell>{dayjs(purchase.purchaseDate).format('YYYY-MM-DD')}</TableCell>
                  <TableCell>{purchase.paymentMethod}</TableCell>
                  <TableCell>{purchase.feedback}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </LocalizationProvider>
  );
};

export default PurchaseHistoryTable;
 