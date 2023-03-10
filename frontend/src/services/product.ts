import axios from 'axios';

const token = localStorage.getItem('token');

export const getData = () => {
  return axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: 'http://localhost:2023/api/v1/products'
  });
};
export const postData = (form) => {
  return axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: 'http://localhost:2023/api/v1/products/create',
    data: form
  });
};
export const editData = (id) => {
  return axios({
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `http://localhost:2023/api/v1/products/edit/${id}`
  });
};

export const updateData = (form) => {
  return axios({
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `http://localhost:2023/api/v1/products/update/`,
    data: form
  });
};

export const deleteData = (id) => {
  return axios({
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    },
    url: `http://localhost:2023/api/v1/products/delete/${id}`
  });
};
