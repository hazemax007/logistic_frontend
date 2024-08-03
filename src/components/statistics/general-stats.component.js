import React, { useEffect, useState } from 'react';
import statsService from '../../services/dashboard.service';

const DashboarddGeneralStats = () => {
    const [stats, setStats] = useState({
        ordersToday: 0,
        revenueToday: 0,
        quantityInHand: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const data = await statsService.getStats();
            setStats(data);
        };

        fetchStats();
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            <div>
                <h2>Orders Today: {stats.ordersToday}</h2>
                <h2>Revenue Today: ${stats.revenueToday.toFixed(2)}</h2>
                <h2>Quantity in Hand: {stats.quantityInHand}</h2>
            </div>
        </div>
    );
};

export default DashboarddGeneralStats;
