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
};

const Obstacle: React.FC<Props> = (props: Props) => {
  if (props.obstacleType == 0) {
    return (
      <ObstacleBike check_obstacle={props.check_obstacle} obstacleID={props.obstacleID} x_start={props.x_start} y_start={props.y_start} />
    )
  } else if (props.obstacleType == 1) {
    return (
      <ObstacleCat check_obstacle={props.check_obstacle} obstacleID={props.obstacleID} x_start={props.x_start} y_start={props.y_start} />
    )
  } else {
    return (
      <ObstacleTable check_obstacle={props.check_obstacle} obstacleID={props.obstacleID} x_start={props.x_start} y_start={props.y_start-50} />
    )
  }
}

export default Obstacle;
