import React, { useState, Fragment } from "react";
import { useTick } from "@inlet/react-pixi";

import Obstacle from "./obstacle";

type Props = {
  playerX: number;
  playerY: number;
  playerWidth: number;
  playerHeight: number;
  gameWidth: number;
  gameHeight: number;
  endGame: any;
  speed: number;
};

const Obstacles: React.FC<Props> = (props: Props) => {
  const [obstacles, setObstacles] = useState<any>({
    "0": {
      type: 0,
      position: props.gameWidth,
      valid: true,
    },
  });
  const [totalObstaclesCreated, setTotalObstaclesCreated] = useState(1);
  const [nextObstacleDistance, setNextObstacleDistance] = useState(200);

  function spawnObstacle() {
    let furthestDistance = 0;
    for (const key of Object.keys(obstacles)) {
      furthestDistance = Math.max(furthestDistance, obstacles[key].position);
    }
    return props.gameWidth - furthestDistance >= nextObstacleDistance;
  }

  function detectCollision(obX: number, obY: number, obWidth: number, obHeight: number) {
    return (
      ((props.playerX + props.playerWidth / 2 < obX + obWidth &&
        props.playerX + props.playerWidth / 2 > obX) ||
        (props.playerX - props.playerWidth / 2 < obX + (7 * obWidth) / 10 &&
          props.playerX - props.playerWidth / 2 > obX)) &&
      props.playerY + props.playerHeight / 2 > obY &&
      props.playerY < obY + obHeight
    );
  }

  useTick(_ => {
    if (spawnObstacle()) {
      obstacles[totalObstaclesCreated] = {
        type: Math.floor(Math.random() * 3),
        position: props.gameWidth,
        valid: true,
      };
      setTotalObstaclesCreated(totalObstaclesCreated + 1);
      setNextObstacleDistance(Math.floor(Math.random() * (350 - 200 + 1)) + 200);
    }
  });

  function updateObstacle(id: number, x: number, y: number, obWidth: number, obHeight: number) {
    obstacles[id].position = x;
    if (detectCollision(x, y, obWidth, obHeight)) {
      props.endGame();
    } else if (x + obWidth <= 0) {
      obstacles[id].valid = false;
    }
  }

  return (
    <>
      {Object.keys(obstacles).map((key: any, index: any) => {
        if (obstacles[key].valid) {
          return (
            <Obstacle
              speed={props.speed}
              checkObstacle={updateObstacle}
              obstacleType={obstacles[key].type}
              obstacleID={key}
              xStart={props.gameWidth + 100}
              yStart={props.gameHeight}
            />
          );
        }
        return <></>;
      })}
    </>
  );
};

export default Obstacles;
