package com.revature.services;
import com.revature.DAOs.*;
import com.revature.models.*;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ReimbursementService {

    private ReimbursementDAO rDAO;
    private UserDAO uDAO;

    @Autowired
    public ReimbursementService(ReimbursementDAO rDAO, UserDAO uDAO) {
        this.rDAO = rDAO;
        this.uDAO = uDAO;
    }


    public Reimbursement addReimbursement(IncomingReimbursementDTO newReimbursement) throws IllegalArgumentException
    {
        if (newReimbursement == null)
        {
            throw new IllegalArgumentException("Reimbursement cannot be null");
        }

        Reimbursement r = new Reimbursement(0, newReimbursement.getDescription(), newReimbursement.getAmount(), newReimbursement.getStatus(), null);

        Optional<User> u = (uDAO.findById(newReimbursement.getUserId()));

        if(u.isPresent()){
            r.setUser(u.get()); //assign the User to the Car
            Reimbursement newr = rDAO.save(r); //save our Car to the DB
            return newr;
        } else {
            return null;
        }

    }

    public List<Reimbursement> getAllReimbursements(){
        return rDAO.findAll();

    }

    public void deleteReimbursementsById(int id)
    {
        Reimbursement r = rDAO.findById(id).get();

        r.getUser().getReimbursementList().remove(r);

        rDAO.deleteById(id);

    }

    public List<Reimbursement> getReimbursementsbyUserId(int userId) throws IllegalArgumentException
    {
        if (userId < 0)
        {
            throw new IllegalArgumentException("UserId cannot be negative");
        }
        return rDAO.findByUser_UserId(userId);

    }

    //This method lets us update a user's username
    public Reimbursement updateReimbursement(String status, int reimbId){

        //TODO: error handling, check for valid inputs

        //get the User by id (remember this returns an OPTIONAL!)
        Optional<Reimbursement> existingReimbursement = rDAO.findById(reimbId);

        //Remember, .isPresent() checks the optional to see if there's data or if it's null
        if(existingReimbursement.isPresent()) {

            //If the User is present, extract it so we can update it
            Reimbursement r = existingReimbursement.get();

            //update the existing username with the new username
            r.setStatus(status);

            //save it back to the DB thru the DAO, send back the updated User
            return rDAO.save(r);

            //NOTE: the .save() method is used for inserts AND updates
            //How does Spring know to insert vs update? It's based on whether the ID exists or not

        } else {
            //TODO: probably throw an exception
            return null;
        }

    }


}