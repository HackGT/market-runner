import { useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi';
import '../App.css';

import bike from '../assets/cat.png';

type Props = {
  obstacleID: number;
  x_start: number;
  y_start: number;
  check_obstacle: any;
  speed: number;
};

const ObstacleCat: React.FC<Props> = (props: Props) => {

  const width = 96 * .35;
  const height = 69 * .35;

  const [x, setX] = useState(props.x_start)
  const [y, ] = useState(props.y_start-50)

  useTick(_ => {
    props.check_obstacle(props.obstacleID, x, y, width, height)
    setX(x - props.speed)
  });

  return (
    <Sprite image={bike} scale={.35} x={x} y={y}/>
  )
}

export default ObstacleCat;
