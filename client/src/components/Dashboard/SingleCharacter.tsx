import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import "./Dashboard.scss";

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
  const { characterId }: any = useParams();
  const [character, setCharacter] = useState({} as characters);
  const history = useHistory();

  async function deleteHandler() {
    try {
      if (
        window.confirm(
          "Are you sure you wish to delete this character? (Cannot be undone)"
        )
      ) {
        await fetch(`http://localhost:5000/characters/${characterId}`, {
          method: "DELETE",
          headers: { token: localStorage.token },
        });
        history.push("/dashboard");
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    async function getCharacter() {
      try {
        const response = await fetch(
          `http://localhost:5000/characters/${characterId}`,
          {
            method: "GET",
            headers: { token: localStorage.token },
          }
        );

        const parseRes = await response.json();

        setCharacter(parseRes.data);
      } catch (error) {
        console.error(error.message);
      }
    }
    getCharacter();
  }, [characterId]);

  return (
    <React.Fragment>
      <section className="card-list">
        <article key={character.character_id} className="card">
          <h3 className="card-header">{character.character_name}</h3>
          <p>{character.character_age}</p>
          <p>{character.character_gender}</p>
          <p>{character.character_birthday}</p>
          <p>{character.character_birthplace}</p>
          <p>{character.character_summary}</p>
          <button onClick={deleteHandler}>Delete Card</button>
        </article>
      </section>
    </React.Fragment>
  );
}

export default Characters;
