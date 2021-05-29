import React, { useState } from "react";
import { toast } from "react-toastify";

interface props {
  setAuth: (boolean: boolean) => void;
}

function Register({ setAuth }: props) {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = ({ target }: any) => {
    setInputs({ ...inputs, [target.name]: target.value });
  };

  const onSubmitForm = async (event: any) => {
    event.preventDefault();

    try {
      const body = {
        data: {
          email,
          password,
          name,
        },
      };

      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        toast.success("Registered Successfully");
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
        <h2>Register</h2>
        <form onSubmit={onSubmitForm}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => onChange(e)}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => onChange(e)}
          />
          <input
            type="text"
            name="name"
            placeholder="Username"
            value={name}
            onChange={(e) => onChange(e)}
          />
          <button>Submit</button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Register;
