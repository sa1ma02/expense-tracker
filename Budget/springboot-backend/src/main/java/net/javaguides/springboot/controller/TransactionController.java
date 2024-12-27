package net.javaguides.springboot.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import net.javaguides.springboot.exception.ResourceNotFoundException;
import net.javaguides.springboot.model.Transaction;
import net.javaguides.springboot.repository.TransactionRepository;
import net.javaguides.springboot.repository.UsersRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/v1/")
public class TransactionController {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private UsersRepository usersRepository;

    // get all transactions
    @GetMapping("/transactions")
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    // get transactions by user id
    @GetMapping("/users/{userId}/transactions")
    public List<Transaction> getTransactionsByUserId(@PathVariable Long userId) {
        return transactionRepository.findByUserId(userId);
    }

    // create transaction for a user
    @PostMapping("/users/{userId}/transactions")
    public Transaction createTransaction(@PathVariable Long userId, @RequestBody Transaction transaction) {
        return usersRepository.findById(userId).map(user -> {
            transaction.setUser(user);
            return transactionRepository.save(transaction);
        }).orElseThrow(() -> new ResourceNotFoundException("User not found with id " + userId));
    }

    // get transaction by id
    @GetMapping("/transactions/{id}")
    public ResponseEntity<Transaction> getTransactionById(@PathVariable Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not exist with id :" + id));
        return ResponseEntity.ok(transaction);
    }

    // update transaction
    @PutMapping("/transactions/{id}")
    public ResponseEntity<Transaction> updateTransaction(@PathVariable Long id, @RequestBody Transaction transactionDetails) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not exist with id :" + id));

        transaction.setTitle(transactionDetails.getTitle());
        transaction.setType(transactionDetails.getType());
        transaction.setAmount(transactionDetails.getAmount());
        transaction.setDate(transactionDetails.getDate());
        transaction.setCategory(transactionDetails.getCategory());

        Transaction updatedTransaction = transactionRepository.save(transaction);
        return ResponseEntity.ok(updatedTransaction);
    }

    // delete transaction
    @DeleteMapping("/transactions/{id}")
    public ResponseEntity<Map<String, Boolean>> deleteTransaction(@PathVariable Long id) {
        Transaction transaction = transactionRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Transaction not exist with id :" + id));

        transactionRepository.delete(transaction);
        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
