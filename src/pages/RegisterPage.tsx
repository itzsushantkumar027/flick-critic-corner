
import React from "react";
import { Link } from "react-router-dom";
import RegisterForm from "@/components/RegisterForm";

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-movie-dark to-black flex flex-col">
      <nav className="p-4">
        <Link to="/" className="text-white hover:text-movie-primary">
          Back to Home
        </Link>
      </nav>
      
      <div className="flex-grow flex flex-col items-center justify-center py-8">
        <h1 className="text-3xl font-bold text-white mb-8">Create Account</h1>
        
        <div className="w-full max-w-md px-4">
          <RegisterForm />
        </div>
      </div>
      
      <footer className="p-4 text-center text-white text-sm">
        © 2023 Movie Hub. All rights reserved.
      </footer>
    </div>
  );
};

export default RegisterPage;
