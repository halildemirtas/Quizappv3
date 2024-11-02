import React from "react";
import Quiz from "./components/Quiz";
import { questions } from './assets/questions' 

const App = () => {
  return (
    <div className="App">
      <h1 className="app-h1" style={{ justifyContent: "center", display: "flex", margin: "4px" }}>React Quiz App</h1>
      <Quiz questions={questions} />
    </div>
  );
};

export default App;
