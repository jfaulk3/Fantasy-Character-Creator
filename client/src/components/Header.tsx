import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

interface props {
  setAuth: (boolean: boolean) => void;
}

function Home({ setAuth }: props) {
  //Photo by <a href="https://unsplash.com/@jplenio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Johannes Plenio</a> on <a href="https://unsplash.com/license?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>
  const logout = (event: any) => {
    event.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged-out Successfully");
  };

  return (
    <React.Fragment>
      <header>
        <h1>Fantasy Character Creator</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <button onClick={(e) => logout(e)}>Logout</button>

        <div className="image-credit">
          Background Photo by{" "}
          <a href="https://unsplash.com/@jplenio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Johannes Plenio
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/license?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </div>
      </header>
    </React.Fragment>
  );
}

export default Home;
