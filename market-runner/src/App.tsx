import { useState } from 'react'
import { Stage, Sprite } from '@inlet/react-pixi';
import './App.css';

import Player from './components/player';

function App() {

  const game_width = 800
  const game_height = 500

  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(game_height - 100);
  function updatePlayerPosition(x:number, y:number) {

    // TODO DO BOUNDS CHECK
    setPlayerX(x)
    setPlayerY(y)
  }

  return (
    <div className="App">
      <Stage width={game_width} height={game_height}>
        <Player y_start={game_height-100} x={playerX} y={playerY} update_position={updatePlayerPosition}/>
      </Stage>
    </div>
  );
}

export default App;
