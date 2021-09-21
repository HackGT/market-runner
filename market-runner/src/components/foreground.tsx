import { useState } from 'react'
import { TilingSprite, useTick } from '@inlet/react-pixi';

import skyImage from '../assets/foreground.png';

type Props = {
  game_width: number;
  game_height: number;
};

const Foreground: React.FC<Props> = (props: Props) => {

  const [position, setPosition] = useState(0);
  useTick(delta => { 
    setPosition(position - delta*3)
  });

  return (
    <TilingSprite
        image={skyImage}
        tilePosition={{ x: position, y: 0 }}
        width={props.game_width}
        height={200}
        y={props.game_height - 200}
    />
  );
}

export default Foreground;
