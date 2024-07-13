import React, { useEffect, useState } from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Title, Tooltip, Legend);

  
function generateColor(category) {
    let hash = 0;
    for(let i=0;i<category.length; i++) {
        hash = category.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = `hsl(${hash % 360}, 70%, 70%)`;
    return color;
}


function ExpenseVisualization({ expenses }) {
    const [chartData, setChartData] = useState(null);

    useEffect(() => {
        console.log("Expenses received:", expenses);

        if (!expenses || expenses.length === 0 ) {
            setChartData(null);
            return;
        }

        const categories = {};
        const timeline = {};

        expenses.forEach(expense => {
            console.log("processing expense:", expense);

            if (!expense.category || !expense.amount || !expense.date) {
                console.log("Invalid expense data:", expense);
                return;
            }

            categories[expense.category] = (categories[expense.category] || 0) + expense.amount;

            const date = new Date(expense.date);
            const monthYear = `${date.getMonth() + 1}/${date.getFullYear()}`;
            timeline[monthYear] = (timeline[monthYear] || 0) + expense.amount;
        });

        console.log("Processed categories:", categories);
        console.log("Processed timeline:", timeline);

        const categoryLabels = Object.keys(categories);
        const categoryValues = Object.values(categories);
        const categoryBackgroundColors = categoryLabels.map(generateColor);

        setChartData({
            categoryData: {
                labels: categoryLabels,
                datasets: [{
                    label: 'Expenses by Category',
                    data: categoryValues,
                    backgroundColor: categoryBackgroundColors,
                }]
            },
            timeData: {
                labels: Object.keys(timeline),
                datasets: [{
                    label: `Expenses over Time`,
                    data: Object.values(timeline),
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        });
    }, [expenses]);

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Expenses Analysis' },
            Tooltip: {
                callbacks: {
                    label: function(context) {
                        let label = context.dataset.label || '';
                        if(label) {
                            label += ': ';
                        }
                        if(context.parsed.y !== null) {
                            label += new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(context.parsed.y);
                        }
                        return label;
                    }
                }
            }
        },
    };

    if (!expenses || expenses.length === 0) {
        return <div>No data to display</div>;
    }

    if (!chartData) {
        return <div>Processing expense data...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div  className="h-[300px]">
                <Bar data={chartData.categoryData} options={options} />
            </div>
            <div className="h-[300px]" >
                <Pie data={chartData.categoryData} options={options} />
            </div>
            <div className="col-span-full h-[400px] " >
                <Line data={chartData.timeData} options={options} />
            </div>
        </div>
    );
}

export default ExpenseVisualization;

