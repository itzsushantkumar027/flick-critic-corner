
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isLoggedIn?: boolean;
  userRole?: 'user' | 'contentManager';
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isLoggedIn = false, 
  userRole = 'user',
  onLogout = () => {} 
}) => {
  return (
    <header className="bg-black text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
            <path d="m2 2 20 20"></path>
            <path d="M12 12v-2"></path>
            <path d="M12 12h-2"></path>
            <path d="M12 12v2"></path>
            <path d="M12 12h2"></path>
            <path d="m19 5-7 7"></path>
            <path d="M12 12 5 19"></path>
            <path d="M5 5v14"></path>
            <path d="M5 5h14"></path>
            <path d="M19 5v14"></path>
            <path d="M5 19h14"></path>
          </svg>
          <Link to="/" className="text-xl font-bold">
            Movie Hub
          </Link>
        </div>

        <nav>
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {userRole === 'contentManager' && (
                <Link to="/manage-movies">
                  <Button variant="ghost" className="text-white hover:text-movie-primary">
                    Manage Movies
                  </Button>
                </Link>
              )}
              <Button variant="ghost" className="text-white hover:text-movie-primary" onClick={onLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login">
                <Button variant="ghost" className="text-white hover:text-movie-primary">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
