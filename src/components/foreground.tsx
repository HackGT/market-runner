import { useState } from 'react'
import { TilingSprite, useTick } from '@inlet/react-pixi';

import skyImage from '../assets/foreground.png';

type Props = {
  game_width: number;
  game_height: number;
  speed: number;
};

const Foreground: React.FC<Props> = (props: Props) => {

  const [position, setPosition] = useState(0);
  useTick(_ => { 
    setPosition(position - props.speed)
  });

  return (
    <TilingSprite
        image={skyImage}
        tilePosition={{ x: position, y: 0 }}
        width={props.game_width}
        height={210}
        y={props.game_height - 210}
        alpha={.8}
    />
  );
}

export default Foreground;
