import logo from './logo.svg';
import './App.css';
import Scoreboard from './ScoreBoard';
import { useEffect, useState, useRef } from 'react';
import Slider from './Slider';

function App() {

  const [style, setStyle] = useState('Aggressive');
  const [isShot, setIsShot] = useState(1);
  const [image, setImage] = useState('./images/straight.png');
  ;
  const ballRef = useRef(null);
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [balls, setBalls] = useState(0);
  const isBowled = useRef(0);
  const isGameOver = useRef(0);
  const [gameOver, setGameOver] = useState(false);

  const aggresiveStyle = {
    wickets: [0.00, 0.40],
    runs0: [0.41, 0.45],
    runs1: [0.46, 0.55],
    runs2: [0.56, 0.65],
    runs3: [0.66, 0.70],
    runs4: [0.71, 0.80],
    runs6: [0.81, 1.00]
  }

  const defensiveStyle = {
    wickets: [0.00, 0.20],
    runs0: [0.21, 0.50],
    runs1: [0.51, 0.70],
    runs2: [0.71, 0.80],
    runs3: [0.81, 0.90],
    runs4: [0.91, 1.00],
    runs6: [0.00, 0.00]
  }
  const restartGame = () => {
    setRuns(0);
    setWickets(0);
    setBalls(0);
    setGameOver(false);
    setIsShot(1);
    setImage('./images/straight.png');
    isBowled.current = 0;
  };

  function handleShot(side) {

    // 1. Stop the Slider and change the image to the shot
    setIsShot(0);
    ballRef.current.classList.add("ballAnimate");

    setTimeout(() => {
      if (!isBowled.current) {
        if (side === 'Left') {
          setImage('./images/leg.png');
          if (style === 'Aggressive')
            ballRef.current.classList.add('leftAggShot');
          else
            ballRef.current.classList.add('leftDefShot');
        } else {
          setImage('./images/off.png');
          if (style === 'Aggressive')
            ballRef.current.classList.add('rightAggShot');
          else
            ballRef.current.classList.add('rightDefShot');
        }
      }
      else {
        setImage('./images/bowled.png');
        isBowled.current = 0; // Reset for next shot

      }


      setTimeout(() => {
        setImage('./images/straight.png');
        ballRef.current.classList.remove('rightAggShot', 'leftAggShot', 'leftDefShot', 'rightDefShot', 'ballAnimate');
        if (isGameOver.current) {
          setGameOver(true);
          isGameOver.current = 0; // Reset for next game
        } else {
          setIsShot(1); // Reset for next shot
        }
      }, 1500); // 1500ms = 1.5 seconds


    }, 1300); // Delay to ensure the ballAnimate class is applied before shot classes


  }

  function setResult(result) {

    // Calculate new values locally to check game over immediately
    let newWickets = wickets;
    let newBalls = balls + 1;

    setBalls(newBalls);

    if (result === 'Wicket') {
      newWickets = wickets + 1; // Increment local variable
      setWickets(newWickets);
      isBowled.current = 1;
    } else {
      // Handle runs
      const runMap = {
        '1 Run': 1, '2 Runs': 2, '3 Runs': 3, '4 Runs': 4, '6 Runs': 6
      };
      const addedRuns = runMap[result] || 0;
      setRuns(prev => prev + addedRuns);
    }

    // Check against the updated local variables
    if (newWickets >= 2 || newBalls >= 12) {
      isGameOver.current = 1;
    }
  }

  if (gameOver) {
    return (
      <div className="game-over-screen">
        <h1>Match Ended</h1>
        <p>Final Score: {runs}/{wickets}</p>
        <p>Balls Faced: {balls}</p>
        <button onClick={restartGame} className="restart-btn">Restart Game</button>
      </div>
    );
  }

  return (
    <div className="App">
      <button className="shot-btn left" onClick={() => handleShot('Left')}>
        <span>◀</span> Leg Side
      </button>

      <img src={image} className="batsman" />
      <img src="./images/ball.png" className="ball" ref={ballRef} />

      <button className="shot-btn right" onClick={() => handleShot('Right')}>
        Off Side <span>▶</span>
      </button>


      <Scoreboard runs={runs} wickets={wickets} balls={balls} />
      <button className="Aggressive" onClick={() => setStyle('Aggressive')}>
        Aggressive
      </button>
      <button className="Defensive" onClick={() => setStyle('Defensive')}>
        Defensive
      </button>

      <Slider pstyle={style === 'Aggressive' ? aggresiveStyle : defensiveStyle} isShot={isShot} setResult={setResult} />


    </div>
  );
}

export default App;
