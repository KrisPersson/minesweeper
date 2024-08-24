import { useState } from "react";

import "./App.css";
import PageHeader from "./components/PageHeader/PageHeader";
import GameWindow from "./components/GameWindow/GameWindow";
import HighScoreWindow from "./components/HighScoreWindow/HighScoreWindow";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <PageHeader />
      <GameWindow />
      <HighScoreWindow />
    </>
  );
}

export default App;
