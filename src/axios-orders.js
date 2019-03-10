import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-my-burger-a4ed4.firebaseio.com/'
});

export default instance;
