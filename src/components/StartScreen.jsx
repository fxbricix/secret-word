import "./StartScreen.css";

const StartScreen = ({ buttonStartGame }) => {
  return (
    <div className="start">
      <h1>Secret Word</h1>
      <p>Clique no botão abaixo para começar a jogar!</p>
      <button onClick={buttonStartGame}>Começar o jogo</button>
    </div>
  );
};

export default StartScreen;
