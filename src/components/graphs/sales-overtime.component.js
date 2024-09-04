import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FormControl, InputLabel, Select, MenuItem, Typography, Box } from '@mui/material';

// Function to fetch sales data
const fetchSalesOverTime = async (period) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/dashboard/salesOverTime`, {
      params: { period }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching sales data:', error);
    throw error;
  }
};

const SalesOverTimeChart = () => {
  const [salesData, setSalesData] = useState([]);
  const [selectedPeriod, setSelectedPeriod] = useState('month'); // Default period

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSalesOverTime(selectedPeriod);
        setSalesData(data);
      } catch (error) {
        console.error('Error fetching sales data:', error);
      }
    };

    getData();
  }, [selectedPeriod]); // Fetch data when selectedPeriod changes

  const handlePeriodChange = (event) => {
    setSelectedPeriod(event.target.value);
  };

  return (
    <div>
        <Box textAlign="center">
      <Typography variant="h5" component="h2" gutterBottom>
        Sales Over Time
      </Typography>
    </Box>
      <div style={{display:'flex',justifyContent:'center'}}>
      <FormControl  variant="outlined" margin="normal">
      <InputLabel>Select Period</InputLabel>
      <Select id="period-select" value={selectedPeriod} onChange={handlePeriodChange} label="Select Period">
          <MenuItem value="day">Day</MenuItem>
          <MenuItem value="month">Month</MenuItem>
          <MenuItem value="year">Year</MenuItem>
        </Select>
      </FormControl>
        
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="total" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesOverTimeChart;
