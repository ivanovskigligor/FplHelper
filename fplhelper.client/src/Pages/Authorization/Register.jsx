import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const [error, setError] = useState("");

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "confirmPassword") setConfirmPassword(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setError("Please enter a valid email address.");
        } else if (password !== confirmPassword) {
            setError("Passwords do not match.");
        } else {
            setError("");
            axios.post("/register", {
                email: email,
                password: password,
            })
                .then((response) => {
                    console.log(response);
                    if (response.status === 200) {
                        setError("Successful registration.");
                    }
                })
                .catch((error) => {

                    if (error.response && error.response.status === 400) {
                        const validationErrors = error.response.data.errors;
                        const errorMessages = Object.values(validationErrors)
                            .flat() 
                            .join(' '); 

                        setError(errorMessages);
                    } else {
                        setError("Error registering.");
                    }
                });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-center">Register</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700" htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600">Register</button>
                    </div>
                    <div className="text-center">
                        <button type="button" onClick={handleLoginClick} className="text-blue-500 hover:underline">Go to Login</button>
                    </div>
                </form>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>

    );
}

export default Register;
