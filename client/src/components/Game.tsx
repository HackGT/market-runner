import React, { useState } from "react";
import { Container, Stage, TilingSprite, useTick, Text } from "@inlet/react-pixi";

import Player from "./player";
import Obstacles from "./obstacles";
import Sky from "./sky";
import Foreground from "./foreground";
import backgroundImage from "../assets/background.png";

const Game: React.FC<Props> = (props: Props) => {
  const playerWidth = 292 * 0.25;

  const [playerX, setPlayerX] = useState(props.gameWidth / 6);
  const [playerY, setPlayerY] = useState(props.gameHeight - 70);
  function updatePlayerPosition(x: number, y: number) {
    if (x - playerWidth / 2 > 0 && x + playerWidth / 2 < props.gameWidth) {
      setPlayerX(x);
    }
    setPlayerY(y);
  }

  const [timePassed, setTime] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(0);
  useTick(delta => {
    setTime(timePassed + delta * 0.005);
    setGameSpeed(10 * (1 - Math.exp(-0.04 * timePassed)) + 1);
  });

  function endGame() {
    window.location.reload();
  }

  function getScore() {
    return `Score: ${String(Math.floor(timePassed * 5))}`;
  }

  return (
    <Container>
      <TilingSprite
        image={backgroundImage}
        tilePosition={{ x: 0, y: 0 }}
        width={props.gameWidth}
        height={props.gameHeight}
      />
      <Sky gameWidth={props.gameWidth} gameHeight={props.gameHeight} />
      <Foreground speed={gameSpeed} gameWidth={props.gameWidth} gameHeight={props.gameHeight} />
      <Text
        text={getScore()}
        anchor={0.5}
        x={60}
        y={20}
        style={{
          fill: "white",
        }}
      />
      <Player
        movementSpeed={gameSpeed}
        xStart={props.gameWidth / 6}
        yStart={props.gameHeight - 70}
        x={playerX}
        y={playerY}
        updatePosition={updatePlayerPosition}
      />
      <Obstacles
        speed={gameSpeed}
        endGame={endGame}
        playerX={playerX}
        playerY={playerY}
        gameWidth={props.gameWidth}
        gameHeight={props.gameHeight}
        playerHeight={1200 * 0.06}
        playerWidth={1325 * 0.06}
      />
    </Container>
  );
};

function GameWrapper() {
  const gameWidth = 800;
  const gameHeight = 500;

  return (
    <div className="App">
      <Stage width={gameWidth} height={gameHeight}>
        <Game gameHeight={gameHeight} gameWidth={gameWidth} />
      </Stage>
    </div>
  );
}

type Props = {
  gameWidth: number;
  gameHeight: number;
};

export default GameWrapper;
