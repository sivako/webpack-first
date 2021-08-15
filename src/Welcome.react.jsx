import React from "react";

const Welcome = ({ startNewQuiz }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gridTemplateRows: "repeat(8, 1fr)",
        gridGap: "10px",
      }}
    >
      <div
        style={{
          gridArea: "2/1/5/2",
          display: "grid",
          placeItems: "center",
          fontSize: "2rem",
          borderRadius: "1rem",
        }}
      >
        Love Dogs? How well you know about Dog Breeds?
      </div>
      <div
        style={{
          gridArea: "7/1/8/2",
          display: "grid",
          placeItems: "center",
          fontSize: "4rem",
          borderRadius: "1rem",
          background: "tomato",
          cursor: "pointer",
        }}
        onClick={() => startNewQuiz()}
      >
        New Quiz
      </div>
    </div>
  );
};

export default Welcome;
