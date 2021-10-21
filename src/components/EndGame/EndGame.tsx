import React from 'react';
import styles from './EndGame.module.css'
import {
    Link
} from 'react-router-dom'

import Button from '../Button/Button'
import gameover from '../../assets/gameover.png'

const EndGame = () => {
    return(
        <div className={styles.container}>
            <img src={gameover} className={styles.img} />;
            <div className={styles.button_super_group}>
                <Link to={'/game'} className="leaderboard_label">
                    <Button>Leaderboard</Button>
                </Link>
                <div className={styles.button_group}>
                    <Link to={'/'}>
                        <Button>Home</Button>
                    </Link>
                    <Link to={'/game'}>
                        <Button>Play Again</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EndGame;