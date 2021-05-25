import React from "react";
import { Link } from "react-router-dom";

function Home() {
  //Photo by <a href="https://unsplash.com/@jplenio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Johannes Plenio</a> on <a href="https://unsplash.com/license?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">Unsplash</a>

  return (
    <React.Fragment>
      <header>
        <h1>Fantasy Character Creator</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </header>
      <footer>
        <div>
          Photo by{" "}
          <a href="https://unsplash.com/@jplenio?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Johannes Plenio
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/license?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </div>
      </footer>
    </React.Fragment>
  );
}

export default Home;
