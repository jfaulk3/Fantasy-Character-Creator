import React from "react";

interface props {
  setAuth: (boolean: boolean) => void;
}

function Login({ setAuth }: props) {
  return (
    <React.Fragment>
      <h1>Login</h1>
      <button onClick={() => setAuth(true)}>Authenticate</button>
    </React.Fragment>
  );
}

export default Login;
