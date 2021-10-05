import { useState } from 'react'
import { TilingSprite, useTick } from '@inlet/react-pixi';

import skyImage from '../assets/background.png';

type Props = {
  game_width: number;
  game_height: number;
};

const Sky: React.FC<Props> = (props: Props) => {

  const [skyPosition, setSkyPosition] = useState(0);
  useTick(delta => { 
    setSkyPosition(skyPosition - delta)
  });

  return (
    <TilingSprite
        image={skyImage}
        tilePosition={{ x: skyPosition, y: 0 }}
        height={props.game_height}
        width={props.game_width}
    />
  );
}

export default Sky;
