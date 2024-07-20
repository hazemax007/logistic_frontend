import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import axios from 'axios';

const LabelByWeightPieChart = () => {
  const [monthlyData, setMonthlyData] = useState([]);
  //const [purchasesFeedbackData, setPurchasesFeedbackData] = useState([]);
  const [labelsWeightRangeData, setLabelsWeightRangeData] = useState([]);

  useEffect(() => {
    /*const fetchMonthlyData = async () => {
      try {
        const response = await axios.get('/api/dashboard/monthly-labels-purchases');
        const { labelsPerMonth, purchasesPerMonth } = response.data;

        const combinedData = labelsPerMonth.map((label, index) => {
          const purchase = purchasesPerMonth[index];
          return {
            month: label.month,
            labels: label.count,
            purchases: purchase ? purchase.count : 0
          };
        });

        setMonthlyData(combinedData);
      } catch (error) {
        console.error('Error fetching monthly labels and purchases data', error);
      }
    };*/

    /*const fetchPurchasesFeedbackData = async () => {
      try {
        const response = await axios.get('/api/dashboard/purchases-feedback');
        setPurchasesFeedbackData(response.data);
      } catch (error) {
        console.error('Error fetching purchases feedback data', error);
      }
    };*/

    const fetchLabelsWeightRangeData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/dash/labels-weight-range');
        const formattedData = response.data.map(item => ({
          name: item.weightRange,
          count: Number(item.count) // Ensure count is a number
        }));
        console.log('Formatted Data:', formattedData); // Debugging
        setLabelsWeightRangeData(formattedData);
      } catch (error) {
        console.error('Error fetching labels weight range data', error);
      }
    };

    //fetchMonthlyData();
    //fetchPurchasesFeedbackData();
    fetchLabelsWeightRangeData();
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF4444'];

  return (
    <div>

      <h2>Labels by Weight Range</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={labelsWeightRangeData}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#82ca9d"
            label
          >
            {labelsWeightRangeData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LabelByWeightPieChart;
