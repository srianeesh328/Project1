package com.revature.models.DTOs;

//Here's another common DTO - send a user back to the front end without any:
// -sensitive data (password)
// -redundant data (List of Cars)
public class OutgoingUserDTO {

    private int userId;
    private String username;
    private String role;
    private int manager_id;

    //boilerplate--------------/

    public OutgoingUserDTO() {
    }

    public OutgoingUserDTO(int userId, String username, String role, int manager_id) {
        this.userId = userId;
        this.username = username;
        this.role = role;
        this.manager_id = manager_id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public int getManager_id() {
        return manager_id;
    }

    public void setManager_id(int manager_id) {
        this.manager_id = manager_id;
    }

    @Override
    public String toString() {
        return "OutgoingUserDTO{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", role='" + role + '\'' +
                ", manager_id=" + manager_id +
                '}';
    }
}