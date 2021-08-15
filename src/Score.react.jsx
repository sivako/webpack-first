import React from "react";

const Score = ({ goHome, questions }) => {
  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(1, 1fr)",
        gridTemplateRows: "repeat(1, 1fr)",
        gridGap: "10px",
      }}
    >
      <div
        style={{
          gridArea: "1/1/2/2",
          display: "grid",
          placeItems: "center",
          fontSize: "1.5rem",
          borderRadius: "1rem",
        }}
      >
        <span
          style={{
            borderRadius: "0.2rem",
            background: "lightblue",
            fontSize: "1rem",
            padding: "0.2rem",
            marginLeft: "1rem",
            color: "black",
          }}
          onClick={() => goHome()}
        >
          Go Home
        </span>
        <div>{`Your score: ${
          questions.filter(
            ({ ans_options, selected, answer }) =>
              ans_options[selected] === answer
          ).length
        } / 10 `}</div>
        {questions.map(({ ans_options, url, selected, answer }, i) => (
          <div key={url} style={{ marginTop: "2rem" }}>
            <img src={url} />
            <div> {`Question: ${i + 1}`} </div>
            <div>
              {`Your Answer: ${ans_options[selected]}`}
              <span
                style={
                  ans_options[selected] === answer
                    ? { color: "green" }
                    : { color: "red" }
                }
              >
                {ans_options[selected] === answer ? (
                  <>&#10004;</>
                ) : (
                  <>&#10008;</>
                )}
              </span>
            </div>
            <div> {`Correct Answer: ${answer}`} </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Score;
