import React from 'react';
import styles from './Instructions.module.css'
import {
    Link
} from 'react-router-dom'
import instructions from '../../assets/instructions.png'

import Button from '../Button/Button'

const Instructions = () => {
    return(
        <div className={styles.container}>
            <img src={instructions} className={styles.img} />;
            <div className={styles.button_group}>
                <Link to={'/'}>
                    <Button>Home</Button>
                </Link>
                <Link to={'/game'}>
                    <Button>Play Game</Button>
                </Link>
            </div>
        </div>
    )
}

export default Instructions;