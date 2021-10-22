import React, { useState } from "react";
import { TilingSprite, useTick } from "@inlet/react-pixi";

import skyImage from "../assets/foreground.png";

type Props = {
  gameWidth: number;
  gameHeight: number;
  speed: number;
};

const Foreground: React.FC<Props> = (props: Props) => {
  const [position, setPosition] = useState(0);
  useTick(_ => {
    setPosition(position - props.speed);
  });

  return (
    <TilingSprite
      image={skyImage}
      tilePosition={{ x: position, y: 0 }}
      width={props.gameWidth}
      height={210}
      y={props.gameHeight - 215}
    />
  );
};

export default Foreground;
