import { useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi';
import '../App.css';

import bike from '../assets/bike.png';

type Props = {
  obstacleID: number;
  x_start: number;
  y_start: number;
  check_obstacle: any;
  speed: number;
};

const ObstacleBike: React.FC<Props> = (props: Props) => {

  const width = 272 * .5;
  const height = 203 * .5;

  const [x, setX] = useState(props.x_start)
  const [y, ] = useState(props.y_start-105)

  useTick(_ => {
    props.check_obstacle(props.obstacleID, x, y, width, height)
    setX(x - props.speed)
  });

  return (
    <Sprite image={bike} scale={.5} x={x} y={y}/>
  )
}

export default ObstacleBike;
