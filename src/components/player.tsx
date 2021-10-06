import { useState, useEffect } from 'react'
import { Container, AnimatedSprite, useTick } from '@inlet/react-pixi';
import { Texture } from 'pixi.js';

import '../App.css';

import player1 from '../assets/player1.png';
import player2 from '../assets/player2.png';
import player3 from '../assets/player3.png';
import player4 from '../assets/player4.png';

type Props = {
  x_start: number;
  y_start: number;
  x: number;
  y: number;
  update_position: any;
  movement_speed: number;
};

const Player: React.FC<Props> = (props: Props) => {

  const playerTexture1 = Texture.from(player1)
  const playerTexture2 = Texture.from(player2)
  const playerTexture3 = Texture.from(player3)
  const playerTexture4 = Texture.from(player4)
  const [frames, setFrames] = useState<any[]>([])

  const [gravity, setGravity] = useState(1)
  const power: number = 20;

  const [jumpStart, setJumpStart] = useState(props.y_start)
  const [jumpingTime, setJumpingTime] = useState(0)
  const [isJumping, setIsJumping] = useState(false);


  function start_move(event: any) {
    if (
      (event.code && event.code === 'Space') ||
      (event.code && event.code === 'KeyW') ||
      (event.code && event.code === 'ArrowUp') ||
      (event.pointerId && event.pointerId === 1)
    ) {
      setIsJumping(true)
    }
  };

  function stop_move(event: any) {
    if (
      (event.code && event.code === 'Space') ||
      (event.code && event.code === 'KeyW') ||
      (event.code && event.code === 'ArrowUp') ||
      (event.pointerId && event.pointerId === 1)
    ) {
      setGravity(1.25)
    }
  };

  useTick(delta => {

    if (isJumping) {
      let updatedX = props.x
      let updatedY = props.y

      const jumpHeight = (-gravity / 2) * Math.pow(jumpingTime, 2) + power * jumpingTime + .001;
      if (jumpHeight < 0 || jumpStart + jumpHeight < props.y_start) {
        setJumpStart(props.y_start)
        setIsJumping(false);
        setJumpingTime(0);
        setGravity(1)
        props.update_position(props.x, props.y_start);
        return;
      }

      updatedY = jumpStart + jumpHeight * -1
      updatedX = props.x + delta * 3.8

      props.update_position(updatedX, updatedY)
      setJumpingTime(jumpingTime + delta)
    } else {
      if (props.x >= props.x_start) {
        if (Math.abs(props.x - props.x_start) >= props.movement_speed) {
          props.update_position(props.x - props.movement_speed, props.y)
        } else {
          props.update_position(props.x_start, props.y)
        }
      }
    }
  });

  useEffect(() => {
    setFrames([
      playerTexture1,
      playerTexture2,
      playerTexture3,
      playerTexture4
    ])
    document.addEventListener('keydown', start_move);
    document.addEventListener('keyup', stop_move);
  }, []);

  if (frames.length == 0) {
    return null
  }

  return (
    <Container x={props.x} y={props.y}>
      <AnimatedSprite
        animationSpeed={0.167}
        isPlaying={true}
        textures={frames}
        anchor={0.5}
        scale={.25}
      />
    </Container>
  );
}

export default Player;
