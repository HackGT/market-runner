import { useState } from 'react'
import { Container, Stage, TilingSprite, useTick, Text, Sprite } from '@inlet/react-pixi';

import Player from './player';
import Obstacles from './obstacles';
import Sky from './sky'
import Foreground from './foreground';
import backgroundImage from '../assets/background.png';
import scoreBackground from '../assets/score.png'

import { updateUserScore } from '../services/leaderboard';

function GameWrapper() {
  const game_width = window.innerWidth - window.innerWidth/10
  const game_height = window.innerHeight - window.innerHeight/10

  return (
    <div className="background-image">
      <div className="App">
        <Stage width={game_width} height={game_height}>
          <Game game_height={game_height} game_width={game_width} />
        </Stage>
      </div>
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
    setGameSpeed(13*(1-Math.exp(-.03 * time_passed)) + 2.5)
  });

  async function end_game() {
    let score = Math.floor(time_passed * 5)
    await updateUserScore(score)
    window.location.href = '/gameover/' + String(score);
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
      <Sprite
        image={scoreBackground}
        x={props.game_width-250}
        y={-5}
        scale={.85}
      />
      <Text 
        text={get_score()}
        anchor={0.5}
        x={props.game_width-145}
        y={60}
        style={{
          fill: "white",
          fontFamily: '"ServiceStation"',
          fontSize: 30
        }}
      />
      <Player movement_speed={gameSpeed} x_start={props.game_width/6} y_start={props.game_height-70} x={playerX} y={playerY} update_position={updatePlayerPosition}/>
      <Obstacles speed={gameSpeed} end_game={end_game} player_x={playerX} player_y={playerY} game_width={props.game_width} game_height={props.game_height} player_height={1200*.06} player_width={1325*.06}/>
    </Container>
  )
}

export default GameWrapper;
