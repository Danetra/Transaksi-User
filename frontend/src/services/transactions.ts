import axios from 'axios';

const token = localStorage.getItem('token');

export const getTransactions = () => {
  return axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: 'http://localhost:2023/api/v1/transactions'
  });
};
export const postTransactions = (form) => {
  return axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: 'http://localhost:2023/api/v1/transactions/create',
    data: form
  });
};
