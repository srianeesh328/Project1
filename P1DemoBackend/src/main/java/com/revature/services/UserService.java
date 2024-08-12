package com.revature.services;
import com.revature.services.*;
import com.revature.DAOs.*;
import com.revature.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {


    private UserDAO userDAO;

    @Autowired
    public UserService(UserDAO userDAO) {
        this.userDAO = userDAO;
    }

    public User registerUser(User newuser)
    {
        User u = userDAO.save(newuser);
        return u;

    }

    public List<User> getAllUsers(){
        return userDAO.findAll();
    }


    public User getUserByUsername(String username) throws IllegalArgumentException{

        //TODO: error handling for user not found, username blank, etc.

        User answer = new User();
        try {
            answer = userDAO.findByUsername(username);
        }
        catch(IllegalArgumentException e)
        {
            throw new IllegalArgumentException("Username not found or blank");
        }
        return answer;


    }


    //This method lets us update a user's username
    public User updateUser(String newUsername, int userId) throws Exception{

        //TODO: error handling, check for valid inputs
        if (newUsername == null)
        {
            throw new IllegalArgumentException("Username cannot be null");
        }
        if (userId < 0)
        {
            throw new IllegalArgumentException("User Id cannot be negative");
        }

        //get the User by id (remember this returns an OPTIONAL!)
        Optional<User> existingUser = (userDAO.findById(userId));

        //Remember, .isPresent() checks the optional to see if there's data or if it's null
        if(existingUser.isPresent()) {

            //If the User is present, extract it so we can update it
            User u = existingUser.get();

            //update the existing username with the new username
            u.setUsername(newUsername);

            //save it back to the DB through the DAO, send back the updated User
            return userDAO.save(u);

            //NOTE: the .save() method is used for inserts AND updates
            //How does Spring know to insert vs update? It's based on whether the ID exists or not

        } else {
            //TODO: probably throw an exception
            return null;
        }

    }

    public boolean deleteUserById(int userId) {
        if (userDAO.existsById(userId)) {
            userDAO.deleteById(userId);
            return true;
        } else {
            return false;
        }
    }


}