import React from "react";

const answer_option_style = {
  display: "grid",
  justifyContent: "center",
  alignItems: "center",
  background: "tomato",
  borderRadius: "1rem",
  fontSize: "4rem",
  cursor: "pointer",
};

const Layout = ({ index, url, questions, onNext, onSelectAnswer, goHome }) => {
  // if (!questions || questions.length === 0) {
  //   return <div> Loading questions... </div>;
  // }

  const [one = "", two = "", three = "", four = ""] =
    questions.length > 0 ? questions[index].ans_options : [];
  return (
    <div
      style={{
        height: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gridTemplateRows: "repeat(8, 1fr)",
        gridGap: "10px",
      }}
    >
      <div
        style={{
          gridArea: "1/1/2/2",
          display: "grid",
          justifyItems: "left",
          alignItems: "center",
          fontSize: "2rem",
        }}
      >
        <div style={{ color: "tomato" }}>
          {`Dog Breeds`}
          <span
            style={{
              borderRadius: "0.2rem",
              background: "lightblue",
              fontSize: "1rem",
              padding: "0.2rem",
              cursor: "pointer",
              marginLeft: "1rem",
              color: "black",
            }}
            onClick={() => goHome()}
          >
            Go Home
          </span>
        </div>
        {/*<button onClick={() => onNext()}>Next Question</button> */}
      </div>
      <div
        style={{
          gridArea: "1/2/2/3",
          display: "grid",
          placeItems: "center",
          fontSize: "2rem",
        }}
      >
        <div>{`Question: ${index + 1}/10`}</div>
      </div>
      <div
        style={{
          gridArea: "2/1/6/3",
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {url ? (
          <img
            style={{
              display: "block",
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
            }}
            src={url}
          />
        ) : (
          <div> Loading... </div>
        )}
      </div>
      <div
        style={{
          gridArea: "6/1/7/2",
          ...answer_option_style,
        }}
        onClick={() => onSelectAnswer(0)}
      >
        {one}
      </div>
      <div
        style={{
          gridArea: "6/2/7/3",
          ...answer_option_style,
        }}
        onClick={() => onSelectAnswer(1)}
      >
        {two}
      </div>
      <div
        style={{
          gridArea: "7/1/8/2",
          ...answer_option_style,
        }}
        onClick={() => onSelectAnswer(2)}
      >
        {three}
      </div>
      <div
        style={{
          gridArea: "7/2/8/3",
          ...answer_option_style,
        }}
        onClick={() => onSelectAnswer(3)}
      >
        {four}
      </div>
    </div>
  );
};

export default Layout;
