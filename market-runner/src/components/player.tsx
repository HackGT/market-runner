import { useState, useEffect } from 'react'
import { Sprite, useTick } from '@inlet/react-pixi';
import '../App.css';

import playerImage from '../assets/player.png';

type Props = {
  y_start: number;
  x: number;
  y: number;
  update_position: any;
};

const Player: React.FC<Props> = (props: Props) => {

  const gravity: number = 1;
  const power: number = 20
  const movement_speed: number = 10;

  const [jumpStart, setJumpStart] = useState(props.y_start)
  const [jumpingTime, setJumpingTime] = useState(0)
  const [isJumping, setIsJumping] = useState(false);
  
  const [isMovingRight, setIsMovingRight] = useState(false);
  const [isMovingLeft, setIsMovingLeft] = useState(false);

  const [momentum, setMomentum] = useState(0)
  const [momentumDirection, setMomentumDirection] = useState("none");

  function start_move(event: any) {
    if (
      (event.code && event.code === 'Space') ||
      (event.code && event.code === 'KeyW') ||
      (event.pointerId && event.pointerId === 1)
    ) {
      if (!isJumping) {
        setIsJumping(true)
        setJumpStart(props.y)
      }
    } else if (event.code && event.code === 'KeyD') {
      setIsMovingRight(true)
    } else if (event.code && event.code === 'KeyA') {
      setIsMovingLeft(true)
    }
  };

  function stop_move(event: any) {
    if (event.code && event.code === 'KeyD') {
      setIsMovingRight(false)
      setMomentum(movement_speed)
      setMomentumDirection('right')
    } else if (event.code && event.code === 'KeyA') {
      setIsMovingLeft(false)
      setMomentum(movement_speed)
      setMomentumDirection('left')
    }
  };

  useTick(delta => {

    if (isJumping) {
      let updatedX = props.x
      let updatedY = props.y

      const jumpHeight = (-gravity / 2) * Math.pow(jumpingTime, 2) + power * jumpingTime;
      if (jumpHeight < 0 || jumpStart + jumpHeight < props.y_start) {
        setJumpStart(props.y)
        setIsJumping(false);
        setJumpingTime(0);
        props.update_position(props.x, props.y_start);
        return;
      }
      updatedY = jumpStart + jumpHeight * -1

      if (isMovingLeft) {
        updatedX = props.x - delta * movement_speed
      }

      if (isMovingRight) {
        updatedX = props.x + delta * movement_speed
      }
      
      props.update_position(updatedX, updatedY)
      setJumpingTime(jumpingTime + delta)
    } else {
      if (isMovingLeft) {
        props.update_position(props.x - delta * movement_speed, props.y)
      }
  
      if (isMovingLeft && momentumDirection === 'left') {
        props.update_position(props.x - delta * momentum, props.y)
        if (momentum <= 0) {
          setMomentum(0);
        } else {
          setMomentum(momentum * .93)
        }
      }
  
      if (isMovingRight) {
        props.update_position(props.x + delta * movement_speed, props.y)
      }
  
      if (isMovingRight && momentumDirection === 'right') {
        props.update_position(props.x + delta * momentum, props.y)
        if (momentum <= 0) {
          setMomentum(0);
        } else {
          setMomentum(momentum * .93)
        }
      }
    }
  });

  useEffect(() => {
    document.addEventListener('keydown', start_move);
    document.addEventListener('keyup', stop_move);
  });

  return (
    <Sprite image={playerImage} scale={.06} x={props.x} y={props.y} />
  );
}

export default Player;
