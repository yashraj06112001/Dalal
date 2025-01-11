import React, { useState } from "react";
import Login from "@src/components/login";
import SignUp from "@src/components/signup";
const Homepage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 flex justify-between items-center px-6 py-4 bg-gray-800 shadow-lg z-50">
        <h1 className="text-2xl font-bold">Dalal</h1>
        <nav className="space-x-4">
          <button
            className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700"
            onClick={() => {
              setShowLogin(true);
            }}
          >
            Login
          </button>
          <button
            className="px-4 py-2 border border-gray-600 rounded-md hover:bg-gray-700"
            onClick={() => {
              setShowSignUp(true);
            }}
          >
            Sign Up
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20 flex flex-col items-center text-center px-6 py-12 overflow-y-auto">
        <h2 className="text-4xl font-extrabold text-gray-100 mb-6">
          Welcome to <span className="text-blue-500">Dalal Real Estate</span>
        </h2>
        <p className="text-lg text-gray-300 mb-8">
          Your trusted partner in finding your dream home. Explore luxury
          villas, cozy apartments, and properties tailored to your needs.
        </p>
        <div className="bg-gray-100 text-gray-900 rounded-lg shadow-lg p-8 w-full max-w-4xl">
          <img
            src="REAL_ESTATE.webp"
            alt="Real Estate"
            className="rounded-md mb-6"
          />
          {}
          <p className="text-lg font-medium">
            Whether you're looking to buy, sell, or rent, Dalal Real Estate is
            here to make your journey smooth and hassle-free. Start exploring
            our listings today!
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-center py-4">
        <p>© 2025 Dalal Real Estate. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default Homepage;
