import { useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi';
import '../App.css';

import obstacleImage from '../assets/bulldog.png';

type Props = {
  obstacleID: number;
  x_start: number;
  y_start: number;
  check_obstacle: any;
};

const Obstacle: React.FC<Props> = (props: Props) => {

  const [x, setX] = useState(props.x_start)
  const [y, ] = useState(props.y_start)

  useTick(_ => {
    props.check_obstacle(props.obstacleID, x, y)
    setX(x - 5)
  });

  return (
    <Sprite image={obstacleImage} scale={.08} x={x} y={y}/>
  )

}

export default Obstacle;
