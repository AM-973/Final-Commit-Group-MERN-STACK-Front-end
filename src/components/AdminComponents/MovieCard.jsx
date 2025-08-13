import React from "react";
import axios from "axios";

export default function MovieCard({ movie, token }) {
  const { imdbID, Poster, Title, Year } = movie;

  return (
    <div
      className="movie-card"
      onClick={() => window.location.href = `/movies/${imdbID}`}
      style={{ cursor: "pointer", border: "1px solid #ccc", padding: "10px" }}
    >
      {Poster && Poster !== "N/A" ? (
        <img
          src={Poster}
          alt={Title}
          style={{ width: "200px", height: "300px", objectFit: "cover" }}
        />
      ) : (
        <div
          style={{
            width: "200px",
            height: "300px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#eee",
            color: "#555",
            fontWeight: "bold",
            textAlign: "center",
            padding: "10px",
          }}
        >
          Poster not available
        </div>
      )}
      <h3>{Title}</h3>
      <p>{Year}</p>
    </div>
  );
}
    