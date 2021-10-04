import { useState } from 'react'
import { Fragment } from 'react'
import { useTick } from '@inlet/react-pixi';

import Obstacle from './obstacle'

type Props = {
  player_x: number;
  player_y: number;
  player_width: number;
  player_height: number;
  game_width: number;
  game_height: number;
  end_game: any;
  speed: number;
};

const Obstacles: React.FC<Props> = (props: Props) => {

  const [obstacles, setObstacles] = useState<any>([[0,0]])
  let totalObstaclesCreated: number = 1;

  function spawnObstacle() {
    return obstacles.length < 1
  }

  function updateObstacle(id: number, x: number, y: number, ob_width: number, ob_height: number) {
    if (detectCollision(x, y, ob_width, ob_height)) {
      props.end_game();
    } else if (x + ob_width <= 0) {
      deleteObstacle(id);
    }
    if (spawnObstacle()) {
      setObstacles([...obstacles, [Math.floor(Math.random() * 3), totalObstaclesCreated]]);
      totalObstaclesCreated += 1;
    }
  }

  function deleteObstacle(idToDelete: number) {
    for (let i = 0; i < obstacles.length; i++) {
      if (obstacles[i][1] === idToDelete) {
        let newObstacles = obstacles.splice(i, i+1);
        setObstacles(newObstacles);
        return;
      }
    }
  }

  function detectCollision(ob_x: number, ob_y: number, ob_width: number, ob_height: number) {
    return (
      ob_x + ob_width > props.player_x &&
      ob_x < props.player_x + props.player_width/2 &&
      ob_y + ob_height > props.player_y &&
      ob_y < props.player_y + props.player_height
    );
  };

  return (
    <Fragment>
      {
        obstacles.map((obstacle: any, index: any) => {
          return (<Obstacle speed={props.speed} check_obstacle={updateObstacle} obstacleType={obstacle[0]} obstacleID={obstacle[1]} x_start={props.game_width + 100} y_start={props.game_height} />)
        })
      }
    </Fragment>
  )
}

export default Obstacles;
