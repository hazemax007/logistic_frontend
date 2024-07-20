import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import axios from 'axios';

const PurchasesByFeedbackPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchPurchasesFeedbackData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dash/purchases-feedback');
        const formattedData = response.data.map(item => ({
          feedback: item.feedback,
          count: Number(item.count) // Ensure count is a number
        }));
        console.log('Formatted Data:', formattedData); // Debugging
        setData(formattedData);
      } catch (error) {
        console.error('Error fetching purchases feedback data', error);
      }
    };

    fetchPurchasesFeedbackData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4444'];

  return (
    <div>
      <h2>Purchases by Client Feedback</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            dataKey="count"
            nameKey="feedback"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PurchasesByFeedbackPieChart;
