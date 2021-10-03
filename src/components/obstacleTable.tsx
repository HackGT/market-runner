import { useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi';
import '../App.css';

import bike from '../assets/table.png';

type Props = {
  obstacleID: number;
  x_start: number;
  y_start: number;
  check_obstacle: any;
};

const ObstacleTable: React.FC<Props> = (props: Props) => {

  const width = 96 * .5;
  const height = 69 * .5;

  const [x, setX] = useState(props.x_start)
  const [y, ] = useState(props.y_start - 20)

  useTick(_ => {
    props.check_obstacle(props.obstacleID, x, y, width, height)
    setX(x - 2)
  });

  return (
    <Sprite image={bike} scale={.5} x={x} y={y}/>
  )
}

export default ObstacleTable;
