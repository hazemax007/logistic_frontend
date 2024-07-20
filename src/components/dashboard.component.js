import React, { useState } from 'react';
import OrderByPriceBarChart from "./charts/order-by-price-barchart.component";
import OrderByStatusPieChart from "./charts/order-by-status-piechart.component";
import OrderComparisonAreaChart from "./charts/order-comparison-areachart.component";
import OrderComparisonLineChart from "./charts/order-comparison-linechart.component";
import DashboardGeneralStats from "./stats/dashboard-general-stats.component";
import { Container, Grid, Button, Typography, Box, Paper } from '@mui/material';
import OrderComparisonBarChart from './charts/order-comparison-barchart.component';
import LabelByWeightPieChart from './charts/label-by-weight-piechart.component';
import PurchasesByFeedbackPieChart from './charts/purchase-by-feedback-piechart.component';
import TopSellingProductsChart from './stats/top-selling-product-stats.component';
//import '../styles/dashboard.component.css'; // Import your custom styles

const Dashboard = () => {
  const charts = [
    <Grid container spacing={2} key="page-1">
      <Grid item xs={12} md={6}>
        <Paper elevation={3}>
          <OrderByPriceBarChart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3}>
          <OrderByStatusPieChart />
        </Paper>
      </Grid>
    </Grid>,
    <Grid item xs={12} key="page-2">
      <Paper elevation={3}>
        <OrderComparisonAreaChart />
      </Paper>
    </Grid>,
    <Grid item xs={12} key="page-3">
      <Paper elevation={3}>
        <OrderComparisonLineChart />
      </Paper>
    </Grid>,
    <Grid item xs={12} key="page-4">
    <Paper elevation={3}>
      <OrderComparisonBarChart />
    </Paper>
  </Grid>,
  <Grid container spacing={2} key="page-5">
  
      <Grid item xs={12} md={6}>
        <Paper elevation={3}>
          <PurchasesByFeedbackPieChart />
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
        <Paper elevation={3}>
          <LabelByWeightPieChart />
        </Paper>
      </Grid>
</Grid>,
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = charts.length;

  const handlePrevClick = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages));
  };

  return (
    <Container>
      <Box mb={4}>
        <DashboardGeneralStats />
      </Box>
      <Box>
        {charts[currentPage - 1]}
      </Box>
      <Box mt={4} display="flex" justifyContent="center" alignItems="center">
        <Button variant="contained" color="primary" onClick={handlePrevClick} disabled={currentPage === 1}>
          Previous
        </Button>
        <Typography variant="body1" mx={2}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button variant="contained" color="primary" onClick={handleNextClick} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;