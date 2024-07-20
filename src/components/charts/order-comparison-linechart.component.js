import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const OrderComparisonLineChart = () => {
    const [statistics, setStatistics] = useState([]);

    useEffect(() => {
        const fetchStatistics = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/dash/fetchOrdersTotalPriceData'); // Ajustez le point de terminaison si nécessaire
                const data = response.data;

                const mergedData = [];

                const dates = [...new Set([...data.processing.map(item => item.date), ...data.shipped.map(item => item.date), ...data.delivered.map(item => item.date)])];

                dates.forEach(date => {
                    const processingData = data.processing.find(item => item.date === date) || { total: 0 };
                    const shippedData = data.shipped.find(item => item.date === date) || { total: 0 };
                    const deliveredData = data.delivered.find(item => item.date === date) || { total: 0 };

                    mergedData.push({
                        date,
                        processing: processingData.total,
                        shipped: shippedData.total,
                        delivered: deliveredData.total
                    });
                });

                setStatistics(mergedData);
            } catch (error) {
                console.error('Error fetching order statistics:', error);
            }
        };

        fetchStatistics();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart
                data={statistics}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="processing" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="shipped" stroke="#82ca9d" />
                <Line type="monotone" dataKey="delivered" stroke="#ffc658" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default OrderComparisonLineChart;

