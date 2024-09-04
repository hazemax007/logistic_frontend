import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Box, Typography, Dialog, DialogActions, DialogContent, DialogTitle, Button, List, ListItem, ListItemText } from '@mui/material';    

const OrderStatusDistribution = () => {
    const [data, setData] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/dashboard/orderStatusDistribution');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching order status distribution:', error);
            }
        };
        
        fetchData();
    }, []);

    const handlePieClick = async (entry) => {
        setSelectedStatus(entry.name);
        try {
            const response = await axios.get(`http://localhost:8080/api/dashboard/getOrdersByStatus/${entry.name}`);
            setOrderDetails(response.data);
        } catch (error) {
            console.error('Error fetching order details:', error);
        }
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setOrderDetails([]); // Clear order details on close
    };

    const formattedData = data.map(status => ({
        name: status.status,
        value: parseInt(status.count, 10),
    }));

    return (
        <Box sx={{ width: '100%', padding: 2 }}>
            <Typography variant="h5" component="h2" gutterBottom textAlign="center">
                Order Status Distribution
            </Typography>
            <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                    <Pie
                        data={formattedData}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={150}
                        fill="#8884d8"
                        label
                        onClick={handlePieClick}
                    >
                        {formattedData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
            <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
                <DialogTitle>Order Details for {selectedStatus}</DialogTitle>
                <DialogContent>
                    <List>
                        {orderDetails.length ? (
                            orderDetails.map(order => (
                                <ListItem key={order.id}>
                                    <ListItemText 
                                        primary={`Order REF: ${order.ref}`}
                                        secondary={`Value: ${(order.value).toFixed(2)} DT, Delivery Location: ${order.deliveryLocation}, Delivery Date: ${new Date(order.deliveryDate).toLocaleDateString()}`}
                                    />
                                </ListItem>
                            ))
                        ) : (
                            <ListItem>
                                <ListItemText primary="No orders found." />
                            </ListItem>
                        )}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default OrderStatusDistribution;

