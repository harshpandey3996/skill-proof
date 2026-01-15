import React from "react";
import { Link } from "react-router-dom";
import { Github, Linkedin, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-gray-800 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-green-400">
              SkillProof
            </h2>
            <p className="mt-3 text-sm max-w-sm">
              Prove your real skills with practical challenges and
              showcase your proof to the world.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            <div>
              <h3 className="text-white font-semibold mb-3">Platform</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="/" className="hover:text-green-400">Home</Link></li>
                <li><Link to="/option" className="hover:text-green-400">Get Verified</Link></li>
                <li><Link to="/login" className="hover:text-green-400">Login</Link></li>
                <li><Link to="/sign" className="hover:text-green-400">Sign Up</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-3">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><Link to="#" className="hover:text-green-400">Help Center</Link></li>
                <li><Link to="#" className="hover:text-green-400">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-green-400">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} SkillProof. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            <a href="https://github.com/login" className="hover:text-green-400">
              <Github size={20} />
            </a>
            <a href="https://www.linkedin.com" className="hover:text-green-400">
              <Linkedin size={20} />
            </a>
            <a href="https://x.com/?lang=en-in" className="hover:text-green-400">
              <Twitter size={20} />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
