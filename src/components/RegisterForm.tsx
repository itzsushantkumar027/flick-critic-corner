
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"user" | "contentManager">("user");
  const [error, setError] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Simple validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // In a real app, you would register the user in your backend
    // For this demo, we'll just show success and navigate
    alert(`Successfully registered as ${userType}`);
    navigate('/login');
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-xl font-semibold mb-6 text-center">Create Account</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-md mb-4 text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleRegister}>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Account Type</Label>
            <RadioGroup defaultValue="user" value={userType} onValueChange={(value) => setUserType(value as 'user' | 'contentManager')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="user" id="user" />
                <Label htmlFor="user">Regular User</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="contentManager" id="contentManager" />
                <Label htmlFor="contentManager">Content Manager</Label>
              </div>
            </RadioGroup>
          </div>
          
          <Button type="submit" className="w-full bg-movie-primary hover:bg-movie-secondary">
            Register
          </Button>
          
          <p className="text-sm text-center">
            Already have an account?{" "}
            <button 
              type="button" 
              className="text-movie-secondary hover:text-movie-primary"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
