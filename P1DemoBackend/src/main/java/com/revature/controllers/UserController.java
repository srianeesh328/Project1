package com.revature.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.revature.services.UserService;
import com.revature.models.*;

import java.util.List;

@RestController //Makes this class a bean and turns HTTP Response data into JSON (@Controller, @ResponseBody)
@RequestMapping("/user") //All HTTP Requests ending in /users will go to this controller
@CrossOrigin
public class UserController {

    private UserService us;

    @Autowired
    public UserController(UserService us)
    {
        this.us = us;
    }



    @PostMapping //HTTP POST Requests ending in /users will hit this method
    public ResponseEntity<User> registerUser(@RequestBody User newUser){
        System.out.println("hi");
        try {

            User u = us.registerUser(newUser);
            return ResponseEntity.status(201).body(u); //send back 201 (Created) and the new User's data
        }

        catch (Exception e)
        {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);

        }


    }

    //A method that returns all Users in the DB
    @GetMapping //HTTP GET Requests ending in /users will hit this method
    public ResponseEntity<List<User>> getAllUsers() {

        //not much error handling needed, no variables, nothing crazy that can go wrong
        List<User> users = us.getAllUsers();

        return ResponseEntity.ok(users); //send back 200 (OK) and the Users

    }

    //A method that returns a User by their username
    @GetMapping("/{username}")
    public ResponseEntity<User> getUserByUsername(@PathVariable String username){
        //One-liner for now, might be able to polish this with error handling
        return ResponseEntity.ok(us.getUserByUsername(username));
    }

    //A Method that updates a User's username
    @PatchMapping("/{userId}")
    public ResponseEntity<Object> updateUsername(@RequestBody String username, @PathVariable int userId) throws Exception {

        //using our rudimentary error handling thanks to Optional in the Service

        //if the Service returns null, we know the user wasn't found by ID
        User updatedUser = us.updateUser(username, userId);

        if(updatedUser == null){
            return ResponseEntity.status(400).body("User not found with ID: " + userId);
        } else {
            return ResponseEntity.ok(updatedUser);
        }

    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
        boolean isRemoved = us.deleteUserById(id);
        if (!isRemoved) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}