
import React from "react";
import { Link } from "react-router-dom";
import LoginForm from "@/components/LoginForm";

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-movie-dark to-black flex flex-col">
      <nav className="p-4">
        <Link to="/" className="text-white hover:text-movie-primary">
          Back to Home
        </Link>
      </nav>
      
      <div className="flex-grow flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Sign In to Movie Hub</h1>
        
        <div className="flex flex-col lg:flex-row gap-8 w-full max-w-4xl px-4">
          <div className="flex-1 flex justify-center">
            <LoginForm userType="user" title="User Login" />
          </div>
          
          <div className="flex-1 flex justify-center">
            <LoginForm userType="contentManager" title="Content Manager Login" />
          </div>
        </div>
        
        <div className="mt-8 text-center text-white/70">
          <p>Don't have an account? <Link to="/register" className="text-movie-primary hover:underline">Register now</Link></p>
        </div>
      </div>
      
      <footer className="p-4 text-center text-white/70 text-sm">
        © 2023 Movie Hub. All rights reserved.
      </footer>
    </div>
  );
};

export default LoginPage;
