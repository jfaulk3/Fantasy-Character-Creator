import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <React.Fragment>
      <h1>Home</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </React.Fragment>
  );
}

export default Home;
