import { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import { isValidEmail } from "../utils/validation";
import { apiRequest } from "../../server/src/utils/api.js";
import useAuth from "../context/useAuth.js";

function Login({ onSignup, onForgotPassword }) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!isValidEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    setLoading(true);

    try {
      const response = await apiRequest("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      login(response.data);

      setSuccess(response.message);

      setEmail("");
      setPassword("");
      setErrors({});
    } catch (error) {
      if (error.status === 401) {
        setErrors({
          form: error.message,
        });
      } else if (
        error.status === 400 &&
        error.data?.errors
      ) {
        const backendErrors = {};

        error.data.errors.forEach((validationError) => {
          backendErrors[validationError.field] =
            validationError.message;
        });

        setErrors(backendErrors);
      } else {
        setErrors({
          form:
            error.message ||
            "Unable to sign in. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
}

  return (
    <>
      <div className="auth-header">
        <h1>FORTE AUTH</h1>

        <h2>Welcome back</h2>

        <p>Sign in to continue to your account.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        <Input
          label="Email address"
          type="email"
          id="login-email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={errors.email}
        />

        <Input
          label="Password"
          type="password"
          id="login-password"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          showPassword={showPassword}
          onTogglePassword={() => setShowPassword(!showPassword)}
          error={errors.password}
        />

        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>

          <button
            type="button"
            className="text-button"
            onClick={onForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        {errors.form && (
          <span className="error-message">
            {errors.form}
          </span>
        )}

        <Button type="submit" loading={loading}>
          Sign In
        </Button>
      </form>

      {success && (
        <div className="success-message">
          {success}
        </div>
      )}

      <div className="auth-footer">
        <p>
          Don't have an account?{" "}
          <button
            type="button"
            className="text-button"
            onClick={onSignup}
          >
            Sign up
          </button>
        </p>
      </div>
    </>
  );
}

export default Login;