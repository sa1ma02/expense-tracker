import React, { Component } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import TransactionService from '../services/TransactionService';

// Register required components
Chart.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

class DashBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: [],
            totalIncome: 0,
            totalExpense: 0,
            balance: 0,
            chartData: {
                labels: [],
                datasets: [{
                    data: [],
                    backgroundColor: []
                }]
            },
            barChartData: {
                labels: [],
                datasets: [
                    {
                        label: 'Income',
                        data: [],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Expense',
                        data: [],
                        backgroundColor: 'rgba(255, 99, 132, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    }
                ]
            }
        };
    }

    componentDidMount() {
        const userId = localStorage.getItem("id"); // Retrieve user ID from local storage
        if (userId) {
            TransactionService.getTransactionsByUserId(userId).then((res) => {
                const transactions = res.data;
                this.setState({ transactions }, this.calculateTotals);
            });
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.transactions !== this.state.transactions) {
            this.calculateTotals();
        }
    }

    calculateTotals = () => {
        let totalIncome = 0;
        let totalExpense = 0;
        let categories = {};
        let monthlyData = {};

        this.state.transactions.forEach((transaction) => {
            const date = new Date(transaction.date);
            const monthYear = `${date.getMonth() + 1}-${date.getFullYear()}`;

            if (transaction.type === 'income') {
                totalIncome += transaction.amount;
                if (!monthlyData[monthYear]) {
                    monthlyData[monthYear] = { income: 0, expense: 0 };
                }
                monthlyData[monthYear].income += transaction.amount;
            } else if (transaction.type === 'expense') {
                totalExpense += transaction.amount;
                if (!monthlyData[monthYear]) {
                    monthlyData[monthYear] = { income: 0, expense: 0 };
                }
                monthlyData[monthYear].expense += transaction.amount;
            }

            if (!categories[transaction.category]) {
                categories[transaction.category] = 0;
            }
            categories[transaction.category] += transaction.amount;
        });

        const barChartData = this.getBarChartData(monthlyData);

        this.setState({
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            chartData: this.getChartData(categories),
            barChartData
        });
    };

    getChartData = (categories) => {
        const labels = Object.keys(categories);
        const data = Object.values(categories);

        return {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: labels.map(() => this.getRandomColor())
                }
            ]
        };
    };

    getBarChartData = (monthlyData) => {
        const labels = Object.keys(monthlyData);
        const incomeData = labels.map(label => monthlyData[label].income);
        const expenseData = labels.map(label => monthlyData[label].expense);

        return {
            labels,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Expense',
                    data: expenseData,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        };
    };

    getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    render() {
        return (
            <div>
                <h2 className="text-center">Transactions Dashboard</h2>
                
                <br />
                <div className="row">
                    <div className="col-sm-4">
                        <div className="card text-white bg-success mb-3">
                            <div className="card-header">Total Income</div>
                            <div className="card-body">
                                <h5 className="card-title">${this.state.totalIncome.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card text-white bg-danger mb-3">
                            <div className="card-header">Total Expense</div>
                            <div className="card-body">
                                <h5 className="card-title">${this.state.totalExpense.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="card text-white bg-info mb-3">
                            <div className="card-header">Balance</div>
                            <div className="card-body">
                                <h5 className="card-title">${this.state.balance.toFixed(2)}</h5>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Expenses and Incomes by Category</div>
                            <div className="card-body" style={{ height: '300px' }}>
                                <div style={{ height: '100%' }}>
                                    {this.state.chartData.labels.length > 0 && (
                                        <Pie data={this.state.chartData} options={{ maintainAspectRatio: false }} />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Monthly Income and Expenses</div>
                            <div className="card-body" style={{ height: '300px' }}>
                                <Bar data={this.state.barChartData} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>
                </div>
                <br />
            </div>
        );
    }
}

export default DashBoardComponent;
