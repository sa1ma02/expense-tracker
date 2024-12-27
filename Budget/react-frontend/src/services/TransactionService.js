import axios from 'axios';

const TRANSACTION_API_BASE_URL = "http://localhost:8081/api/v1/transactions";

class TransactionService {

    getTransactions(){
        return axios.get(TRANSACTION_API_BASE_URL);
    }
    getTransactionsByUserId(userId) {
        return axios.get(`http://localhost:8081/api/v1/users/${userId}/utransactions`);
    }

    createTransaction(transaction, userId){
        return axios.post(`http://localhost:8081/api/v1/users/${userId}/transactions`, transaction);
    }

    getTransactionById(transactionId) {
        return axios.get(`${TRANSACTION_API_BASE_URL}/${transactionId}`);
    }

    updateTransaction(transaction, transactionId) {
        return axios.put(`${TRANSACTION_API_BASE_URL}/${transactionId}`, transaction);
    }

    deleteTransaction(transactionId) {
        return axios.delete(`${TRANSACTION_API_BASE_URL}/${transactionId}`);
    }
}

export default new TransactionService()