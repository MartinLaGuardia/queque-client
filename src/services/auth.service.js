import axios from 'axios'

class AuthService {

    constructor() {
        this.app = axios.create({ baseURL: 'http://localhost:5005/api/auth' })
    }

    signup = user => {
        return this.app.post('/signup', user)
    }

    login = user => {
        return this.app.post('/login', user)
    }

    verify = token => {
        return this.app.get('/verify', { headers: { Authorization: `Bearer ${token}` } })


    }

}

const authService = new AuthService()

export default authService