import style from "./StartScreen.css";

const StartScreen = ({ buttonStartGame }) => {
  return (
    <div className="start">
      <h1>Secret Word</h1>
      <h3>Clique no botão abaixo para começar a jogar!</h3>
      <button onClick={buttonStartGame}>Começar o jogo</button>
      <p className="info">Jogo feito por Fabricio Moreira</p>
      <p className="info">Atendendo a um projeto do curso de REACT da Udemy</p>
    </div>
  );
};

export default StartScreen;
