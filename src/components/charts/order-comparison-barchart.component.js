import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const OrderComparisonBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dash/monthly-labels-purchases');
        const { labelsPerMonth, purchasesPerMonth } = response.data;
        console.log(response.data)
        // Combine data
        const combinedData = labelsPerMonth.map((label, index) => {
          const purchase = purchasesPerMonth[index];
          return {
            month: label.month,
            labels: label.count,
            purchases: purchase ? purchase.count : 0
          };
        });

        setData(combinedData);
      } catch (error) {
        console.error('Error fetching monthly labels and purchases data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Monthly Labels vs Purchases</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 20, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="labels" fill="#8884d8" />
          <Bar dataKey="purchases" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default OrderComparisonBarChart;
