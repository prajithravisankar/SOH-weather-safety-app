import { useState } from "react";
import axios from "axios";

function LoginForm({ onLogin, onSwitchToSignup }) {
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("");
        setIsLoading(true);

        if (!formData.username || !formData.password) {
            setStatus("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("/api/auth/login", formData);
            setStatus("Login successful!");
            await onLogin(response.data.username);
        } catch (error) {
            setStatus(error.response?.data?.error || "Login failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-[#242424] rounded-lg shadow border border-[#333]"
        >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Login</h2>
            
            <div className="flex flex-col gap-4">
                <div className="flex flex-col">
                    <label htmlFor="username" className="text-sm font-medium text-white mb-1">
                        Username
                    </label>
                    <input
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                        className="rounded-md border border-[#333] bg-[#1a1a1a] text-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-sm font-medium text-white mb-1">
                        Password
                    </label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        required
                        className="rounded-md border border-[#333] bg-[#1a1a1a] text-white px-3 py-2 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className="py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50"
                    style={{ backgroundColor: "#646cff" }}
                >
                    {isLoading ? "Logging in..." : "Login"}
                </button>
                
                {status && (
                    <div className={`text-sm mt-2 text-center ${status.includes('successful') ? 'text-green-400' : 'text-red-400'}`}>
                        {status}
                    </div>
                )}
                
                <div className="text-center mt-4">
                    <span className="text-gray-400">Don't have an account? </span>
                    <button
                        type="button"
                        onClick={onSwitchToSignup}
                        className="text-indigo-400 hover:text-indigo-300 underline"
                    >
                        Sign up
                    </button>
                </div>
            </div>
        </form>
    );
}

export default LoginForm;