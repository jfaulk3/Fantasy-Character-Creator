import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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

function Characters() {
  const [characters, setCharacters] = useState([] as characters[]);

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
    getCharacters();
  }, []);

  return (
    <React.Fragment>
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
              <Link to={`/dashboard/characters/${character.character_id}`}>
                View Card
              </Link>
            </article>
          );
        })}
      </section>
    </React.Fragment>
  );
}

export default Characters;
