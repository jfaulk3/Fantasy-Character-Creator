import React from "react";
interface props {
  setAuth: (boolean: boolean) => void;
}

function Dashboard({ setAuth }: props) {
  return (
    <React.Fragment>
      <h1>Dashboard</h1>
      <button onClick={() => setAuth(false)}>Logout</button>
    </React.Fragment>
  );
}

export default Dashboard;
