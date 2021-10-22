import React, { useState } from "react";
import { Sprite, useTick } from "@inlet/react-pixi";
import "../App.css";

import bike from "../assets/cat.png";

type Props = {
  obstacleID: number;
  xStart: number;
  yStart: number;
  checkObstacle: any;
  speed: number;
};

const ObstacleCat: React.FC<Props> = (props: Props) => {
  const width = 96 * 0.35;
  const height = 69 * 0.35;

  const [x, setX] = useState(props.xStart);
  const [y] = useState(props.yStart - 50);

  useTick(_ => {
    props.checkObstacle(props.obstacleID, x, y, width, height);
    setX(x - props.speed);
  });

  return <Sprite image={bike} scale={0.35} x={x} y={y} />;
};

export default ObstacleCat;
