import React, { useState } from "react";
import { Sprite, useTick } from "@inlet/react-pixi";
import "../App.css";

import bike from "../assets/table.png";

type Props = {
  obstacleID: number;
  xStart: number;
  yStart: number;
  checkObstacle: any;
  speed: number;
};

const ObstacleTable: React.FC<Props> = (props: Props) => {
  const width = 96 * 0.5;
  const height = 69 * 0.5;

  const [x, setX] = useState(props.xStart);
  const [y] = useState(props.yStart - 20);

  useTick(_ => {
    props.checkObstacle(props.obstacleID, x, y, width, height);
    setX(x - props.speed);
  });

  return <Sprite image={bike} scale={0.5} x={x} y={y} />;
};

export default ObstacleTable;
