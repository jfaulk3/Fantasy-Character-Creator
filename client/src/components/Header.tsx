import React from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

interface props {
  setAuth: (boolean: boolean) => void;
  isAuthenticated: boolean;
}

function Home({ isAuthenticated, setAuth }: props) {
  const history = useHistory();
  const logout = (event: any) => {
    event.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged-out Successfully");
  };

  const changePath = (path: string): void => {
    history.push(path);
  };

  return (
    <React.Fragment>
      <header>
        <h1 id="appTitle">Fantasy Character Creator</h1>
        <React.Fragment>
          <button
            className="userLog"
            onClick={() => {
              changePath("/");
            }}
          >
            Home
          </button>
          {!isAuthenticated ? (
            <React.Fragment>
              <button
                className="userLog"
                onClick={() => {
                  changePath("/login");
                }}
              >
                Login
              </button>
              <button
                className="userLog"
                onClick={() => {
                  changePath("/register");
                }}
              >
                Register
              </button>
            </React.Fragment>
          ) : (
            <button className="userLog" onClick={(e) => logout(e)}>
              Logout
            </button>
          )}
        </React.Fragment>

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
