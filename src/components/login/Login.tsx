import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginStart, loginSuccess, loginFailure } from "../slices/authSlice";
import { RootState } from "../store/store";
import "./Login.css";
import image1 from "../../assets/image-1.png";
import image2 from "../../assets/image-2.png";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim() || !password.trim()) {
      setValidationError("Username and password are required");
      return;
    }

    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters long");
      return;
    }

    dispatch(loginStart());

    try {
      setTimeout(() => {
        if (username === "test" && password === "password") {
          dispatch(loginSuccess({ username }));
        } else {
          dispatch(loginFailure("Invalid credentials"));
        }
      }, 1000);
    } catch (err) {
      dispatch(loginFailure("Login failed"));
    }
  };

  return (
    <div className="wrapper">
      <div className="inner">
        <img src={image1} alt="" className="image-1" />
        <form onSubmit={handleSubmit}>
          <h3>Login</h3>
          <div className="form-holder">
            <span className="lnr lnr-user"></span>
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-holder">
            <span className="lnr lnr-lock"></span>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {validationError && <p style={{ color: "red" }}>{validationError}</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">
            <span>{loading ? "Logging in..." : "Login"}</span>
          </button>
        </form>
        <img src={image2} alt="" className="image-2" />
      </div>
    </div>
  );
};

export default Login;
