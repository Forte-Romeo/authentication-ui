import { useState } from "react";

import AuthLayout from "./components/AuthLayout";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";

import "./App.css";

function App() {
  const [authMode, setAuthMode] = useState("login");

  return (
    <AuthLayout>
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
    </AuthLayout>
  );
}

export default App;