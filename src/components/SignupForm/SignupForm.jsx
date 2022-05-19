// import { useState, useContext } from "react"
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import authService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'


const SignupForm = () => {

    const [signupData, setSignupData] = useState({
        username: '',
        password: '',
        email: '',
        imageURL: '',
        favFood: ''
    })

    const navigate = useNavigate()

    const handleSubmit = e => {
        e.preventDefault()

        authService
            .signup(signupData)
            .then(res => {
                console.log(res)
                navigate('/login')
            })
            .catch(err => console.log(err))

    }


    const handleInputChange = e => {
        const { value, name } = e.currentTarget
        setSignupData({ ...signupData, [name]: value })
    }

    const { username, password, email, imageURL, favFood } = signupData

    return (

        <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" onChange={handleInputChange} name="username" value={username} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" onChange={handleInputChange} name="email" value={email} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={handleInputChange} name="password" value={password} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="imageURL">
                <Form.Label>ImageURL</Form.Label>
                <Form.Control type="imageURL" onChange={handleInputChange} name="imageURL" value={imageURL} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="favFood">
                <Form.Label>Fav Food</Form.Label>
                <Form.Control type="favFood" onChange={handleInputChange} name="favFood" value={favFood} />
            </Form.Group>

            <Button variant="dark" type="submit">Let's GO!</Button>

        </Form>
    )
}

export default SignupForm