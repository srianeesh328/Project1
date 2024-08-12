import axios from "axios";
import { useEffect, useState } from "react";
import { Reimbursement } from "./Reimbursement";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import { useNavigate } from "react-router-dom";
import { store } from "../../globalData/store";

export const ReimbursementContainer: React.FC = () => {
    const [reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([]);
    const [filterPending, setFilterPending] = useState(false);
    const [newStatus, setNewStatus] = useState<string>("");
    const [selectedReimbursement, setSelectedReimbursement] = useState<ReimbursementInterface | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        getAllReimbursements();
    }, [filterPending]);

    const getAllReimbursements = async () => {
        try {
            const response = await axios.get("http://localhost:8080/reimbursements");
            const data = response.data;

            if (filterPending) {
                setReimbursements(data.filter((reimbursement: ReimbursementInterface) => reimbursement.status.toLowerCase() === "pending"));
            } else {
                setReimbursements(data);
            }
        } catch (error) {
            console.error("Error fetching reimbursements:", error);
        }
    };

    const togglePendingFilter = () => {
        setFilterPending(!filterPending);
    };
//{ status: newStatus }
    const updateStatus = async () => {
        if (newStatus && selectedReimbursement) {
            try {
                await axios.patch("http://localhost:8080/reimbursements/" + selectedReimbursement.reimb_id, newStatus , {
                    headers: { "Content-Type": "text/plain" }
                })
                setSelectedReimbursement(null);
                setNewStatus("");
                getAllReimbursements(); 
            } catch (error) {
                console.error("Error updating reimbursement status:", error);
            }
        }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewStatus(e.target.value);
    };

    const deleteReimbursement = async (reimb_id: number) => {
        try {
            await axios.delete(`http://localhost:8080/reimbursements/${reimb_id}`);
            getAllReimbursements(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting reimbursement:", error);
        }
    };

    return (
        <div className="collection-container">
            <div>
                <button onClick={() => navigate("/")}>Back to Login</button>
                <button onClick={() => navigate("/addreimbursement")}>Add New Reimbursement</button>
                <button>Profile</button>
                <button onClick={togglePendingFilter}>
                    {filterPending ? "Show All Reimbursements" : "Show Pending Reimbursements"}
                </button>
            </div>

            <Reimbursement
                reimbursements={reimbursements}
                onUpdate={(reimbursement) => setSelectedReimbursement(reimbursement)}
                onDelete={deleteReimbursement}
            />

            {selectedReimbursement && (
                <div className="update-container">
                    <h3>Update Status for Reimbursement ID: {selectedReimbursement.reimb_id}</h3>
                    <input
                        type="text"
                        value={newStatus}
                        onChange={handleStatusChange}
                        placeholder="Enter new status"
                    />
                    <button onClick={updateStatus}>Submit</button>
                    <button onClick={() => setSelectedReimbursement(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
};
