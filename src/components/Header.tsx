import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film, Menu, Search, X, User } from "lucide-react";

interface HeaderProps {
  isLoggedIn?: boolean;
  userRole?: string;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isLoggedIn = false, 
  userRole = 'user',
  onLogout = () => {} 
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-black bg-opacity-90 backdrop-blur-sm text-white py-4 px-6 sticky top-0 z-50 shadow-md border-b border-gray-800">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Film className="h-6 w-6 text-yellow-500" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-600">
              Flick Critic
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-300 hover:text-yellow-400 transition-colors">
            Home
          </Link>
          <Link to="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
            New Releases
          </Link>
          <Link to="#" className="text-gray-300 hover:text-yellow-400 transition-colors">
            Top Rated
          </Link>
          
          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              {userRole === 'admin' && (
                <Link to="/manage-movies">
                  <Button variant="ghost" className="text-gray-300 hover:text-yellow-400 transition-colors">
                    Manage Movies
                  </Button>
                </Link>
              )}
              <Button 
                variant="ghost" 
                className="flex items-center gap-2" 
                onClick={onLogout}
              >
                <User className="h-4 w-4" />
                <span>Logout</span>
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="ghost" className="text-gray-300 hover:text-yellow-400">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button className="bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black">
                  Register
                </Button>
              </Link>
            </div>
          )}
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-2 border-t border-gray-800 mt-4">
          <nav className="flex flex-col space-y-4 px-4">
            <Link 
              to="/" 
              className="text-gray-300 hover:text-yellow-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="#" 
              className="text-gray-300 hover:text-yellow-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              New Releases
            </Link>
            <Link 
              to="#" 
              className="text-gray-300 hover:text-yellow-400 py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              Top Rated
            </Link>
            
            {isLoggedIn ? (
              <>
                {userRole === 'admin' && (
                  <Link 
                    to="/manage-movies" 
                    className="text-gray-300 hover:text-yellow-400 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Manage Movies
                  </Link>
                )}
                <button 
                  className="text-left text-gray-300 hover:text-yellow-400 py-2"
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col space-y-3 pt-2">
                <Link 
                  to="/login" 
                  className="text-gray-300 hover:text-yellow-400 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-black">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
