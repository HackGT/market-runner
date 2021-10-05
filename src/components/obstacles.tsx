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

  const [obstacles, setObstacles] = useState<any>(
    {
      "0": {
        "type": 0,
        "position": props.game_width,
        "valid": true
      }
    }
  )
  const [totalObstaclesCreated, setTotalObstaclesCreated] = useState(1)
  const [nextObstacleDistance, setNextObstacleDistance] = useState(200)

  function spawnObstacle() {
    let furthest_distance: number = 0;
    for (const key of Object.keys(obstacles)) {
      furthest_distance = Math.max(furthest_distance, obstacles[key]['position'])
    }
    return props.game_width - furthest_distance >= nextObstacleDistance 
  }

  useTick(_ => {
    if (spawnObstacle()) {
      obstacles[totalObstaclesCreated] = {
        "type": Math.floor(Math.random() * 3),
        "position": props.game_width,
        "valid": true
      }
      setTotalObstaclesCreated(totalObstaclesCreated + 1)
      setNextObstacleDistance(Math.floor(Math.random() * (350 - 200 + 1)) + 200)
    }
  });

  function updateObstacle(id: number, x: number, y: number, ob_width: number, ob_height: number) {
    obstacles[id].position = x;
    if (detectCollision(x, y, ob_width, ob_height)) {
      props.end_game();
    } else if (x + ob_width <= 0) {
      obstacles[id]["valid"] = false
    }
  }

  function detectCollision(ob_x: number, ob_y: number, ob_width: number, ob_height: number) {
    return (
      ((props.player_x + props.player_width/2 < ob_x + ob_width && props.player_x + props.player_width/2 > ob_x) || (props.player_x - props.player_width/2 < ob_x + ob_width && props.player_x - props.player_width/2 > ob_x)) &&
      props.player_y + props.player_height/2 > ob_y &&
      props.player_y < ob_y + ob_height
    );
  };

  return (
    <Fragment>
      {
        Object.keys(obstacles).map((key: any, index: any) => {
          if (obstacles[key]["valid"]) {
            return (<Obstacle speed={props.speed} check_obstacle={updateObstacle} obstacleType={obstacles[key]["type"]} obstacleID={key} x_start={props.game_width+100} y_start={props.game_height} />)
          }
        })
      }
    </Fragment>
  )
}

export default Obstacles;
