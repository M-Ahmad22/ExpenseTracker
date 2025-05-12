import React, { useState } from "react";
import "./Home.css";
import Login from "../LogIn-SignUp/Login";
import SignUp from "../LogIn-SignUp/SignUp";
const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const handleSignupSuccess = () => {
    setShowLogin(true);
  };

  return (
    <div>
      <>
        <div className="MainCon">
          <div className="heroCon">
            <div className="textCon">
              {/* Tooba Masjid  */}
              <h1>Expense Tracker</h1>
            </div>
            <div className="formCon">
              {showLogin ? (
                <Login />
              ) : (
                <SignUp onSignupSuccess={handleSignupSuccess} />
              )}
              <p className="signupLoginLink">
                {showLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}{" "}
                <button
                  className="toggle-button "
                  onClick={() => setShowLogin(!showLogin)}
                >
                  {showLogin ? "Sign Up" : "Login"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;
