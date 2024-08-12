import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserInterface } from "../../interfaces/UserInterface";
import { User } from "./User";
import { store } from "../../globalData/store"; // Adjust the import path based on your project structure

export const UsersContainer: React.FC = () => {
  const [users, setUsers] = useState<UserInterface[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Ensure to check if user is logged in when the component mounts
    if (!store.loggedInUser || !store.loggedInUser.username) {
      navigate("/");
      return;
    }

    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    const response = await axios.get("http://localhost:8080/user");
    console.log(response.data);
    setUsers(response.data);
  };

  const handleReimbursementsClick = () => {
    if (store.loggedInUser && store.loggedInUser.username) {
      navigate("/reimbursements");
    } else {
      navigate("/");
    }
  };

  return (
    <div>
      <button onClick={handleReimbursementsClick}>See Your Reimbursements</button>
      <User users={users} refreshUsers={getAllUsers} />
    </div>
  );
};
