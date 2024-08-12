package com.revature.controllers;

import com.revature.models.*;
import com.revature.models.DTOs.IncomingReimbursementDTO;
import org.springframework.http.HttpStatus;
import com.revature.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reimbursements")
@CrossOrigin
public class ReimbursementController {

    private UserService us;
    private ReimbursementService rs;

    @Autowired
    public ReimbursementController(UserService us, ReimbursementService rs) {
        this.us = us;
        this.rs = rs;
    }

    @PostMapping
    public ResponseEntity<Object> addReimbursement(@RequestBody IncomingReimbursementDTO newrem) {
        Reimbursement r = rs.addReimbursement(newrem);

        if (r == null) {
            return ResponseEntity.status(400).body("Could find User with id" + newrem.getUserId());
        }

        return ResponseEntity.status(201).body(r);
    }

    @GetMapping
    public ResponseEntity<List<Reimbursement>> getAllReimbursements() {
        return ResponseEntity.ok(rs.getAllReimbursements());
    }


    @PatchMapping("/{reimbId}")
    public ResponseEntity<Object> updateStatus(@RequestBody String status, @PathVariable int reimbId){

        //using our rudimentary error handling thanks to Optional in the Service

        //if the Service returns null, we know the user wasn't found by ID
        Reimbursement updatedReimbursement = rs.updateReimbursement(status, reimbId);

        if(updatedReimbursement == null){
            return ResponseEntity.status(400).body("Reimbursement not found with ID: " + reimbId);
        } else {
            return ResponseEntity.ok(updatedReimbursement);
        }

    }

    @DeleteMapping("/{reimbursementid}")
    public ResponseEntity<Object> deleteReimbursementById(@PathVariable int reimbursementid) {
        try {
            rs.deleteReimbursementsById(reimbursementid);
            return ResponseEntity.ok("Reimbursement with ID: " + reimbursementid + " was deleted");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error deleting reimbursement with ID: " + reimbursementid + ". " + e.getMessage());
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<Reimbursement>> getReimbursementsByUserId(@PathVariable int userId) {
        return ResponseEntity.ok(rs.getReimbursementsbyUserId(userId));
    }
}
