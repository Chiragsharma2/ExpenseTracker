import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement,LineElement, BarElement,ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement,LineElement, BarElement,ArcElement, Title, Tooltip, Legend);

function ExpenseVisualization ({ expenses }){
    const [categoryData, setCategoryData] = useState({});
    const [timeData, setTimeData] = useState({});

    useEffect(() => {
        // Process expenses data to create categoryData and timeData
        const categories = {};
        const timeline = {};

        expenses.forEach(expense => {
            //Aggregate by category
            if(categories[expense.category]) {
                categories[expense.category] += expense.amount;
            } else {
                categories[expense.category] = expense.amount;
            }

            //aAggregate by month
            const date = new Date(expense.date);
            const monthYear = `${date.getMonth() + 1 }/${date.getFullYear()}`;
            if(timelne[monthYear]) {
                timeline[monthYear] += expense.amount;
            } else {
                timeline[monthYear] = expense.amount;
            }
        });
        
        setCategoryData({
            labels:Object.keys(categories),
            datasets: [{
                label: 'Expenses by Category',
                data: Obkect.values(categories),
                backgrounndColor: 'rgba(75, 192, 192, 0.6)',
            }]
        });

        setTimeData({
            labels: Object.keys(timeline),
            datasets: [{
                label: `Expenses over Time`,
                data: Object.values(timeline),
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
            }]
        });
    },[expenses])


    const options = {
        responive: true,
        plugins: {
            legend: {position: 'top'},
            title: {display: true, text: 'Expenses Analysis'},
        },
    };

    return (
        <div>
            <h2>Expense Dashboard</h2>
            <div style = {{ width: '50%', display: 'inline-block' }}>
                <Bar data{...categoryData} options={options} />
            </div>
            <div style = {{ width: '50%', display: 'inline-block' }}>
                <Line data{...timeData} options={options} />
            </div>
            <div style = {{ width: '50%', display: 'inline-block' }}>
                <Bar data{...categoryData} options={options} />
            </div>
        </div>
    )
}

export default ExpenseVisualization;