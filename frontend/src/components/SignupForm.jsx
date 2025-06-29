import { useState } from "react";
import axios from "axios";

function SignupForm({ onSignup, onSwitchToLogin }) {
    const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
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

        if (!formData.username || !formData.password || !formData.confirmPassword) {
            setStatus("Please fill in all fields");
            setIsLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setStatus("Passwords do not match");
            setIsLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setStatus("Password must be at least 6 characters");
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post("/api/auth/register", {
                username: formData.username,
                password: formData.password
            });
            setStatus("Account created successfully!");
            onSignup(response.data.username);
        } catch (error) {
            setStatus(error.response?.data?.error || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-md mx-auto p-8 bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10"
        >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Create Account</h2>
            
            <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                    <label htmlFor="username" className="text-sm font-medium text-white mb-3">
                        Username
                    </label>
                    <input
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Choose a username"
                        required
                        className="h-12 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="password" className="text-sm font-medium text-white mb-3">
                        Password
                    </label>
                    <input
                        name="password"
                        id="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Choose a password (min 6 chars)"
                        required
                        className="h-12 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
                
                <div className="flex flex-col">
                    <label htmlFor="confirmPassword" className="text-sm font-medium text-white mb-3">
                        Confirm Password
                    </label>
                    <input
                        name="confirmPassword"
                        id="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm your password"
                        required
                        className="h-12 rounded-xl border border-white/20 bg-white/5 backdrop-blur-sm text-white px-4 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 transition-all duration-200 placeholder-gray-400"
                    />
                </div>
                
                <button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 bg-gradient-to-r from-blue-500 to-emerald-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400/50 disabled:opacity-50 disabled:hover:scale-100 transition-all duration-200"
                >
                    {isLoading ? "Creating account..." : "Create Account"}
                </button>
                
                {status && (
                    <div className={`text-sm text-center p-3 rounded-lg ${
                        status.includes('successfully') 
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                            : 'bg-red-500/20 text-red-400 border border-red-500/30'
                    }`}>
                        {status}
                    </div>
                )}
                
                <div className="text-center mt-6">
                    <span className="text-gray-400">Already have an account? </span>
                    <button
                        type="button"
                        onClick={onSwitchToLogin}
                        className="text-blue-400 hover:text-blue-300 underline font-medium transition-colors"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </form>
    );
}

export default SignupForm;