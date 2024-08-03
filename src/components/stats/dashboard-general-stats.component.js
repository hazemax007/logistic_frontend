import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select, MenuItem, FormControl, InputLabel, Box, Typography, Paper, Grid } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList, faMoneyBillAlt, faWarehouse } from '@fortawesome/free-solid-svg-icons';

const DashboardGeneralStats = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalQuantityInHand: 0,
  });
  const [filter, setFilter] = useState('today');

  const fetchStats = async (selectedFilter) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/dashboard/stats?filter=${selectedFilter}`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
    }
  };

  useEffect(() => {
    fetchStats(filter);
  }, [filter]);

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        General Statistics
      </Typography>
      <FormControl fullWidth variant="outlined" sx={{ mb: 3 }}>
        <InputLabel id="filter-label">Filter by</InputLabel>
        <Select
          labelId="filter-label"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          label="Filter by"
        >
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="day">Last 24 Hours</MenuItem>
          <MenuItem value="month">Last Month</MenuItem>
          <MenuItem value="year">Last Year</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <FontAwesomeIcon icon={faClipboardList} size="2x" />
            <Typography variant="h6">Orders</Typography>
            <Typography variant="h4">{stats.totalOrders}</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <FontAwesomeIcon icon={faMoneyBillAlt} size="2x" />
            <Typography variant="h6">Revenue</Typography>
            <Typography variant="h4">
              DT {stats.totalRevenue ? stats.totalRevenue.toFixed(2) : '0.00'}
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Paper sx={{ p: 2, textAlign: 'center' }}>
            <FontAwesomeIcon icon={faWarehouse} size="2x" />
            <Typography variant="h6">Quantity in Hand</Typography>
            <Typography variant="h4">{stats.totalQuantityInHand}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardGeneralStats;

