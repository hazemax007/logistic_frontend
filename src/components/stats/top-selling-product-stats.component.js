import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TopSellingProductsChart = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchTopSellingProducts = async () => {
            try {
                const response = await axios.get('/api/dashboard/top-selling-products');
                const formattedData = response.data.map(item => ({
                    name: item.product.name,
                    totalQuantity: item.totalQuantity,
                    imagePath: item.product.imagePath
                }));
                console.log('Formatted Data:', formattedData); // Debugging
                setData(formattedData);
            } catch (error) {
                console.error('Error fetching top selling products data', error);
            }
        };

        fetchTopSellingProducts();
    }, []);

    return (
        <div>
            <h2>Top Selling Products</h2>
            <ul>
                {data.map((product, index) => (
                    <li key={index}>
                        <img src={product.imagePath} alt={product.name} width="50" height="50" />
                        <span>{product.name}</span>
                        <span> - {product.totalQuantity} units sold</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TopSellingProductsChart;
