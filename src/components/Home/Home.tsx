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
                    <Button>Start</Button>
                </Link>
                <Button>Instruction</Button>
                <Button>Leaderboards</Button>
            </div>
        </div>
    )
}

export default Home;