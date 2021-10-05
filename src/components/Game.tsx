import { useState } from 'react'
import { Container, Stage, TilingSprite, useTick, Text } from '@inlet/react-pixi';

import Player from './player';
import Obstacles from './obstacles';
import Sky from './sky'
import Foreground from './foreground';
import backgroundImage from '../assets/background.png';

function GameWrapper() {
  const game_width = 800
  const game_height = 500

  return (
    <div className="App">
      <Stage width={game_width} height={game_height}>
        <Game game_height={game_height} game_width={game_width} />
      </Stage>
    </div>
  );
}

type Props = {
  game_width: number;
  game_height: number;
};

const Game: React.FC<Props> = (props: Props) => {

  
  const player_width = 292 * .25

  const [playerX, setPlayerX] = useState(props.game_width/6);
  const [playerY, setPlayerY] = useState(props.game_height - 70);
  function updatePlayerPosition(x:number, y:number) {
    if (x - player_width/2 > 0 && x + player_width/2 < props.game_width) {
      setPlayerX(x)
    }
    setPlayerY(y)
  }

  const [time_passed, setTime] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(0);
  useTick(delta => {
    setTime(time_passed + delta*.005)
    setGameSpeed(10*(1-Math.exp(-.04 * time_passed)) + 3)
  });

  function end_game() {
    window.location.reload();
  }

  function get_score() {
    return "Score: " + String(Math.floor(time_passed * 5))
  }

  return (
    <Container>
      <TilingSprite
        image={backgroundImage}
        tilePosition={{ x: 0, y: 0 }}
        width={props.game_width}
        height={props.game_height}
      />
      <Sky game_width={props.game_width} game_height={props.game_height}/>
      <Foreground speed={gameSpeed} game_width={props.game_width} game_height={props.game_height} />
      <Text 
        text={get_score()}
        anchor={0.5}
        x={60}
        y={20}
        style={{
          fill: "white"
        }}
      />
      <Player movement_speed={gameSpeed} x_start={props.game_width/6} y_start={props.game_height-70} x={playerX} y={playerY} update_position={updatePlayerPosition}/>
      <Obstacles speed={gameSpeed} end_game={end_game} player_x={playerX} player_y={playerY} game_width={props.game_width} game_height={props.game_height} player_height={1200*.06} player_width={1325*.06}/>
    </Container>
  )
}

export default GameWrapper;
