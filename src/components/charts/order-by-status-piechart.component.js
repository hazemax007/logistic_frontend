import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend  } from 'recharts';
import axios from 'axios'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const OrderByStatusPieChart = () => {
    const [ordersData,setOrdersData] = useState([])

    useEffect(() => {
        
        const fetchDataOrdersByStatus = async () => {
            try {
              const response = await axios.get('http://localhost:8080/api/orders'); // Adjust the endpoint as needed
              const orders = response.data;
              const statusCount = orders.reduce((acc, order) => {
                acc[order.status] = (acc[order.status] || 0) + 1;
                return acc;
              }, {});
      
              const processedData = Object.keys(statusCount).map(status => ({
                name: status,
                value: statusCount[status]
              }));
      
              setOrdersData(processedData);
            } catch (error) {
              console.error('Error fetching order data:', error);
            }
          };

          
        
        fetchDataOrdersByStatus()
        
    }, []);

    return (
        <div>
            <PieChart width={400} height={400}>
                <Pie
                    data={ordersData}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                >
                    {ordersData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    )
}

export default OrderByStatusPieChart;