import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import {
    Link
} from 'react-router-dom'
import useAxios from 'axios-hooks'

import styles from './Home.module.css'
import Button from '../Button/Button'
import { Score } from '../../utils/types/Score';

const modalStyles = {
    content: {
        backgroundImage: '../../assets/instructions.png',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    }
}

const Home = () => {
    const [instructionIsOpen, setInstructionIsOpen] = useState(false)
    const [leaderboardIsOpen, setLeaderboardIsOpen] = useState(false)
    const [scores, setScores] = useState([])

    const [{ data, loading, error}] = useAxios('http://localhost:8080/scores')

    useEffect(() => {
        console.log(data)
        setScores(data)
    }, [loading])
    
    const openInstructions = () => {
        setInstructionIsOpen(true);
    }

    const closeInstructions = () => {
        setInstructionIsOpen(false);
    }

    const openLeaderboard = () => {
        setLeaderboardIsOpen(true);
    }

    const closeLeaderboard = () => {
        setLeaderboardIsOpen(true);
    }

    return(
        <div className={styles.container}>
            <h1 className={styles.title}>
                Market Runner
            </h1>
            <Modal
                isOpen={instructionIsOpen}
                onRequestClose={closeInstructions}
                style={modalStyles}
                contentLabel="Example Modal"
            >
                <h2>Hello</h2>
                <button onClick={closeInstructions}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <Button>Close</Button>
                </form>
            </Modal>
            <Modal
                isOpen={leaderboardIsOpen}
            >
                {scores.map((score: Score) => {
                    return (
                        <div>
                            <h1>{score.name}</h1>
                            <h3>{score.score}</h3>
                        </div>
                    )
                })}
            </Modal>

            <div className={styles.button_group}>
                <Link to={'/game'}>
                    <Button>Start</Button>
                </Link>
                <Button onClick={openInstructions}>Instructions</Button>
                <Button onClick={openLeaderboard}>Leaderboard</Button>
            </div>
        </div>
    )
}

export default Home;