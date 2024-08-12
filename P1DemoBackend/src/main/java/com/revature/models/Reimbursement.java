package com.revature.models;
import jakarta.persistence.*;
import org.springframework.stereotype.Component;


@Entity
@Table(name = "reimbursement")
@Component //make this class a Bean

public class Reimbursement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int reimb_id;

    private String description;

    private double amount;

    private String status;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "userId")
    private User user;

    public Reimbursement(){}

    public Reimbursement(int reimb_id, String description, double amount, String status, User user) {
        this.reimb_id = reimb_id;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.user = user;
    }

    public int getReimb_id() {
        return reimb_id;
    }

    public void setReimb_id(int reimb_id) {
        this.reimb_id = reimb_id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}