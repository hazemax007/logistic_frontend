import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';
import { Typography } from '@mui/material';

// Function to fetch data from the API
const fetchCustomerDemographics = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/dashboard/getCustomerDemographics'); // Adjust the URL to your API endpoint
    return response.data;
  } catch (error) {
    console.error('Error fetching customer demographics:', error);
    throw error;
  }
};

// Component to render the pie chart
const CustomerDemographicsPieChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  useEffect(() => {
    const getCustomerDemographics = async () => {
      try {
        const result = await fetchCustomerDemographics();
        setData(result);
      } catch (error) {
        setError('Failed to load customer demographics');
      } finally {
        setLoading(false);
      }
    };

    getCustomerDemographics();
  }, []);

  const formattedData = data.map(customer => ({
    name: customer.address,
    value: parseInt(customer.count, 10),
}));

  if (loading) return <Typography variant="h6">Loading...</Typography>;
  if (error) return <Typography variant="h6" color="error">{error}</Typography>;

  return (
    <div>
      <Typography variant="h5" component="h2" gutterBottom>
        Customer Demographics
      </Typography>
      <PieChart width={600  } height={400}>
      <Pie
          data={formattedData}
          dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={150}
                            fill="#8884d8"
                            label
        >
          {formattedData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default CustomerDemographicsPieChart;
