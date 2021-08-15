import React from "react";
import ReactDOM from "react-dom";
import BreedList from "./BreedList.react";

const App = () => (
  <div style={{ height: "100%" }}>
    <BreedList />
  </div>
);

function component() {
  const element = document.createElement("div");
  element.innerHTML = "Hello Webpack";
  return element;
}
// document.body.appendChild(component());

ReactDOM.render(<App />, document.getElementById("app"));
