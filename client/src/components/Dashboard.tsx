import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

interface props {
  setAuth: (boolean: boolean) => void;
}

function Dashboard({ setAuth }: props) {
  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.data.user_name);
    } catch (error) {
      console.error(error.message);
    }
  }

  const logout = (event: any) => {
    event.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged-out Successfully");
  };

  useEffect(() => {
    getName();
  }, []);

  return (
    <React.Fragment>
      <h1>Dashboard {name}</h1>
      <button onClick={(e) => logout(e)}>Logout</button>
    </React.Fragment>
  );
}

export default Dashboard;
