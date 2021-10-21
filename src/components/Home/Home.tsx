import React from 'react';
import styles from './Home.module.css'
import {
    Link
} from 'react-router-dom'

import Button from '../Button/Button'

const Home = () => {
    return(
        <div className={styles.container}>
            <h1 className={styles.title}>
                Market Runner
            </h1>

            <div className={styles.button_group}>
                <Link to={'/game'}>
                    <Button>Play Game</Button>
                </Link>
                <Link to={'/instructions'}>
                    <Button>Instructions</Button>
                </Link>
                <Link to={'/leaderboard'}>
                <Button>Leaderboard</Button>
                </Link>
            </div>
        </div>
    )
}

export default Home;