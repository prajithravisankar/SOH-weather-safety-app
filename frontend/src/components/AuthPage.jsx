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
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-4">
            <div className="mb-12 text-center">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent mb-4">
                    SafeGuard
                </h1>
                <p className="text-gray-400 text-xl max-w-md mx-auto leading-relaxed">
                    Track locations and stay safe during disasters. Keep your loved ones informed.
                </p>
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