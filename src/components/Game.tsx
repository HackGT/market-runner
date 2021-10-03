import { useState, useEffect } from 'react'
import { Stage, TilingSprite } from '@inlet/react-pixi';

import Player from './player';
import Obstacles from './obstacles';
import Sky from './sky'
import Foreground from './foreground';
import backgroundImage from '../assets/background.png';

function Game() {

  const game_width = 800
  const game_height = 500
  const player_width = 1325 * .06

  const [playerX, setPlayerX] = useState(game_width/2);
  const [playerY, setPlayerY] = useState(game_height - 100);
  function updatePlayerPosition(x:number, y:number) {
    if (x > 0 && x + player_width < game_width) {
      setPlayerX(x)
    }
    setPlayerY(y)
  }

  function end_game() {
    window.location.reload();
  }

  return (
    <div className="App">
      <Stage width={game_width} height={game_height}>
        <TilingSprite
            image={backgroundImage}
            tilePosition={{ x: 0, y: 0 }}
            width={game_width}
            height={game_height}
        />
        <Sky game_width={game_width} />
        <Foreground game_width={game_width} game_height={game_height} />
        <Player y_start={game_height-100} x={playerX} y={playerY} update_position={updatePlayerPosition}/>
        <Obstacles end_game={end_game} player_x={playerX} player_y={playerY} game_width={game_width} game_height={game_height} player_height={1200*.06} player_width={1325*.06}/>
      </Stage>
    </div>
  );
}

export default Game;
