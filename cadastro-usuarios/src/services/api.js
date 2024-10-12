import axios from 'axios'

const api = axios.create({ // Criar uma conexão
    baseURL: 'http://localhost:3000'
}); 

export default api