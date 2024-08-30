import "./App.css";
import PageHeader from "./components/PageHeader/PageHeader";
import GameWindow from "./components/GameWindow/GameWindow";
import HighScoreWindow from "./components/HighScoreWindow/HighScoreWindow";

function App() {
  return (
    <>
      <PageHeader />
      <GameWindow />
      <HighScoreWindow />
    </>
  );
}

export default App;
