import { useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi';
import '../App.css';

import bike from '../assets/bike.png';

type Props = {
  obstacleID: number;
  x_start: number;
  y_start: number;
  check_obstacle: any;
};

const ObstacleBike: React.FC<Props> = (props: Props) => {

  const width = 351 * .35;
  const height = 247 * .35;

  const [x, setX] = useState(props.x_start)
  const [y, ] = useState(props.y_start-105)

  useTick(_ => {
    props.check_obstacle(props.obstacleID, x, y, width, height)
    setX(x - 2)
  });

  return (
    <Sprite image={bike} scale={.35} x={x} y={y}/>
  )
}

export default ObstacleBike;
