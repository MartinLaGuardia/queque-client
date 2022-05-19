import axios from 'axios'

class UsersService {

    constructor() {
        this.app = axios.create({ baseURL: `${process.env.REACT_APP_API_URL}/users` })

        this.app.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem("authToken");

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getOneUser = () => {
        return this.app.get(`/profile-user`)
    }

    updateOneUser = (id, userData) => {
        return this.app.put(`/${id}/edit-user`, userData)
    }

    deleteUser = (id) => {
        return this.app.delete(`/${id}/delete-user`)
    }
}


const usersService = new UsersService()
export default usersService