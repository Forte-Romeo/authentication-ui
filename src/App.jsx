import { useState } from "react";

import AuthLayout from "./components/AuthLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import AuthenticatedUser from "./components/AuthenticatedUser";

import useAuth from "./context/useAuth.js";

import "./App.css";

function App() {
  const [authMode, setAuthMode] = useState("login");

  const { isAuthenticated } = useAuth();

  return (
    <AuthLayout>
      {isAuthenticated ? (
        <AuthenticatedUser />
      ) : (
        <>
          {authMode === "login" && (
            <Login
              onSignup={() => setAuthMode("signup")}
              onForgotPassword={() => setAuthMode("forgot")}
            />
          )}

          {authMode === "signup" && (
            <Signup
              onLogin={() => setAuthMode("login")}
            />
          )}

          {authMode === "forgot" && (
            <ForgotPassword
              onLogin={() => setAuthMode("login")}
            />
          )}
        </>
      )}
    </AuthLayout>
  );
}

export default App;