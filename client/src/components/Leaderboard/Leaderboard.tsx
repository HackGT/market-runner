import React, { useEffect, useState } from 'react';
import styles from './Leaderboard.module.css'
import {
    Link
} from 'react-router-dom'

import instructions from '../../assets/leaderboard_background.png'
import Button from '../Button/Button'

import { getLeaderboard } from '../../services/leaderboard';

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState<any[]>([])

    useEffect(() => {
        const getLeaderboardData = async () => {
            const data = await getLeaderboard()
            setLeaderboard(data)
        }
        getLeaderboardData();
    }, [])

    return(
        <div className={styles.container}>
            <img src={instructions} className={styles.img} />;
            <div className={styles.leaderboard_container}>
                <div className={styles.leaderboard_title}>
                    LEADERBOARD
                </div>
                <div className={styles.table}>
                    <table>
                        <tr>
                            <th className={styles.table_header}>Rank</th>
                            <th className={styles.table_header}>Name</th>
                            <th className={styles.table_header}>Points</th>
                        </tr>
                        {leaderboard.map((user, i) => {
                            return (
                                <tr>
                                    <td className={styles.table_entry}>{i+1}</td>
                                    <td className={styles.table_entry}>{user.name}</td>
                                    <td className={styles.table_entry}>{user.points}</td>
                                </tr>
                            )
                        })}
                    </table>
                </div>
            </div>
            <div className={styles.button_group}>
                <Link to={'/'}>
                    <Button>Home</Button>
                </Link>
                <Link to={'/game'}>
                    <Button>Play Again</Button>
                </Link>
            </div>
        </div>
    )
}

export default Leaderboard;