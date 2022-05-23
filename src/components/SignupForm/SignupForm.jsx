import { useState } from 'react'
import { Form, Container } from 'react-bootstrap'
import authService from '../../services/auth.service'
import { useNavigate } from 'react-router-dom'
import btnSend from './../../assets/img/Buttons/btnSend.png'


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

        <Container >

            <Form className='SignUpForm' onSubmit={handleSubmit}>

                <Form.Group className="mb-3" controlId="imageURL">
                    <Form.Label className="text">ImageURL</Form.Label>
                    <Form.Control type="imageURL" onChange={handleInputChange} name="imageURL" value={imageURL} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="username">
                    <Form.Label className="text">Username</Form.Label>
                    <Form.Control type="text" onChange={handleInputChange} name="username" value={username} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="text">Email</Form.Label>
                    <Form.Control type="email" onChange={handleInputChange} name="email" value={email} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label className="text">Password</Form.Label>
                    <Form.Control type="password" onChange={handleInputChange} name="password" value={password} />
                </Form.Group>



                <Form.Group className="mb-3" controlId="favFood">
                    <Form.Label className="text" >Fav Food</Form.Label>
                    <Form.Control type="favFood" onChange={handleInputChange} name="favFood" value={favFood} />
                </Form.Group>

                <button type="submit" className='btnregistro'><img className='sendSign' src={btnSend}></img></button>

            </Form>
        </Container>
    )
}

export default SignupForm