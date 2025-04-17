
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { users } from "@/data/mockData";

interface LoginFormProps {
  userType: 'user' | 'contentManager';
  title: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ userType, title }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    // Mock authentication logic
    const user = users.find(u => u.email === email && u.role === userType);
    
    if (user) {
      // In a real application, you would store the user in context/state management
      // For this demo, we'll just navigate to home
      localStorage.setItem('currentUser', JSON.stringify(user));
      navigate('/');
    } else {
      setError("Invalid credentials or user type");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-6 text-center">{title}</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${userType}-email`}>Email</Label>
            <Input
              id={`${userType}-email`}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${userType}-password`}>Password</Label>
            <Input
              id={`${userType}-password`}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <Button type="submit" className="w-full bg-movie-primary hover:bg-movie-secondary">
            Login
          </Button>
          
          <div className="flex justify-between text-sm pt-2">
            <button 
              type="button" 
              className="text-movie-secondary hover:text-movie-primary"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
            <button 
              type="button" 
              className="text-movie-secondary hover:text-movie-primary"
            >
              Forgot Password?
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
