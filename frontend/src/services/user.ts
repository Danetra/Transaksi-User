import axios from 'axios';

export const getData = () => {
  return axios({
    method: 'GET',
    url: 'http://localhost:2023/api/v1/user'
  });
};
