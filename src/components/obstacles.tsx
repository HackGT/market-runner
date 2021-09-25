import { useState } from 'react'
import { Fragment } from 'react'
import { useTick } from '@inlet/react-pixi';
import '../App.css';

import Obstacle from './obstacle'

type Props = {
  player_x: number;
  player_y: number;
  player_width: number;
  player_height: number;
  game_width: number;
  game_height: number;
  end_game: any;
};

const Obstacles: React.FC<Props> = (props: Props) => {

  const ob_width: number = 860 * .08
  const ob_height: number = 900 * .08
  const [obstacles, ] = useState(Array())
  let totalObstaclesCreated: number = 0;

  function spawnObstacle() {
    return obstacles.length < 1
  }

  useTick(delta => { 
    if (spawnObstacle()) {
      obstacles.push([[props.game_width + 100, props.game_height - 50], totalObstaclesCreated]);
      totalObstaclesCreated += 1;
    }
  });

  function updateObstacle(id: number, x: number, y: number) {
    if (detectCollision(x, y)) {
      deleteObstacle(id);
      props.end_game();
    } else if (x < 0) {
      deleteObstacle(id);
    }
  }

  function deleteObstacle(idToDelete: number) {
    for (let i = 0; i < obstacles.length; i++) {
      if (obstacles[i][1] === idToDelete) {
        obstacles.splice(i, 1);
        return;
      }
    }
  }

  function detectCollision(ob_x: number, ob_y: number) {
    return (
      ob_x + ob_width > props.player_x &&
      ob_x < props.player_x + props.player_width &&
      ob_y + ob_height > props.player_y &&
      ob_y < props.player_y + props.player_height
    );
  };

  return (
    <Fragment>
      {
        obstacles.map((obstacle: any, index: any) => {
          return (<Obstacle check_obstacle={updateObstacle} obstacleID={obstacle[1]} x_start={props.game_width + 100} y_start={props.game_height - 100} />)
        })
      }
    </Fragment>
  )
}

export default Obstacles;
