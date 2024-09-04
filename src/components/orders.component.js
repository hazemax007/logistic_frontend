import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Visibility as VisibilityIcon
} from "@mui/icons-material";
import OrderDetails from "./order-details.component";
import OrderAdd from "./order-add.component";
import OrderEdit from "./order-edit.component";
import OrderStatusUpdate from "./order-status-edit.component";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusUpdateModalOpen, setIsStatusUpdateModalOpen] = useState(false);
  const ordersPerPage = 10;

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/orders");
      setOrders(response.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleAddOrder = (newOrder) => {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  };

  const handleUpdateOrder = (updatedOrder) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:8080/api/orders/${orderId}`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const viewDetails = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const editOrder = (order) => {
    setSelectedOrder(order);
    setIsEditModalOpen(true);
  };

  const updateStatusOrder = (order) => {
    setSelectedOrder(order);
    setIsStatusUpdateModalOpen(true);
  };

  const handleReloadOrders = () => {
    fetchOrders();
  }

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "numeric", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Overall Orders
        </Typography>
        <Divider />
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <OrderAdd onAdd={handleAddOrder} />
        </Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Order ID</TableCell>
                <TableCell>Order Value</TableCell>
                <TableCell>Delivery Location</TableCell>
                <TableCell>Expected Delivery</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {currentOrders.map((order, index) => (
                <TableRow key={index}>
                  <TableCell>{order.ref}</TableCell>
                  <TableCell>{(order.value).toFixed(2)} DT</TableCell>
                  <TableCell>{order.deliveryLocation}</TableCell>
                  <TableCell>{formatDate(order.deliveryDate)}</TableCell>
                  <TableCell className={`status ${order.status}`}>
                    {order.status}
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => viewDetails(order)} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => updateStatusOrder(order)} color="primary">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDeleteOrder(order.id)} color="secondary">
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box display="flex" justifyContent="space-between" alignItems="center" my={2}>
          <Button variant="outlined" onClick={handlePreviousPage} disabled={currentPage === 1}>
            Previous
          </Button>
          <Typography>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button variant="outlined" onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next
          </Button>
        </Box>
      </Box>

      <OrderDetails
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        order={selectedOrder}
      />

      <OrderEdit
        open={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        order={selectedOrder}
        onUpdate={handleUpdateOrder}
      />

      <OrderStatusUpdate
        open={isStatusUpdateModalOpen}
        onClose={() => setIsStatusUpdateModalOpen(false)}
        order={selectedOrder}
        onUpdate={handleUpdateOrder}
        onReload={handleReloadOrders}
      />
    </Container>
  );
};

export default Orders;
