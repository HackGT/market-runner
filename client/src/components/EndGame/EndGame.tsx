import React from 'react';
import styles from './EndGame.module.css'
import {
    Link
} from 'react-router-dom'

import { useParams } from "react-router-dom";
import gameover from '../../assets/gameover.png'

const EndGame = () => {

    const { score } = useParams<{ score: string }>();

    return (
        <div className={styles.container}>
            <img src={gameover} className={styles.img} />;
            <div className={styles.score}>
                Score: {score}
            </div>
            <div className={styles.button_group}>
                <div className={styles.leaderboardButton}>
                    <Link to={'/leaderboard'}>
                        <button className={styles.white_button}>Leaderboard</button>
                    </Link>
                </div>
                <div>
                    <Link to={'/'}>
                        <button className={styles.blue_button}>Home</button>
                    </Link>
                    <Link to={'/game'}>
                        <button className={styles.blue_button}>Play Again</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default EndGame;