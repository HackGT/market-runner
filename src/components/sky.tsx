import { useState } from 'react'
import { TilingSprite, useTick } from '@inlet/react-pixi';

import skyImage from '../assets/sky.png';

type Props = {
  game_width: number;
};

const Sky: React.FC<Props> = (props: Props) => {

  const [skyPosition, setSkyPosition] = useState(0);
  useTick(delta => { 
    setSkyPosition(skyPosition - delta*1)
  });

  return (
    <TilingSprite
        image={skyImage}
        tilePosition={{ x: skyPosition, y: 0 }}
        width={props.game_width}
        height={200}
    />
  );
}

export default Sky;
