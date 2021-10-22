import React, { useState, useEffect } from "react";
import { Container, AnimatedSprite, useTick } from "@inlet/react-pixi";
import { Texture } from "pixi.js";

import "../App.css";

import player1 from "../assets/player1.png";
import player2 from "../assets/player2.png";
import player3 from "../assets/player3.png";
import player4 from "../assets/player4.png";

type Props = {
  xStart: number;
  yStart: number;
  x: number;
  y: number;
  updatePosition: any;
  movementSpeed: number;
};

const Player: React.FC<Props> = (props: Props) => {
  const playerTexture1 = Texture.from(player1);
  const playerTexture2 = Texture.from(player2);
  const playerTexture3 = Texture.from(player3);
  const playerTexture4 = Texture.from(player4);
  const [frames, setFrames] = useState<any[]>([]);

  const [gravity, setGravity] = useState(1);
  const power = 20;

  const [jumpStart, setJumpStart] = useState(props.yStart);
  const [jumpingTime, setJumpingTime] = useState(0);
  const [isJumping, setIsJumping] = useState(false);

  function startMove(event: any) {
    if (
      (event.code && event.code === "Space") ||
      (event.code && event.code === "KeyW") ||
      (event.code && event.code === "ArrowUp") ||
      (event.pointerId && event.pointerId === 1)
    ) {
      setIsJumping(true);
    }
  }

  function stopMove(event: any) {
    if (
      (event.code && event.code === "Space") ||
      (event.code && event.code === "KeyW") ||
      (event.code && event.code === "ArrowUp") ||
      (event.pointerId && event.pointerId === 1)
    ) {
      setGravity(1.25);
    }
  }

  useTick(delta => {
    if (isJumping) {
      let updatedX = props.x;
      let updatedY = props.y;

      const jumpHeight = (-gravity / 2) * Math.pow(jumpingTime, 2) + power * jumpingTime + 0.001;
      if (jumpHeight < 0 || jumpStart + jumpHeight < props.yStart) {
        setJumpStart(props.yStart);
        setIsJumping(false);
        setJumpingTime(0);
        setGravity(1);
        props.updatePosition(props.x, props.yStart);
        return;
      }

      updatedY = jumpStart + jumpHeight * -1;
      updatedX = props.x + delta * 3.8;

      props.updatePosition(updatedX, updatedY);
      setJumpingTime(jumpingTime + delta);
    } else if (props.x >= props.xStart) {
      if (Math.abs(props.x - props.xStart) >= props.movementSpeed) {
        props.updatePosition(props.x - props.movementSpeed, props.y);
      } else {
        props.updatePosition(props.xStart, props.y);
      }
    }
  });

  useEffect(() => {
    setFrames([playerTexture1, playerTexture2, playerTexture3, playerTexture4]);
    document.addEventListener("keydown", startMove);
    document.addEventListener("keyup", stopMove);
  }, []);

  if (frames.length == 0) {
    return null;
  }

  return (
    <Container x={props.x} y={props.y}>
      <AnimatedSprite
        animationSpeed={0.167}
        isPlaying
        textures={frames}
        anchor={0.5}
        scale={0.25}
      />
    </Container>
  );
};

export default Player;
