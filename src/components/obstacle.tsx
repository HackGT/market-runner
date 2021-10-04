import { useState } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi';
import '../App.css';

import ObstacleBike from './obstacleBike'
import ObstacleCat from './obstacleCat'
import ObstacleTable from './obstacleTable'

type Props = {
  obstacleID: number;
  x_start: number;
  y_start: number;
  check_obstacle: any;
  obstacleType: number;
  speed: number;
};

const Obstacle: React.FC<Props> = (props: Props) => {
  if (props.obstacleType == 0) {
    return (
      <ObstacleBike speed={props.speed} check_obstacle={props.check_obstacle} obstacleID={props.obstacleID} x_start={props.x_start} y_start={props.y_start} />
    )
  } else if (props.obstacleType == 1) {
    return (
      <ObstacleCat speed={props.speed} check_obstacle={props.check_obstacle} obstacleID={props.obstacleID} x_start={props.x_start} y_start={props.y_start} />
    )
  } else {
    return (
      <ObstacleTable speed={props.speed} check_obstacle={props.check_obstacle} obstacleID={props.obstacleID} x_start={props.x_start} y_start={props.y_start-50} />
    )
  }
}

export default Obstacle;
