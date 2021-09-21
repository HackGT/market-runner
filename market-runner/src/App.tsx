import { useState } from 'react'
import { Stage } from '@inlet/react-pixi';
import './App.css';

import Player from './components/player';
import Obstacles from './components/obstacles';

import playerImage from '../assets/player.png';

function App() {

  const game_width = 800
  const game_height = 500

  const [playerX, setPlayerX] = useState(0);
  const [playerY, setPlayerY] = useState(game_height - 100);
  function updatePlayerPosition(x:number, y:number) {
    setPlayerX(x)
    setPlayerY(y)
  }

  function end_game() {
    console.log("GAME OVER")
  }

  return (
    <div className="App">
      <Stage width={game_width} height={game_height}>
        <Player y_start={game_height-100} x={playerX} y={playerY} update_position={updatePlayerPosition}/>
        <Obstacles end_game={end_game} player_x={playerX} player_y={playerY} game_width={game_width} game_height={game_height} player_height={1200*.06} player_width={1325*.06}/>
      </Stage>
    </div>
  );
}

export default App;
