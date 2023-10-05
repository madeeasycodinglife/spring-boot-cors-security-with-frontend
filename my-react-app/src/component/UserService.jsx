import axios from "axios";

const API_URL = "http://localhost:8080/api/users";

const UserService = {
  getAllUsers: () => axios.get(`${API_URL}/`),
  createUser: (user) => axios.post(`${API_URL}/`, user),
  updateUser: (user) => axios.put(`${API_URL}/${user.id}`, user),
  deleteUser: (userId) => axios.delete(`${API_URL}/${userId}`),
};

export default UserService;
