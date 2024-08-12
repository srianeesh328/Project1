import { Button, Table } from "react-bootstrap";
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface";
import { useEffect } from "react";
import { store } from "../../globalData/store";

interface ReimbursementProps {
    reimbursements: ReimbursementInterface[];
    onUpdate: (reimbursement: ReimbursementInterface) => void;
    onDelete: (reimb_id: number) => void;
}

export const Reimbursement: React.FC<ReimbursementProps> = ({ reimbursements, onUpdate, onDelete }) => {

    useEffect(() => {
        console.log(reimbursements);
    }, [reimbursements]);

    return (
        <div className="container">
            <h3>{store.loggedInUser.username}'s Reimbursements:</h3>
            <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>UserId</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {reimbursements.map((reimbursement) => (
                        <tr key={reimbursement.reimb_id}>
                            <td>{reimbursement.reimb_id}</td>
                            <td>{reimbursement.description}</td>
                            <td>{reimbursement.amount}</td>
                            <td>{reimbursement.status}</td>
                            <td>{reimbursement.user.userId}</td>
                            <td>
                                <Button variant="outline-info" onClick={() => onUpdate(reimbursement)}>Update</Button>
                                <Button variant="outline-danger" onClick={() => onDelete(reimbursement.reimb_id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};
