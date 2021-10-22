import { useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi';
import '../App.css';

import bike from '../assets/table.png';

type Props = {
  obstacleID: number;
  x_start: number;
  y_start: number;
  check_obstacle: any;
  speed: number;
};

const ObstacleTable: React.FC<Props> = (props: Props) => {

  const width = 96 * .6;
  const height = 69 * .6;

  const [x, setX] = useState(props.x_start)
  const [y, ] = useState(props.y_start - 35)

  useTick(_ => {
    props.check_obstacle(props.obstacleID, x, y, width, height)
    setX(x - props.speed)
  });

  return (
    <Sprite image={bike} scale={.6} x={x} y={y}/>
  )
}

export default ObstacleTable;
