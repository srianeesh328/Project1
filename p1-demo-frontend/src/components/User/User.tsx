import { useEffect, useState } from "react";
import { UserInterface } from "../../interfaces/UserInterface";
import { Button, Table } from "react-bootstrap";
import axios from "axios";
import { store } from "../../globalData/store"; // Adjust the import path based on your project structure
import { useNavigate } from "react-router-dom";

export const User: React.FC<{ users: UserInterface[]; refreshUsers: () => void }> = ({ users, refreshUsers }) => {
  const [selectedUser, setSelectedUser] = useState<UserInterface>({
    userId: 0,
    username: "default_user",
    role: "",
    manager_id: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log(users);
  }, [users]);

  const deleteUser = async (userId: number) => {
    try {
      const response = await axios.delete(`http://localhost:8080/user/${userId}`);
      console.log(response.data);
      refreshUsers(); // Refresh the user list after deleting

      // Check if the deleted user is the currently logged-in user
      if (store.loggedInUser && store.loggedInUser.userId === userId) {
        // Clear the logged-in user state
        store.loggedInUser = null; // Assuming this is how you clear it. Adjust if needed.
        navigate("/"); // Redirect to login page
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container">
      <h3>Welcome Admin! All Users: </h3>
      <Table striped bordered hover variant="primary">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Options</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="outline-danger" onClick={() => deleteUser(user.userId)}>
                  Fire User
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};
