import axios from 'axios';

const API_URL = 'http://localhost:5130/api/clientes';

export const getClientes = () => axios.get(API_URL);



export const getCliente = (id) => axios.get(`${API_URL}/${id}`);


export const createCliente = (data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, val]) => formData.append(key, val));
  return axios.post(API_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateCliente = (id, data) => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, val]) => formData.append(key, val));
  return axios.put(`${API_URL}/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};


export const deleteCliente = (id) => axios.delete(`${API_URL}/${id}`);
