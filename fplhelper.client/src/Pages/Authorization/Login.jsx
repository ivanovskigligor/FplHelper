import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberme, setRememberme] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "email") setEmail(value);
        if (name === "password") setPassword(value);
        if (name === "rememberme") setRememberme(e.target.checked);
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Please fill in all fields.");
        } else {
            setError("");

            let loginurl = rememberme ? "/login?useCookies=true" : "/login?useSessionCookies=true";

            axios.post(loginurl, {
                email: email,
                password: password,
            })
                .then((response) => {
                    if (response.status === 200) {
                        setError("Successful Login.");
                        window.location.href = '/';
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 400) {
                        setError("Error Logging In. Please check your credentials.");
                    } else {
                        setError("Error Logging in.");
                    }
                    console.error(error);
                });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-2xl font-bold mb-6 text-center">Login</h3>
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
                    <div className="mb-4 flex items-center">
                        <input
                            type="checkbox"
                            id="rememberme"
                            name="rememberme"
                            checked={rememberme}
                            onChange={handleChange}
                            className="mr-2"
                        />
                        <label htmlFor="rememberme" className="text-gray-700">Remember Me</label>
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">Login</button>
                    </div>
                    <div className="text-center">
                        <button type="button" onClick={handleRegisterClick} className="text-blue-500 hover:underline">Register</button>
                    </div>
                </form>
                {error && <p className="text-red-500 text-center mt-4">{error}</p>}
            </div>
        </div>

    );
}

export default Login;
