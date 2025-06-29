import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

function AuthPage({ onAuth }) {
    const [isLogin, setIsLogin] = useState(true);

    const handleAuth = (username) => {
        onAuth(username);
    };

    const switchToSignup = () => setIsLogin(false);
    const switchToLogin = () => setIsLogin(true);

    return (
        <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center p-4">
            <div className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-white mb-2">Weather Safety App</h1>
                <p className="text-gray-400">Track locations and stay safe during disasters</p>
            </div>
            
            {isLogin ? (
                <LoginForm onLogin={handleAuth} onSwitchToSignup={switchToSignup} />
            ) : (
                <SignupForm onSignup={handleAuth} onSwitchToLogin={switchToLogin} />
            )}
        </div>
    );
}

export default AuthPage;