package models.DTOs;

public class IncomingReimbursementDTO {


    private int reimb_id;

    private String description;

    private double amount;

    private String status;

    private int userId;

    public IncomingReimbursementDTO(int reimb_id, String description, double amount, String status, int userId) {
        this.reimb_id = reimb_id;
        this.description = description;
        this.amount = amount;
        this.status = status;
        this.userId = userId;
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

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "IncomingReimbursementDTO{" +
                "reimb_id=" + reimb_id +
                ", description='" + description + '\'' +
                ", amount=" + amount +
                ", status='" + status + '\'' +
                ", userId=" + userId +
                '}';
    }
}