import axios from 'axios';

const getLeaderboard = async (): Promise<any> => {
  try {
    const event = await axios.get('/leaderboard1/');
    return event.data;
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error('Please refresh page & try again.');
    }
  }
};

const updateUserScore = async (score: number): Promise<any> => {
  try {
    await axios.post('/updateUser/' + score)
  } catch (e: any) {
    if (e.response) {
      throw new Error(e.response.data.message);
    } else {
      throw new Error('Please refresh page & try again.');
    }
  }
}

export { getLeaderboard, updateUserScore }
