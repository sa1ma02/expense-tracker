import React, { Component } from 'react';
import TransactionService from '../services/TransactionService';
import '../App.css';

class ListTransactionComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            transactions: []
        };
        this.addTransaction = this.addTransaction.bind(this);
        this.editTransaction = this.editTransaction.bind(this);
        this.deleteTransaction = this.deleteTransaction.bind(this);
    }

    deleteTransaction(id) {
        TransactionService.deleteTransaction(id).then(res => {
            this.setState({ transactions: this.state.transactions.filter(transaction => transaction.id !== id) });
        });
    }

    viewTransaction(id) {
        this.props.history.push(`/view-transaction/${id}`);
    }

    editTransaction(id) {
        this.props.history.push(`/add-transaction/${id}`);
    }

    componentDidMount() {
        this.loadTransactions();
    }

    loadTransactions() {
        const userId = localStorage.getItem("id"); // Retrieve user ID from local storage
        if (userId) {
            TransactionService.getTransactionsByUserId(userId).then(res => {
                this.setState({ transactions: res.data });
            });
        }
    }

    addTransaction() {
        this.props.history.push('/add-transaction/_add');
    }

    render() {
        return (
            <div>
                <h2 className="text-center">Transactions List</h2>
                <div className="row">
                    <button className="btn btn-primary" onClick={this.addTransaction}>Add Transaction</button>
                </div>
                <br />
                <div className="row">
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Category</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.transactions.map(transaction => (
                                <tr key={transaction.id}>
                                    <td>{transaction.title}</td>
                                    <td>{transaction.type}</td>
                                    <td>
                                        {transaction.type === 'income' ? (
                                            <span style={{ color: 'green' }}>+{transaction.amount}</span>
                                        ) : (
                                            <span style={{ color: 'red' }}>-{transaction.amount}</span>
                                        )}
                                    </td>
                                    <td>{transaction.date}</td>
                                    <td>{transaction.category}</td>
                                    <td>
                                        <button onClick={() => this.editTransaction(transaction.id)} className="btn btn-info">Update</button>
                                        <button style={{ marginLeft: '10px' }} onClick={() => this.deleteTransaction(transaction.id)} className="btn btn-danger">Delete</button>
                                        <button style={{ marginLeft: '10px' }} onClick={() => this.viewTransaction(transaction.id)} className="btn btn-info">View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListTransactionComponent;
