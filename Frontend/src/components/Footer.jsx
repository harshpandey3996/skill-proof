import React, { useState, useEffect } from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

export default function Footer() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const loggedIn = !!currentUser;



  const handleGetVerified = () => {
    if (loggedIn) {
      navigate("/option");
    } else {
      navigate("/login");
    }
  };


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
    alert("You are logged out.");
    navigate("/");
    window.location.reload();
  };




  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="flex flex-col md:flex-row justify-between gap-8">

          <div>
            <h2 className="text-2xl font-bold text-green-400">
              SkillProof
            </h2>
          </div>

          <div className="flex gap-16">
            <div>
              <h3 className="text-white font-semibold mb-3">Platform</h3>
              <ul className="space-y-2 text-sm">

                <li>
                  <Link to="/" className="hover:text-green-400">Home</Link>
                </li>

                <li>
                  <button
                    onClick={handleGetVerified}
                    className="hover:text-green-400"
                  >
                    Get Verified
                  </button>
                </li>
                <li>
                  <Link to="/help-center" className="hover:text-green-400">
                        Help Center
                      </Link>
                </li>

                {loggedIn ? (
                  <li>
                    <button
                      onClick={handleLogout}
                      className="hover:text-red-400"
                    >
                      Logout
                    </button>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link to="/login" className="hover:text-green-400">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/sign" className="hover:text-green-400">
                        Sign Up
                      </Link>
                    </li>
                  </>
                )}

              </ul>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
