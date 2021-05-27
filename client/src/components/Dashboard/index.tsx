import React, { useState, useEffect } from "react";
import { Link, Route, Switch } from "react-router-dom";
import "./Dashboard.scss";
import Characters from "./Characters";
import SingleCharacter from "./SingleCharacter";
import NotFound from "../NotFound";

interface characters {
  character_id: number;
  character_name: string;
  character_age?: number;
  character_gender?: string;
  character_birthday?: string;
  character_birthplace?: string;
  character_summary: string;
  character_image_url: string;
}

function Dashboard() {
  const [name, setName] = useState("");
  const [characters, setCharacters] = useState([] as characters[]);

  async function getName() {
    try {
      const response = await fetch("http://localhost:5000/dashboard/users", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setName(parseRes.data.user_name);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function getCharacters() {
    try {
      const response = await fetch("http://localhost:5000/characters", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      setCharacters(parseRes.data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getName();
    getCharacters();
  }, []);

  console.log("Characters: ", characters);

  return (
    <React.Fragment>
      <Link to="/dashboard/characters">Characters</Link>
      <Link to="/dashboard/characters/new">Add a new character</Link>
      <Switch>
        <Route exact path="/dashboard/characters">
          <Characters />
        </Route>
        <Route path="/dashboard/characters/:characterId">
          <SingleCharacter />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </React.Fragment>
  );
}

export default Dashboard;
