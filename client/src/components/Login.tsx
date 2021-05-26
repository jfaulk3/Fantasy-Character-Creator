import React, { useState } from "react";
import { toast } from "react-toastify";

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
      <div className="user-info">
        <h2>Login</h2>
        <form onSubmit={onSubmitForm}>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            value={password}
            onChange={(e) => {
              onChange(e);
            }}
          />
          <button>Submit</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;
