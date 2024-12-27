import React, { Component } from 'react'
import TransactionService from '../services/TransactionService'

class ViewTransactionComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: this.props.match.params.id,
            transaction: {}
        }
    }

    componentDidMount(){
        TransactionService.getTransactionById(this.state.id).then( res => {
            this.setState({transaction: res.data});
        })
    }

    render() {
        return (
            <div>
                <br></br>
                <div className = "card col-md-6 offset-md-3">
                    <h3 className = "text-center"> View Transaction Details</h3>
                    <div className = "card-body">
                        <div className = "row">
                            <label> Title: </label>
                            <div> { this.state.transaction.title }</div>
                        </div>
                        <div className = "row">
                            <label> Type: </label>
                            <div> { this.state.transaction.type }</div>
                        </div>
                        <div className = "row">
                            <label> Amount: </label>
                            <div> { this.state.transaction.amount }</div>
                        </div>
                        <div className = "row">
                            <label> Date: </label>
                            <div> { this.state.transaction.date }</div>
                        </div>
                        <div className = "row">
                            <label> Category: </label>
                            <div> { this.state.transaction.category }</div>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default ViewTransactionComponent
