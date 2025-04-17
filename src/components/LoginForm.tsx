
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { users } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface LoginFormProps {
  userType: 'user' | 'contentManager';
  title: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ userType, title }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    // Simulate API delay
    setTimeout(() => {
      // Mock authentication logic
      const user = users.find(u => u.email === email && u.role === userType);
      
      if (user) {
        // Store user in localStorage
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        // Show success toast
        toast({
          title: "Login successful",
          description: `Welcome back, ${user.name}!`,
        });
        
        // Navigate to home page
        navigate('/');
      } else {
        setError("Invalid credentials or user type");
      }
      
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="p-6 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-white/20 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-6 text-center text-white">{title}</h2>
      
      {error && (
        <div className="bg-red-500/20 text-red-200 p-3 rounded-md mb-4 text-sm border border-red-500/30">
          {error}
        </div>
      )}
      
      <form onSubmit={handleLogin}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${userType}-email`} className="text-white">Email</Label>
            <Input
              id={`${userType}-email`}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${userType}-password`} className="text-white">Password</Label>
            <Input
              id={`${userType}-password`}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-movie-primary hover:bg-movie-secondary"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
          
          <div className="flex justify-between text-sm pt-2">
            <button 
              type="button" 
              className="text-white/70 hover:text-white"
              onClick={() => navigate('/register')}
            >
              Register
            </button>
            <button 
              type="button" 
              className="text-white/70 hover:text-white"
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
