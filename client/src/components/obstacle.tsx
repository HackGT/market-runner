import React, { useState } from "react";
import { Sprite, useTick } from "@inlet/react-pixi";
import "../App.css";

import ObstacleBike from "./obstacleBike";
import ObstacleCat from "./obstacleCat";
import ObstacleTable from "./obstacleTable";

type Props = {
  obstacleID: number;
  xStart: number;
  yStart: number;
  checkObstacle: any;
  obstacleType: number;
  speed: number;
};

const Obstacle: React.FC<Props> = (props: Props) => {
  if (props.obstacleType == 0) {
    return (
      <ObstacleBike
        speed={props.speed}
        checkObstacle={props.checkObstacle}
        obstacleID={props.obstacleID}
        xStart={props.xStart}
        yStart={props.yStart}
      />
    );
  }
  if (props.obstacleType == 1) {
    return (
      <ObstacleCat
        speed={props.speed}
        checkObstacle={props.checkObstacle}
        obstacleID={props.obstacleID}
        xStart={props.xStart}
        yStart={props.yStart}
      />
    );
  }
  return (
    <ObstacleTable
      speed={props.speed}
      checkObstacle={props.checkObstacle}
      obstacleID={props.obstacleID}
      xStart={props.xStart}
      yStart={props.yStart - 50}
    />
  );
};

export default Obstacle;
