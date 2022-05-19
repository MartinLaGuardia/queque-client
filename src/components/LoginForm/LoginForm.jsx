import { useContext, useState } from 'react'
import { Form, Button, Container } from 'react-bootstrap'
import authService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './../../context/auth.context'
import './LoginForm.css'


const LoginForm = () => {

    const [loginData, setLoginData] = useState({
        password: '',
        email: '',
    })

    const navigate = useNavigate()

    const { storeToken, authenticateUser } = useContext(AuthContext)

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .login(loginData)
            .then(({ data }) => {
                storeToken(data.authToken)
                authenticateUser()
                navigate('/')
            })
            .catch(err => console.log(err))


    }


    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setLoginData({ ...loginData, [name]: value })
    }

    const { password, email } = loginData

    return (

        <Container >
            <Form className="login" onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="text" >Email</Form.Label>
                    <Form.Control type="email" onChange={handleInputChange} name="email" value={email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="text">Password</Form.Label>
                    <Form.Control type="password" onChange={handleInputChange} name="password" value={password} />
                </Form.Group>

                <Button variant="dark" type="submit" >Log IN</Button>

            </Form>
        </Container>
    )
}

export default LoginForm