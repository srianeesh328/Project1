import { useState } from "react";
import { FormControl, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { store } from "../../globalData/store";

export const AddReimbursement: React.FC = () => {
    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [status, setStatus] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async () => {
        // Construct the reimbursement object
        const newReimbursement = {
            userId: store.loggedInUser.userId, // Assuming userId is needed
            description,
            amount,
            status
        };

        try {
            // Send a POST request to save the new reimbursement
            await axios.post("http://localhost:8080/reimbursements", newReimbursement);
            // Redirect to the Reimbursement list after submission
            navigate("/reimbursements");
        } catch (error) {
            console.error("There was an error saving the reimbursement!", error);
        }
    };

    return (
        <div className="container">
            <h3>Enter New Reimbursement Info:</h3>
            
            <FormControl 
                type="text" 
                placeholder="Enter Description" 
                name="description" 
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            ></FormControl>
            <FormControl 
                type="text" 
                placeholder="Enter Amount" 
                name="amount" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
            ></FormControl>
            <FormControl 
                type="text" 
                placeholder="Enter Status" 
                name="status" 
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            ></FormControl>
            
            <Button onClick={handleSubmit}>Submit</Button>
        </div>
    );
};
