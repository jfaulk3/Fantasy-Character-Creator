import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "../styles/LogReg.scss";

interface props {
  setAuth: (boolean: boolean) => void;
}

function Login({ setAuth }: props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = ({ target }: any) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const onSubmitForm = async (event: any) => {
    event.preventDefault();
    try {
      const body = { data: { email, password } };
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);

        toast.success("Logged-in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <React.Fragment>
      <div className="logReg-grid">
        <h2>Login</h2>
        <form onSubmit={onSubmitForm}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <button>Submit</button>
        </form>
        <div className="login-help">
          <p>
            Forgot your password? <Link to="#">Click here to reset it</Link>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Login;
