import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register: React.FC = () => {
    // Initialize user state with default role "user"
    const [user, setUser] = useState({
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        role: "user", // Default role,
        managerId: ""
    });

    const navigate = useNavigate();

    // Function to store input values
    const storeValues = (input: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = input.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value
        }));
    };

    // Function to send a POST request to register a user
    const register = async () => {
        if (!user.username || !user.password) {
            alert("Username and password are required!");
            return;
        }

        try {
            const response = await axios.post("http://localhost:8080/user", user);
            console.log(response.data);
            alert(response.data.username + " was created!");
            navigate("/"); // Send the user back to login after successful registration
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                // Handle Axios errors
                alert("Register failed! Error message: " + (error.response?.data.message || error.message));
            } else {
                // Handle non-Axios errors
                alert("Register failed! Error message: " + (error as Error).message);
            }
        }
    };

    return (
        <div>
            <div className="text-container">
                <h3>Register for a new account here!</h3>

                <div className="input-container">
                    <input
                        type="text"
                        placeholder="username"
                        name="username"
                        onChange={storeValues}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="firstName"
                        name="firstName"
                        onChange={storeValues}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="lastName"
                        name="lastName"
                        onChange={storeValues}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="password"
                        placeholder="password"
                        name="password"
                        onChange={storeValues}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="role"
                        name="role"
                        value={user.role} // Set value to the role from the state
                        onChange={storeValues}
                    />
                </div>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Manager Id"
                        name="managerId"
                        onChange={storeValues}
                    />
                </div>
                <button className="login-button" onClick={register}>
                    Submit
                </button>
                <button className="login-button" onClick={() => navigate("/")}>
                    Back
                </button>
            </div>
        </div>
    );
};
