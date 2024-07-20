import { useState, useEffect } from "react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';
import axios from 'axios';

const processOrderData = (orders) => {
    const data = orders.reduce((acc, order) => {
        const date = new Date(order.createdAt).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = { date, processing: 0, fulfilled: 0, shipped: 0, delivered: 0 };
        }
        if (order.status === 'processing') acc[date].processing += 1;
        if (order.status === 'fulfilled') acc[date].fulfilled += 1;
        if (order.status === 'shipped') acc[date].shipped += 1;
        if (order.status === 'delivered') acc[date].delivered += 1;
        return acc;
    }, {});

    return Object.values(data);
};

const OrderComparisonAreaChart = () => {
    const [ordersData, setOrdersData] = useState([]);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/orders'); // Ajustez le point de terminaison si nécessaire
                const orders = response.data;
                const processedData = processOrderData(orders);
                setOrdersData(processedData);
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        fetchOrders();
    }, []);

    return (
        <div>
            <ResponsiveContainer width="100%" height={400}>
                <AreaChart
                    data={ordersData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="processing" stackId="1" stroke="#8884d8" fill="#8884d8" />
                    <Area type="monotone" dataKey="fulfilled" stackId="1" stroke="#83a6ed" fill="#83a6ed" />
                    <Area type="monotone" dataKey="shipped" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
                    <Area type="monotone" dataKey="delivered" stackId="1" stroke="#ffc658" fill="#ffc658" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default OrderComparisonAreaChart;
