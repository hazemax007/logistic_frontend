import { useState, useEffect } from "react";
//import '../styles/dashboard.component.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend  } from 'recharts'
import axios from 'axios'

const OrderByPriceBarChart = () => {
    const [ordersData, setOrdersData] = useState([])

    useEffect(() => {
        const fetchDataOrdersByPrice = async () => {
            try {
                const response = await axios.get('http://localhost:8080/api/orders');
                console.log(response)
                const orders = response.data;

                const priceRanges = [
                    { range: '10-20', count: 0 },
                    { range: '20-30', count: 0 },
                    { range: '30-40', count: 0 },
                    { range: '40+', count: 0 },
                ];

                orders.forEach(order => {
                    if (order.value >= 10 && order.value < 20) {
                        priceRanges[0].count += 1;
                    } else if (order.value >= 20 && order.value < 30) {
                        priceRanges[1].count += 1;
                    } else if (order.value >= 30 && order.value < 40) {
                        priceRanges[2].count += 1;
                    } else if (order.value >= 40) {
                        priceRanges[3].count += 1;
                    }
                });

                setOrdersData(priceRanges);
            } catch (error) {
                console.error('Error fetching the orders data', error);
            }
        };

        
        fetchDataOrdersByPrice();
       
    }, []);

    return(
        <div>
            <BarChart width={600} height={300} data={ordersData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36}/>
                <Bar dataKey="count" name="nombre de commandes par prix" fill="#8884d8" />
            </BarChart>
        </div>
    )
}

export default OrderByPriceBarChart;