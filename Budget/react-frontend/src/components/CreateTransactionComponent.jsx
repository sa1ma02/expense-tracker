import React, { Component } from 'react';
import TransactionService from '../services/TransactionService';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

class CreateTransactionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            title: '',
            type: '',
            amount: '',
            date: new Date(),
            category: '',
            categories: [
                { name: 'Salary', type: 'income' },
                { name: 'Investment', type: 'income' },
                { name: 'Part Time', type: 'income' },
                { name: 'Bonus', type: 'income' },
                { name: 'Purchase', type: 'expense' },
                { name: 'Food', type: 'expense' },
                { name: 'Entertainment', type: 'expense' },
                { name: 'Studies', type: 'expense' },
                { name: 'Beauty', type: 'expense' },
                { name: 'Transportation', type: 'expense' },
                { name: 'Electronic', type: 'expense' },
                { name: 'Travel', type: 'expense' },
                { name: 'Health', type: 'expense' },
                { name: 'Repair', type: 'expense' },
                { name: 'Gift', type: 'expense' },
                { name: 'Donation', type: 'expense' },
                { name: 'Other', type: 'expense' }
            ]
        }

        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeTypeHandler = this.changeTypeHandler.bind(this);
        this.changeAmountHandler = this.changeAmountHandler.bind(this);
        this.changeDateHandler = this.changeDateHandler.bind(this);
        this.changeCategoryHandler = this.changeCategoryHandler.bind(this);
        this.saveOrUpdateTransaction = this.saveOrUpdateTransaction.bind(this);
    }

    componentDidMount() {
        if (this.state.id !== '_add') {
            TransactionService.getTransactionById(this.state.id).then((res) => {
                let transaction = res.data;
                this.setState({
                    title: transaction.title,
                    type: transaction.type,
                    amount: transaction.amount,
                    category: transaction.category,
                    date: new Date(transaction.date)
                });
            });
        }
    }

    saveOrUpdateTransaction = (e) => {
        e.preventDefault();
        const userId = localStorage.getItem("id"); // Retrieve user ID from local storage
        let transaction = {
            title: this.state.title,
            type: this.state.type,
            amount: this.state.amount,
            date: this.state.date,
            category: this.state.category,
            user_id: userId // Ensure this matches the column name in your database
        };

        console.log('transaction => ' + JSON.stringify(transaction));

        if (this.state.id === '_add') {
            TransactionService.createTransaction(transaction, userId).then(res => {
                this.props.history.push('/transactions');
            });
        } else {
            TransactionService.updateTransaction(transaction, this.state.id).then(res => {
                this.props.history.push('/transactions');
            });
        }
    }

    changeTitleHandler = (event) => {
        this.setState({ title: event.target.value });
    }

    changeTypeHandler = (event) => {
        this.setState({ type: event.target.value });
    }

    changeAmountHandler = (event) => {
        this.setState({ amount: event.target.value });
    }

    changeDateHandler = (date) => {
        this.setState({ date: date });
    }

    changeCategoryHandler = (event) => {
        this.setState({ category: event.target.value });
    }

    cancel() {
        this.props.history.push('/transactions');
    }

    getTitle() {
        if (this.state.id === '_add') {
            return <h3 className="text-center">Add Transaction</h3>
        } else {
            return <h3 className="text-center">Update Transaction</h3>
        }
    }

    render() {
        const filteredCategories = this.state.categories.filter(category => category.type === this.state.type);
        return (
            <div>
                <br />
                <div className="container">
                    <div className="row">
                        <div className="card col-md-6 offset-md-3 offset-md-3">
                            { this.getTitle() }
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label> Title: </label>
                                        <input placeholder="title" name="title" className="form-control"
                                            value={this.state.title} onChange={this.changeTitleHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Type: </label>
                                        <select placeholder="type" name="type" className="form-control"
                                            value={this.state.type} onChange={this.changeTypeHandler}>
                                            <option value="" disabled>Select type</option>
                                            <option value="income">Income</option>
                                            <option value="expense">Expense</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label> Amount: </label>
                                        <input placeholder="Amount" name="amount" className="form-control"
                                            value={this.state.amount} onChange={this.changeAmountHandler} />
                                    </div>
                                    <div className="form-group">
                                        <label> Date: </label>
                                        <DatePicker
                                            selected={this.state.date}
                                            onChange={this.changeDateHandler}
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Category:</label>
                                        <select
                                            name="category"
                                            className="form-control"
                                            value={this.state.category}
                                            onChange={this.changeCategoryHandler}
                                        >
                                            <option value="" disabled>Select category</option>
                                            {filteredCategories.map(category => (
                                                <option key={category.name} value={category.name}>
                                                    {category.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button className="btn btn-success" onClick={this.saveOrUpdateTransaction}>Save</button>
                                    <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{ marginLeft: "10px" }}>Cancel</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateTransactionComponent;
