import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./Dashboard.scss";

interface props {
  setAuth: (boolean: boolean) => void;
}

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

function Dashboard({ setAuth }: props) {
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

  const logout = (event: any) => {
    event.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged-out Successfully");
  };

  useEffect(() => {
    getName();
    getCharacters();
  }, []);

  console.log("Characters: ", characters);

  return (
    <React.Fragment>
      <h1>Dashboard {name}</h1>
      <button onClick={(e) => logout(e)}>Logout</button>
      <section className="card-list">
        {characters.map((character) => {
          return (
            <article key={character.character_id} className="card">
              <h3 className="card-header">{character.character_name}</h3>
              <p>{character.character_age}</p>
              <p>{character.character_gender}</p>
              <p>{character.character_birthday}</p>
              <p>{character.character_birthplace}</p>
              <p>{character.character_summary}</p>
            </article>
          );
        })}
      </section>
    </React.Fragment>
  );
}

export default Dashboard;
