import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user && user !== "undefined") {
      setCurrentUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
    navigate("/");
    window.location.reload();
  };

  const loggedIn = !!currentUser;

  return (
    <header className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          <Link to="/" className="text-2xl font-bold text-green-400">
            SkillProof
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-4">
            {loggedIn ? (
              <>
                <span className="text-sm text-gray-300">
                  Welcome {currentUser.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="border border-red-400 px-4 py-2 rounded-full hover:bg-red-400 hover:text-black transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="border border-green-400 px-4 py-2 rounded-full hover:bg-green-400 hover:text-black transition">
                    Login
                  </button>
                </Link>
                <Link to="/sign">
                  <button className="border border-green-400 px-4 py-2 rounded-full hover:bg-green-400 hover:text-black transition">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* MOBILE ICON */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-black border-t border-gray-700 px-6 py-4 space-y-4">
          {loggedIn ? (
            <>
              <div className="text-sm text-gray-300">
                Welcome {currentUser.name}
              </div>
              <button
                onClick={handleLogout}
                className="w-full border border-red-400 py-2 rounded-full hover:bg-red-400 hover:text-black transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <button className="w-full border border-green-400 py-2 rounded-full hover:bg-green-400 hover:text-black transition">
                  Login
                </button>
              </Link>
              <Link to="/sign" onClick={() => setIsOpen(false)}>
                <button className="w-full border border-green-400 py-2 rounded-full hover:bg-green-400 hover:text-black transition">
                  Sign Up
                </button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
